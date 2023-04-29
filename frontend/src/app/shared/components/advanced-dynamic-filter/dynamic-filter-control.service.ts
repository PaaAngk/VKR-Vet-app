import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay, TuiDayRange } from '@taiga-ui/cdk';

import { DynamicFilterBase, DynamicFilterInput } from './dynamic-filter-base.class';

@Injectable()
export class DynamicFilterControlService {
	/** Create FormGroup. Making FormControl to each input in array segmentForm 
	 * with passed value, validators(if include) and create match toogle to correct input  
	*/
	
	toFormGroupFromBase(segmentForm: DynamicFilterBase<any | any[]> ) {
		const filtersGroup: any = {};
		// segmentForm.forEach(filters  => {
			//const group: any = {};
			segmentForm.dynamicFilterInputs.forEach(filterItem  => {
				if((filterItem.controlType === 'combobox' || filterItem.controlType === 'dropdown') && filterItem.value){
					filtersGroup[filterItem.key] = new FormControl(filterItem.value || null);
				}
				else if(filterItem.controlType === 'combobox' || filterItem.controlType === 'dropdown' ){
					filtersGroup[filterItem.key] = new FormControl();
				}
				else if(filterItem.controlType === 'date' || filterItem.controlType === 'dateRange'){
					if (filterItem.value){
						filtersGroup[filterItem.key] = new FormControl(TuiDay.fromLocalNativeDate(filterItem.value));
					}
					else{
						filtersGroup[filterItem.key] = new FormControl();
					}
				}
				// else if(filterItem.controlType === 'dateRange'){
				// 	filtersGroup[filterItem.key] = new FormControl();
				// }
				else{
					filtersGroup[filterItem.key] = new FormControl(filterItem.value || null);
				}
				filterItem.required ? filtersGroup[filterItem.key].addValidators([ Validators.required ]) : null;
				filterItem.minLength ? filtersGroup[filterItem.key].addValidators([Validators.minLength(filterItem.minLength)]) : null;
				filterItem.maxLength ? filtersGroup[filterItem.key].addValidators([Validators.maxLength(filterItem.maxLength)]) : null;
				filterItem.validationPatern ? filtersGroup[filterItem.key].addValidators([Validators.pattern(filterItem.validationPatern)]) : null;
				filterItem.type == 'email' ? filtersGroup[filterItem.key].addValidators([Validators.email]): null;

				if(filterItem.match === true){
					filtersGroup[filterItem.key+"!!match"] = new FormControl(false);
				}
			});
			//filtersGroup[filters.title] = new FormGroup(group)
		// });
		
		return new FormGroup(filtersGroup);
	}
}
