import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-layout-page404',
  templateUrl: './page404.component.html',
  styleUrls: ['./page404.component.less'],

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page404Component {
  constructor(private location: Location){
  }
  goBack(): void {
    this.location.back();
  }
}
