import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Injector, OnDestroy, ViewChild } from '@angular/core';
import { TuiValidationError } from '@taiga-ui/cdk';
import { TuiAlertService, TuiDialogService} from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { SchedulerService } from './scheduler.service';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';


// Calendar
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import ruLocale from '@fullcalendar/core/locales/ru';
import { AddReceptionRecordDialogComponent } from './dialogs/add-reception/add-reception.component';
import { DateRangeParams } from './interfaces';


@Component({
	selector: 'vet-crm-scheduler',
	templateUrl: './scheduler.component.html',
	styleUrls: ['./scheduler.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchedulerComponent implements OnDestroy{
	private _unsubscribeAll: Subject<any> = new Subject<any>();
	@ViewChild(AddReceptionRecordDialogComponent) addReceptionRecordDialog!: AddReceptionRecordDialogComponent;

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
		initialView: 'timeGridWeek',
		initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
		weekends: true,
		editable: true,
		selectable: true,
		selectMirror: true,
		locale: ruLocale,
		timeZone: 'local',
		// timeZone: 'UTC+8',

		dayMaxEvents: true,
		allDaySlot:false,
		stickyHeaderDates:true,
		slotEventOverlap: true,
		nowIndicator:true,
		select: this.handleDateSelect.bind(this),
		eventClick: this.handleEventClick.bind(this),
		eventsSet: this.handleEvents.bind(this)
		/* you can update a remote database when these fire:
		eventAdd:
		eventChange:
		eventRemove:
		*/
	};
	currentEvents: EventApi[] = [];

	private readonly dialogAddReceptionRecord = this.dialogService.open<number>(
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
		private _changeDetectorRef: ChangeDetectorRef,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    ) {}

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


	handleWeekendsToggle() {
		const { calendarOptions } = this;
		calendarOptions.weekends = !calendarOptions.weekends;
	}

	handleDateSelect(selectInfo: DateSelectArg) {
		const dateRange: DateRangeParams = {
			start: selectInfo.start,
			end: selectInfo.end
		}
		this.schedulerService.setSelectedDate(dateRange);
		this.dialogAddReceptionRecord.subscribe({
            next: data => {
                console.log(`Dialog emitted data = ${data}`);
            },
            complete: () => {
                console.log('Dialog closed');
            },
        });
		
		// const title = prompt('Please enter a new title for your event');
		// const calendarApi = selectInfo.view.calendar;
		// calendarApi.unselect(); // clear date selection

		// if (title) {
		// 	calendarApi.addEvent({
		// 		id: createEventId(),
		// 		title,
		// 		start: selectInfo.startStr,
		// 		end: selectInfo.endStr,
		// 	});
		// }
	}

	handleEventClick(clickInfo: EventClickArg) {
		if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
			clickInfo.event.remove();
		}
	}

	handleEvents(events: EventApi[]) {
		this.currentEvents = events;
		this._changeDetectorRef.detectChanges();
	}
	
}
