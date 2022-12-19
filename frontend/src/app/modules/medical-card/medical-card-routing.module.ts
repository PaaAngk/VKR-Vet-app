import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      title: 'Медкарты - Клиенты'
    },
    // children : [
    //   {
    //     path: 'search', 
    //     data: {
    //       title: 'Реестр - Поиск'
    //     },
    //     component: RegistrySearchComponent,
    //     children : [
    //       {
    //         path   : ':section',
    //         component: RegistrySearchComponent,
    //         resolve: {
    //           registry: RegistrySearchResolver
    //         },
    //       }
    //     ],
    //   },
    //   {
    //     path: 'report', 
    //     data: {
    //       title: 'Реестр - Отчеты'
    //     },
    //     component: RegistryReportComponent,
    //     resolve: {
    //       users: RegistryReportResolver
    //     },
    //   }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalCardRoutingModule { }
