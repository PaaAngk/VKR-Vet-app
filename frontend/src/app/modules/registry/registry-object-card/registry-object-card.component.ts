import { ChangeDetectionStrategy, Input, Component, OnInit, Output, EventEmitter } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import {TuiFileLike} from '@taiga-ui/kit';

interface Riur {
    readonly secondName: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly DOB: string;
    readonly placeBirth: string;
    readonly placeLive: string;
    readonly age:number
}

@Component({
  selector: 'registry-object-card',
  templateUrl: './registry-object-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistryObjectCardComponent implements OnInit {

    @Input() object:Riur;
    @Output() onReturn = new EventEmitter<boolean>()
   
    activeItemIndex = 0;
    drawerComponent : 'Main' | 'Info' | 'Detail' = 'Main';

    testForm = new FormGroup({
        nameValue: new FormControl(``, Validators.required),
        periodValue: new FormControl(``, Validators.required),
    });


    readonly control = new FormControl();
    readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
 
    onReject(file: TuiFileLike | readonly TuiFileLike[]): void {
        this.rejectedFiles$.next(file as TuiFileLike);
    }
 
    removeFile(): void {
        this.control.setValue(null);
    }
 
    clearRejected(): void {
        this.rejectedFiles$.next(null);
    }

    constructor(
        private http: HttpClient,
        private activatedRoute: ActivatedRoute,
        private router: Router,
    ) { 
    }

    ngOnInit() {

    }

    returnClick() {
        this.onReturn.emit();
    }

    onClick(component: 'Main' | 'Info' | 'Detail'){
        this.drawerComponent = component
    }

}
 


