import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyzesComponent } from './analyzes/analyzes-add/analyzes.component';
import { AnalyzesViewComponent } from './analyzes/view/analyzes-view.component';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { ClientComponent } from './client/client.component';
import { PetComponent } from './pet/pet.component';
import { ReceptionComponent } from './reception/new-and-edit/reception.component';
import { ReceptionViewComponent } from './reception/view/reception-view.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      title: 'Карты клиентов'
    },
  },
  {
    path: 'client/:id', 
    data: {
      title: 'Клиент'
    },
    component: ClientDetailComponent,
  },
  {
    path: 'pet/:id', 
    data: {
      title: 'Питомец'
    },
    component: PetComponent,
  },
  {
    path: 'pet/:id/reception/new', 
    data: {
      title: 'Добавление приема'
    },
    component: ReceptionComponent,
  },
  {
    path: 'pet/:id/reception/:id/edit', 
    data: {
      title: 'Изменение приема'
    },
    component: ReceptionComponent,
  },
  {
    path: 'pet/:id/reception/:id', 
    data: {
      title: 'Просмотр приема'
    },
    component: ReceptionViewComponent,
  },
  {
    path: 'pet/:id/analyzes/new', 
    data: {
      title: 'Добавление приема'
    },
    component: AnalyzesComponent,
  },
  {
    path: 'pet/:id/analyzes/:id', 
    data: {
      title: 'Просмотр приема'
    },
    component: AnalyzesViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientCardRoutingModule { }
