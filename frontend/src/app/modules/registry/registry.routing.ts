import { RegistryRequestComponent } from './registry-request/registry-request.component';
import { RegistryDownloadComponent } from './registry-download/registry-download.component';
import { RegistryReportComponent } from './registry-report/registry-report.component';
import { RegistrySearchComponent } from './registry-search/registry-search.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistryComponent } from './registry.component';
import { RegistryObjectCardComponent } from './registry-object-card/registry-object-card.component';

import { RegistryReportResolver, RegistrySearchResolver } from './registry.resolvers';

const routes: Routes = [
  {
    path: '',
    component: RegistryComponent,
    data: {
      title: 'Реестр'
    },
    children : [
      {
        path: 'search', 
        data: {
          title: 'Реестр - Поиск'
        },
        component: RegistrySearchComponent,
        children : [
          {
            path   : ':section',
            component: RegistrySearchComponent,
            resolve: {
              registry: RegistrySearchResolver
            },
          }
        ],
      },
      {
        path: 'report', 
        data: {
          title: 'Реестр - Отчеты'
        },
        component: RegistryReportComponent,
        resolve: {
          users: RegistryReportResolver
        },
      },
      {
        path: 'card', 
        data: {
          title: 'Реестр - Карточка объекта'
        },
        component: RegistryObjectCardComponent
      },
      {
        path: 'download', 
        data: {
          title: 'Реестр - Загрузки'
        },
        // children : [{
		// 	path: ':form', 
		// 	data: {
		// 	title: 'Реестр - Карточка объекта'
		// 	},
		// 	component: RegistryDownloadFormComponent
        // }],
        component: RegistryDownloadComponent
      },
      {
        path: 'requests', 
        data: {
          title: 'Реестр - Заявки'
        },
        component: RegistryRequestComponent
      },
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistryRoutingModule {}
