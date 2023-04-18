import { DynamicFilterBase } from "src/app/shared/components/advanced-dynamic-filter";

export interface AnalyzeType{
	name: string,
	typeName: string,
	form: DynamicFilterBase<any> | null,
	id?: number
}
