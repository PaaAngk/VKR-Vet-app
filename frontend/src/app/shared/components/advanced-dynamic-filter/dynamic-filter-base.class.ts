/**
 * Interface to create section of filter, should include implemented interface DynamicFilterInput  
 */
export interface DynamicFilterBase<T>{
	title: string;
	dynamicFilterInputs: DynamicFilterInput<T>[];
}

/**
 * Interface to create input
 *  
 * @param value Preset input value. For Date set js date format value. Not Support date range 
 * @param key string - Key for input to define inputs
 * @param label string - Input header
 * @param match boolean - Define match switch under input
 * @param controlType string - Define input type in input class
 * @param type string - Special type for textbox. Ex.: email
 * @param required boolean - Definition a input is required 
 * @param minLength number - Definition a input minimum length
 * @param maxLength number | null - Definition a input maximum length
 * @param validationPatern string - Definition a RegExp patern
 * @param placeholder string - Define placeholder for input
 * @param postfix string - A postfix string
 * @param readOnly boolean - Set input to only read
 * @param options string[] - Array of values for combobox and dropdown
 * @param inputRangeParameters :{[key: string]: number} - Value for setting range input parameter. Parameters: min - Min value; max - Max value,  quantum - Minimum indivisible value,  steps - Number of actual discrete slider steps; segments - A number of visual segments
 */
export class DynamicFilterInput<T> {
	value: T | undefined; // Preset input value, except date and range date
	key: string; // Key for input to define inputs
	label: string; // Input header
	match: boolean; // Define match switch under input
	controlType: string; // Define input type in input class
	type: string; // Special type for textbox. Ex.: email
	required: boolean; // Definition a input is required   
	minLength: number; // Definition a input minimum length
	maxLength: number | null; // Definition a input maximum length
	validationPatern: string; // Definition a RegExp patern 
	placeholder:string; // Define placeholder for input
	postfix:string; // A postfix string
	readOnly: boolean; // Set input to only read
	options: string[]; // Array of values for combobox and dropdown
	inputRangeParameters : {[key: string]: number}; // Value for setting range input parameter. 
												// min - Min value; max - Max value, 
												// quantum - Minimum indivisible value, 
												// steps - Number of actual discrete slider steps;
												// segments - A number of visual segments
												// precision - A number of digits after comma
	constructor(options: {
			value?: T;
			key?: string;
			label?: string;
			required?: boolean;
			match?: boolean;
			controlType?: string;
			type?: string;
			minLength?: number;
			maxLength?: number | null;
			validationPatern?: string;
			placeholder?:string;
			options?: string[];
			postfix?: string;
			readOnly?: boolean;
			inputRangeParameters?: {[key: string]: number};
		} = {}) {
		this.value = options.value;
		this.key = options.key || '';
		this.label = options.label || '';
		this.required = !!options.required;
		this.match = options.match || false;
		this.controlType = options.controlType || '';
		this.type = options.type || '';
		this.minLength = options.minLength || 0;
		this.maxLength = options.maxLength || null;
		this.validationPatern = options.validationPatern || '';
		this.placeholder = options.placeholder || '';
		this.postfix = options.postfix || '';
		this.readOnly = options.readOnly || false;
		this.options = options.options || [];
		this.inputRangeParameters = options.inputRangeParameters || {min:-Infinity, max:Infinity, quantum:0.0001, precision:2};
	}
}


// new DateDynamicFilter({
// 	key: 'dateSelector',
// 	label: 'Date entering',
// 	value: new Date(2011, 0, 1)
// }),

// new DateRangeDynamicFilter({
// 	key: 'dateRangeSelector',
// 	label: 'Date entering',
// }),

// // new DateDynamicFilter({
// //   key: 'date',
// //   label: 'Date entering',
// // }),
// new ComboboxDynamicFilter({
// 	key: 'combobox123',
// 	label: 'Bravery Rating',
// 	placeholder:"Enter value to checkbox",
// 	options: [
// 		"Solid",
// 		"Great",
// 		"Good",
// 		"Unproven"
// 	],
	
// }),

// new DropdownDynamicFilter({
// 	key: 'dropdown123',
// 	label: 'Dropdown Exapmle',
// 	placeholder:"Enter value to dropdown input",
// 	options: [
// 		"Solid",
// 		"Great",
// 		"Good",
// 		"Unproven"
// 	],
// }),

// new TextboxDynamicFilter({
// 	key: 'firstName213',
// 	label: 'First name',
// 	value: 'Bombasto',
// 	placeholder:"Enter first name into input",
// 	required: true,
// }),

// new CountboxDynamicFilter({
// 	key: 'counter123',
// 	label: 'Counter',
// 	value: 0,
// 	required: true,
// }),