import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService} from '@taiga-ui/core';
import { filter, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { SchedulerService } from './scheduler.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';


// Calendar
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput, DatesSetArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
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
	_recordView: Subject<ReceptionRecord> = new Subject<ReceptionRecord>();

	eventsList$: Observable<EventInput[] | null>; 
	// eventsList$: Observable<EventInput[] | null> = this.searchEvents$.pipe(
    //     filter(value => value !== null),
    //     switchMap(search =>
    //         this.schedulerService.getRecordsByDatesRange(search).pipe(startWith(null)),
    //     ),
    //     startWith(null),
    // );

	loading = false;
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
				eventMaxStack : 3,
			}
		},
		navLinks: true,
		initialView: 'timeGridDay',
		initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
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
		/* you can update a remote database when these fire:
		eventAdd:
		eventChange:
		eventRemove:
		*/
	};

	private readonly dialogAddReceptionRecord = this.dialogService.open<ReceptionRecord>(
        new PolymorpheusComponent(AddReceptionRecordDialogComponent, this.injector),
        {
			data: 'add',
            dismissible: false,
            label: `Добавление записи на прием`,
			size:'auto',
        },
    );
	clientCardService: any;

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(Injector) private readonly injector: Injector,
		private schedulerService: SchedulerService,
		private _changeDetectorRef: ChangeDetectorRef,
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
		this.schedulerService.getRecordsByDatesRange({
			dateStart: arg.start,
			dateEnd: arg.end,
		}).subscribe()
	}
	

	handleWeekendsToggle() {
		const { calendarOptions } = this;
		calendarOptions.weekends = !calendarOptions.weekends;
	}

	handleDateSelect(selectInfo: DateSelectArg) {
		const dateRange: ReceptionRecordBetweenDateInput = {
			dateStart: selectInfo.start,
			dateEnd: selectInfo.end
		}
		this.schedulerService.setSelectedDate(dateRange);
		this.dialogAddReceptionRecord.subscribe({
            next: (data: ReceptionRecord) => {
				const calendarApi = selectInfo.view.calendar;
				calendarApi.unselect(); // clear date selection
				if (data) {
					calendarApi.addEvent({
						id: data.id.toString(),
						title: data.client?.fullName,
						start: data.dateTimeStart,
						end: data.dateTimeEnd,
						display: `${data.kindOfAnimal} ${data.employee?.fullName} ${data.purpose?.purposeName}`
					});
				}
				console.log(data);
            },
            complete: () => {
                console.log('Dialog closed');
            },
        });
	}

	handleEventClick(clickInfo: EventClickArg) {
		console.log(clickInfo.event)
		this._recordView.next(this.schedulerService.getLocalRecordById( Number(clickInfo.event.id) ))
		// if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
		// 	clickInfo.event.remove();
		// }
	}
	
}
