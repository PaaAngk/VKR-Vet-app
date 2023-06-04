export interface SelectedService{
	readonly id: number;
    readonly name: string;
    readonly price: number;
	quantity: number;
}

export interface SelectedGoods{
	readonly id: number;
    readonly name: string;
	readonly measure: string;
    readonly price: number;
	quantity: number;
	readonly allQuantity: number;
}
