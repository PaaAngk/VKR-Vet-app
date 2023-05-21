import { ChangeDetectionStrategy, Component, ElementRef, Inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SchedulerService } from './scheduler.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';


// Calendar
import { CalendarOptions, DateSelectArg, EventClickArg, EventInput, DatesSetArg, EventDropArg } from '@fullcalendar/core';
import interactionPlugin, { EventResizeDoneArg } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';
import { AddReceptionRecordDialogComponent } from './dialogs/add-record/add-reception.component';
import { ReceptionRecord, ReceptionRecordBetweenDateInput } from 'src/graphql/generated';


@Component({
	selector: 'vet-crm-scheduler',
	templateUrl: './scheduler.component.html',
	styleUrls: ['./scheduler.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	@ViewChild(AddReceptionRecordDialogComponent) addReceptionRecordDialog!: AddReceptionRecordDialogComponent;
	@ViewChild('eventDropConfirm', { static: true }) eventDropConfirmView!: ElementRef;
	@ViewChild('eventResizeConfirm', { static: true }) eventResizeConfirmView!: ElementRef;


	_recordView: Subject<ReceptionRecord> = new Subject<ReceptionRecord>();

	eventsList$: Observable<EventInput[] | null>; 

	calendarOptions: CalendarOptions = {
		slotMinTime: '10:00',
    	slotMaxTime: '20:00',
		plugins: [
		  interactionPlugin,
		  dayGridPlugin,
		  timeGridPlugin,
		  listPlugin,
		],
		height: '100%',
		// expandRows: true,
		headerToolbar: {
		  left: 'prev,next today',
		  center: 'title',
		  right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
		},
		views: {
			timeGrid: {
				eventMaxStack : 2,
			},
		},
		navLinks: true,
		initialView: 'timeGridDay',
		weekends: true,
		editable: true,
		selectable: true,
		selectMirror: true,
		locale: ruLocale,
		timeZone: 'local',
		dayMaxEvents: true,
		allDaySlot:false,
		stickyHeaderDates:true,
		slotEventOverlap: true,
		nowIndicator:true,
		select: this.handleDateSelect.bind(this),
		eventClick: this.handleEventClick.bind(this),
		// eventsSet: this.handleEvents.bind(this),
		datesSet: this.handleViewSelect.bind(this),
		eventDrop: this.handleEventDrop.bind(this),
		eventResize: this.handleEventResize.bind(this),
		/* you can update a remote database when these fire:
		eventAdd:
		eventChange:
		eventRemove:
		*/
	};
	
	eventDropValue?: EventDropArg;
	eventDroploading = false;

	eventResizeValue?: EventResizeDoneArg;
	eventResizeLoading = false;

	private readonly dialogAddReceptionRecord = this.dialogService.open<ReceptionRecord>(
        new PolymorpheusComponent(AddReceptionRecordDialogComponent, this.injector),
        {
			data: 'add',
            dismissible: false,
            label: `Добавление записи на прием`,
			size:'auto',
        },
    );

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private schedulerService: SchedulerService,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    ) {
		this.eventsList$ = this.schedulerService.getEvents$;
	}

	ngOnDestroy(): void
	{
		this._unsubscribeAll.next(undefined);
		this._unsubscribeAll.complete();
	}

	get computedError(): TuiValidationError | null {
        return new TuiValidationError(`An error`);
    }

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	createReception(){
		this.dialogAddReceptionRecord.subscribe({
            next: data => {
                console.log(`Dialog emitted data = ${data}`);
            },
            complete: () => {
                console.log('Dialog closed');
            },
        });
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Calendar methods
	// -----------------------------------------------------------------------------------------------------

	handleViewSelect(arg: DatesSetArg) {
		// console.log(arg)
		this.schedulerService.getRecordsByDateRange({
			dateStart: arg.start,
			dateEnd: arg.end,
		}).subscribe()
	}

	handleWeekendsToggle() {
		const { calendarOptions } = this;
		calendarOptions.weekends = !calendarOptions.weekends;
	}

	handleDateSelect(selectInfo: DateSelectArg) {
		this.schedulerService.setSelectedReceptionRecord({
				dateTimeStart: selectInfo.start,
				dateTimeEnd: selectInfo.end,
				id: -1
			} as ReceptionRecord);
		this.dialogAddReceptionRecord.subscribe();
	}

	handleEventClick(clickInfo: EventClickArg) {
		// console.log(clickInfo.event)
		this._recordView.next(this.schedulerService.getLocalRecordById( Number(clickInfo.event.id) ))
	}
	/**
	 * Update event which has dragging
	 * @param info 
	 */
	handleEventDrop(info: EventDropArg){
		const dialogKill: Subject<any> = new Subject<any>();
		this.eventDropValue = info;

        this.dialogService.open(this.eventDropConfirmView, {label:"Перенос записи", size: 's'})
		.pipe(takeUntil(dialogKill))
		.subscribe({
			next: () => {
				this.eventDroploading = true;
				const dataForUpdate: ReceptionRecordBetweenDateInput = {
					dateStart: info.event.start,
					dateEnd: info.event.end,
				}
				this.schedulerService.updateDateReceptionRecord(Number(info.event.id), dataForUpdate).subscribe({
					next: () => {
						this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
						this.eventDroploading = false;
					},
					error: (error)  => 
					{
						this.alertService.open("Обновите страницу или обратитесь к администратору", 
							{status: TuiNotification.Error, label:"Не удалось обновить запись на прием", autoClose:5000}).subscribe();
						console.log(error)
						this.eventDroploading = false;
						info.revert();
					}
				})
				dialogKill.next(undefined);
				dialogKill.complete();
			},
            complete: () => {
                this.eventDropValue = undefined;
				info.revert();
            },
        });


	}

	/**
	 * Update event which has time is resize
	 * @param info 
	 */
	handleEventResize(info: EventResizeDoneArg){
		const dialogKill: Subject<any> = new Subject<any>();

		this.eventResizeValue = info;

        this.dialogService.open(this.eventResizeConfirmView, {label:"Перенос времени записи", size: 's'})
		.pipe(takeUntil(dialogKill))
		.subscribe({
			next: () => {
				this.eventResizeLoading = true;
				const dataForUpdate: ReceptionRecordBetweenDateInput = {
					dateStart: info.event.start,
					dateEnd: info.event.end,
				}
				this.schedulerService.updateDateReceptionRecord(Number(info.event.id), dataForUpdate).subscribe({
					next: () => {
						this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
						this.eventResizeLoading = false;
					},
					error: (error)  => 
					{
						this.alertService.open("Обновите страницу или обратитесь к администратору", 
							{status: TuiNotification.Error, label:"Не удалось обновить запись на прием", autoClose:5000}).subscribe();
						console.log(error)
						this.eventResizeLoading = false;
						info.revert();
					}
				})
				dialogKill.next(undefined);
				dialogKill.complete();
			},
            complete: () => {
                this.eventDropValue = undefined;
				info.revert();
            },
        });


	}
	
}
