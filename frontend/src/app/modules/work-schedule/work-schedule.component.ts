import { ChangeDetectionStrategy, Component, ElementRef, Inject, Injector, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, DatesSetArg, EventClickArg, EventDropArg, EventInput } from '@fullcalendar/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { CreateWorkScheduleInput, Employee } from 'src/graphql/generated';
import { ClientCardService } from '../client-card/client-card.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import ruLocale from '@fullcalendar/core/locales/ru';
import { WorkScheduleService } from './work-schedule.service';
import { TuiAlertService, TuiDialogService, TuiNotification } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AddWorkScheduleDialogComponent } from './dialogs/add-record/add-workSchedule.component';
import { UserService } from 'src/app/core';

@Component({
  selector: 'vet-crm-work-schedule',
  templateUrl: './work-schedule.component.html',
  styleUrls: ['./work-schedule.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkScheduleComponent implements OnInit, OnDestroy{
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  @ViewChild('scheduleDelete', { static: true }) scheduleDelete!: ElementRef;
  employees: Employee[] =[];
  eventsList$: Observable<EventInput[] | null>; 
  eventForDelete = '';
  eventLoading = false;
  currentUserRole = '';

  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    height: '100%',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    initialView: 'dayGridMonth',
    // editable: true,
    selectable: true,
    locale: ruLocale,
    datesSet: this.handleViewSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
  };

  private readonly dialogAddWorkSchedule = this.dialogService.open<any>(
    new PolymorpheusComponent(AddWorkScheduleDialogComponent, this.injector),
    {
      dismissible: true,
      label: `Добавление записи в график работы`,
      size:'s',
    },
  );

  constructor(
    private workScheduleService: WorkScheduleService,
    @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
    @Inject(Injector) private readonly injector: Injector,
    @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
    private userService: UserService,
  ){
      this.eventsList$ = this.workScheduleService.getEvents$;
    }

  ngOnInit(): void {
    console.log("1");
    this.currentUserRole = this.userService.getCurrentUser().role
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(undefined);
    this._unsubscribeAll.complete();
  }


	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

  addWorkSchedule(){
    this.dialogAddWorkSchedule.subscribe();
  }

  	// -----------------------------------------------------------------------------------------------------
	// @ Calendar methods
	// -----------------------------------------------------------------------------------------------------

	handleViewSelect(arg: DatesSetArg) {
    
    this.workScheduleService.getRecordsByDateRange({
      dateStart: arg.start,
      dateEnd: arg.end,
    }).subscribe();
	}

    /**
	 * Delet event whec clicking
	 * @param info 
	 */
	handleEventClick(info: EventClickArg){
    if( this.currentUserRole !== "DOCTOR"){
      const dialogKill: Subject<any> = new Subject<any>();
      this.eventForDelete = info.event.title;
          this.dialogService.open(this.scheduleDelete, {label:"Удаление графика работы", size: 's'})
      .pipe(takeUntil(dialogKill))
      .subscribe({
        next: (val: any) => {
          this.eventLoading = true;
          if(val === 0){
            this.workScheduleService.deleteScheduleById(Number(info.event.id)).subscribe({
              next: () => this.alertService.open("", {status: TuiNotification.Success, label:"Запись удалена!"}).subscribe(),
              error: (error)  => 
              {
                this.alertService.open("Обновите страницу или обратитесь к администратору", 
                  {status: TuiNotification.Error, label:"Не удалось удалить запись в графике", autoClose:5000}).subscribe();
                console.log(error)
              }
            })
          } else {
            this.workScheduleService.deleteScheduleAllById(Number(info.event.groupId)).subscribe({
              next: () => this.alertService.open("", {status: TuiNotification.Success, label:"График удален!"}).subscribe({}),
              error: (error)  => 
              {
                this.alertService.open("Обновите страницу или обратитесь к администратору", 
                  {status: TuiNotification.Error, label:"Не удалось удалить график для сотрудника", autoClose:5000}).subscribe();
                console.log(error)
              }
            })
          }
          this.eventLoading = false;
          dialogKill.next(undefined);
          dialogKill.complete();
        },
        complete: () => {
          this.eventForDelete = '';
        },
      });
    }
	}
}
