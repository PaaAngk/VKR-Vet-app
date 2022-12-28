import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientDetailComponent } from './client/client-detail/client-detail.component';
import { ClientComponent } from './client/client.component';
import { PetComponent } from './pet/pet.component';
import { ReceptionComponent } from './reception/reception.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      title: 'Карты клиентов'
    },
  },
  {
    path: 'detail', 
    data: {
      title: 'Клиент'
    },
    component: ClientDetailComponent,
  },
  {
    path: 'pet', 
    data: {
      title: 'Питомец'
    },
    component: PetComponent,
  },
  {
    path: 'reception', 
    data: {
      title: 'Прием'
    },
    component: ReceptionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientCardRoutingModule { }
