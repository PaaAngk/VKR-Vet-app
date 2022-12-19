import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';

@Component({
  selector: 'registry-download-form',
  templateUrl: './registry-download-form.component.html',
})
export class RegistryDownloadFormComponent implements OnInit {

  @Input() activeForm: string;

  testForm = new FormGroup({
    nameValue: new FormControl(``, Validators.required),
    nameValue1: new FormControl(``, Validators.required),
    periodValue: new FormControl( TuiDay.currentLocal(), Validators.required),
    nameValue2: new FormControl(``, Validators.required),
    nameValue3: new FormControl(``, Validators.required),
  })

  constructor() { }

  ngOnInit() {
  }

  submit(){
  }
  

}
