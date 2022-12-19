import { Component, OnInit } from '@angular/core';
import { TableColumn } from '@core/models';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'registry-request',
  templateUrl: './registry-request.component.html'
})
export class RegistryRequestComponent implements OnInit {

	readonly tableColumns: TableColumn[] = [
		{
			name: 'Ид',
			dataKey: '_id'
		},
		{
			name: 'Дата',
			dataKey: 'date'
		},
		{
			name: 'Имя',
			dataKey: 'name'
		}
	];

	filteredData : BehaviorSubject<any[]> = new BehaviorSubject<any[]>([
		{
			_id: '1',
			date: '2020-06-06',
			name: '62f157591582b6ca7d0ff4b6',
		},
		{
			_id: '2',
			date: '2020-02-14',
			name: '62f157591db7a30b3ab769d7',
		},
		{
			_id: '3',
			date: '2014-07-23',
			name: '62f157591db7a30b3ab769d7',
		},
		{
			_id: '4',
			date: '2017-05-30',
			name: '62f157591582b6ca7d0ff4b6',
		}
	]);

	menuSidebarVisible: boolean = true;

	rowActionText : string = "";

	constructor(
	) { }

	ngOnInit() {

	}

	// Menu
	menuItem = [
		{
			item:"Обработаны"
		},
		{
			item:"К обработке"
		},
		{
			item:"С ошибками"
		}
	]

	currentMenuItem = this.menuItem[0].item;
	setCurrentMenuItem(item : string){
		this.currentMenuItem = item;
		if(this.menuItem[1].item === item){
			this.rowActionText="Обработать"
		}
		console.log(this.rowActionText)
	}

	setColumnEditorTemplate($event : any){

	}

}
