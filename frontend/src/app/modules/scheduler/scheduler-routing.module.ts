import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchedulerComponent } from './scheduler.component';

const routes: Routes = [
  {
    path:'',
    data: {
      title: 'Регистратура'
    },
    component: SchedulerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchedulerRoutingModule { }
