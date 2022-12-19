import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

interface ItemMenu{ 
	item: string,
	state: "pass" | "error" | "normal",
	disabled?: boolean
}

@Component({
  selector: 'registry-download',
  templateUrl: './registry-download.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryDownloadComponent implements OnInit {

    menuSidebarVisible: boolean = true;

    constructor(
    ) { }

    ngOnInit() {

    }

    // Menu
    menuItem : ItemMenu[] = [
        {
          item:"Перечень объектов",
		  state: 'pass'
        },
        {
          item:"Реквизиты",
		  state: 'normal'
        },
        {
          item:"Третий шаг",
		  state: 'error',
		  disabled: true
        }
    ]

	currentMenuItem = this.menuItem[0].item;
	setCurrentMenuItem(item : string){
		this.currentMenuItem = item
	}
}
