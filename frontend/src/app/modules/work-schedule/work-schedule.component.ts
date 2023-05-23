import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import { Subject, takeUntil } from 'rxjs';
import { Employee } from 'src/graphql/generated';
import { ClientCardService } from '../client-card/client-card.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import ruLocale from '@fullcalendar/core/locales/ru';

@Component({
  selector: 'vet-crm-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkScheduleComponent implements OnInit, OnDestroy{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  employees: Employee[] =[];
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    events: [
      { title: 'event 1', date: '2023-05-24' },
      { title: 'event 2', date: '2023-05-24' }
    ],
    height: '100%',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    dayMaxEvents: true,
    locale: ruLocale,
    timeZone: 'local',
    // select: this.handleDateSelect.bind(this),
    // eventClick: this.handleEventClick.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  constructor(private clientCardService: ClientCardService, ){
    this.clientCardService.getAllEmployees$
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((employees) => {
        this.employees = employees;
    })
  }

  ngOnInit(): void {
    console.log("1")
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(undefined);
    this._unsubscribeAll.complete();
  }


	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------


}
