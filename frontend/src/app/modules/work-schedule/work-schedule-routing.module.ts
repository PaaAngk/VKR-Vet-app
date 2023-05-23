import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkScheduleComponent } from './work-schedule.component';

const routes: Routes = [
  {
    path:'',
    data: {
      title: 'График работы'
    },
    component: WorkScheduleComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkScheduleRoutingModule { }
