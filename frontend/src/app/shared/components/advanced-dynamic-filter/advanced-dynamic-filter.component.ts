import { Component, Input, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { DynamicFilterBase } from './dynamic-filter-base.class';
import { DynamicFilterControlService } from './dynamic-filter-control.service';

@Component({
  selector: 'app-advanced-dynamic-form',
  templateUrl: './advanced-dynamic-filter.component.html',
  providers: [ DynamicFilterControlService ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedDynamicFilterComponent implements OnInit {
	activeMenuItemIndex:number = 0;

	/**Output json value of form */
	@Output() formValues = new EventEmitter<any>();

	/** Input form */
	@Input() segmentForms?: BehaviorSubject<DynamicFilterBase<any>>;

	/** Input needed in two columns */
	@Input() twoColumns: boolean = false;

	displaydForm?: any[];
	form!: FormGroup;
	enabledForm = false;

	constructor(
		private dfs: DynamicFilterControlService, 
	) {}

	ngOnInit() {
		// Format gettings filter to FromGroup
		this.segmentForms?.subscribe({
			next: (form) => {
				if (form && form.dynamicFilterInputs && Object.keys(form.dynamicFilterInputs).length > 0){
					this.form = this.dfs.toFormGroupFromBase(form as DynamicFilterBase<any | any[]>);
					this.displaydForm = form.dynamicFilterInputs;
					if(this.twoColumns)
						this.form.valueChanges.subscribe(() => this.onSubmit());	
				}
			}
		})
		
	}

	/**
	 * Getting data from form with delete nullable input and formate output in JSON. Also concate match checkbox to onse array of his input.
	 */
	onSubmit() {
		const rowValue = this.form.getRawValue();
		
		const valueWithoutNull : { [index: string | number]: any } = {};
		for (const key in rowValue){
			const val = rowValue[key];
			const nameMatchValue = key+'!!match';
			if ( val !== null){
				if (!key.includes('!!match')) {
					// eslint-disable-next-line no-prototype-builtins
					if (rowValue.hasOwnProperty(nameMatchValue)) {
						if (val){
							valueWithoutNull[key] = {
								'value' : val, 
								'match' : rowValue[nameMatchValue]
							}
						}
					}
					else{
						valueWithoutNull[key] = val
					}
				}
			}
		}
		this.formValues.emit(valueWithoutNull);
  	}
}
