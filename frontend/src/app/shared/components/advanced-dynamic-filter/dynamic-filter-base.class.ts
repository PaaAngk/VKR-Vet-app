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
	options: string[]; // Array of values for combobox and dropdown
	inputRangeParameters : {[key: string]: number}; // Value for setting range input parameter. 
												// min - Min value; max - Max value, 
												// quantum - Minimum indivisible value, 
												// steps - Number of actual discrete slider steps;
												// segments - A number of visual segments
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
		this.options = options.options || [];
		this.inputRangeParameters = options.inputRangeParameters || {min:1, max:100, quantum:1};
	}
}


