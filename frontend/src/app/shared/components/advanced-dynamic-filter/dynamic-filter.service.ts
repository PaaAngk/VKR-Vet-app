import { DropdownDynamicFilter } from './inputs/dynamic-filter-dropdown';
import { AdvancedDynamicFilterModule } from './advanced-dynamic-filter.module';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

import { DynamicFilterInput, DynamicFilterBase } from './dynamic-filter-base.class';

import { TextboxDynamicFilter } from './inputs/dynamic-filter-textbox';
import { ComboboxDynamicFilter } from './inputs/dynamic-filter-combobox';
import { CountboxDynamicFilter } from './inputs/dynamic-filter-countbox';
import { DateRangeDynamicFilter } from './inputs/dynamic-filter-dateRange';
import { DateDynamicFilter } from './inputs/dynamic-filter-date';
import { InputRangeDynamicFilter } from './inputs/dynamic-filter-inputRange';


@Injectable({
	providedIn: AdvancedDynamicFilterModule
})
export class DynamicFilterService {

	//private _searchData: BehaviorSubject<Riur[]> = new BehaviorSubject([] as Riur[]);

	// TODO: get from a remote source of question metadata
	getFilter(query:string) {
		let segmentFilter: DynamicFilterBase<string|string[]|number>[];
		if(query===''){
			segmentFilter = [
				{
					title: "Main filter",
		
					dynamicFilterInputs: [
		
						new DateDynamicFilter({
							key: 'dateSelector',
							label: 'Date entering',
							value: new Date(2011, 0, 1)
						}),
		
						new DateRangeDynamicFilter({
							key: 'dateRangeSelector',
							label: 'Date entering',
						}),
		
						new ComboboxDynamicFilter({
							key: 'combobox',
							label: 'Bravery Rating',
							placeholder:"Enter value to checkbox",
							options: [
								"Solid",
								"Great",
								"Good",
								"Unproven"
							],
							
						}),
			
						new DropdownDynamicFilter({
							key: 'dropdown',
							label: 'Dropdown Exapmle',
							placeholder:"Enter value to dropdown input",
							options: [
								"Solid",
								"Great",
								"Good",
								"Unproven"
							],
							match: true,
							
						}),
			
						new TextboxDynamicFilter({
							key: 'firstName',
							label: 'First name',
							value: 'Bombasto',
							placeholder:"Enter first name into input",
							required: true,
							match: true,
						}),
			
						new CountboxDynamicFilter({
							key: 'counter',
							label: 'Counter',
							value: 0,
							required: true,
						}),
						
						// new DateDynamicFilter({
						//   key: 'date',
						//   label: 'Date entering',
						// }),
			
						new TextboxDynamicFilter({
							key: 'emailAddress',
							label: 'Email',
							type: 'email',
							
							minLength: 5
						}),
		
						new ComboboxDynamicFilter({
							key: 'combobox123',
							label: 'Bravery Rating',
							placeholder:"Enter value to checkbox",
							options: [
								"Solid",
								"Great",
								"Good",
								"Unproven"
							],
							
						}),
			
						new DropdownDynamicFilter({
							key: 'dropdown123',
							label: 'Dropdown Exapmle',
							placeholder:"Enter value to dropdown input",
							options: [
								"Solid",
								"Great",
								"Good",
								"Unproven"
							],
							
						}),
			
						new TextboxDynamicFilter({
							key: 'firstName213',
							label: 'First name',
							value: 'Bombasto',
							placeholder:"Enter first name into input",
							required: true,
						}),
			
						new CountboxDynamicFilter({
							key: 'counter123',
							label: 'Counter',
							value: 0,
							required: true,
						}),
					]
				},
				{
					title: "Added filter 1",
		
					dynamicFilterInputs: [
						new TextboxDynamicFilter({
							key: 'emailAddress11',
							label: 'Email',
							type: 'email',
							match: true,
							minLength: 5
						})
					]
				},
				{
					title: "sub filter1",
		
					dynamicFilterInputs: [
						new DropdownDynamicFilter({
							key: 'dropdown11',
							label: 'Dropdown Exapmle',
							placeholder:"Enter value to dropdown input",
							options: [
								"Solid",
								"Great",
								"Good",
								"Unproven"
							],
							
						}),
					],
				},
		
			];
		}
		else{
			segmentFilter = [
				{
					title: "Основные",
		
					dynamicFilterInputs: [
			
						new TextboxDynamicFilter({
							key: 'name',
							label: 'Наименование',
							value: '',
							placeholder:"Введите наименование объекта",
							match: true,
						}),

						new TextboxDynamicFilter({
							key: 'purpose',
							label: 'Назначение',
							value: '',
							placeholder:"Введите назначение объекта",
							match: true,
						}),
	
						new TextboxDynamicFilter({
							key: 'description',
							label: 'Описание',
							value: '',
							placeholder:"Введите описание объекта",
							required: true,
						}),
					]
				},
				{
					title: "Реестр",
		
					dynamicFilterInputs: [
						new CountboxDynamicFilter({
							key: 'registryNumber',
							label: 'Реестровый номер',
							value: 0,
						}),

						new DateDynamicFilter({
							key: 'dateEntering',
							label: 'Дата включения',
							//value: new Date(2011, 0, 1)
						}),
					]
				},
				{
					title: "Стоимость",
					dynamicFilterInputs: [
						new InputRangeDynamicFilter({
							key: 'balancPrice',
							label: 'Балансовая стоимость',
							placeholder:"Введите балансовую стоимость объекта",
							inputRangeParameters: {
								min: 1,
								max: 100,
								quantum: 1
							},
							
						}),

						new InputRangeDynamicFilter({
							key: 'ostatochniyPrice',
							label: 'Остаточная стоимость',
							inputRangeParameters: {
								min: 1,
								max: 10000,
								quantum: 100
							},
							
						}),
					],
				},
			];
		}
		
		//return of(segmentFilter);
		return segmentFilter;
	}
}
