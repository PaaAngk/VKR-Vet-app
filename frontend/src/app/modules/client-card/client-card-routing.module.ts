import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { ClientComponent } from './client/client.component';
import { PetComponent } from './pet/pet.component';
import { ReceptionComponent } from './reception/new/reception.component';
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
    path: 'pet/:id/reception/:id', 
    data: {
      title: 'Просмотр приема'
    },
    component: ReceptionViewComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientCardRoutingModule { }
