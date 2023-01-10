import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { Client, ClientDetailGQL, CreateClientGQL, CreateClientInput, CreatePetGQL, CreatePetInput, Employee, GetAllEmployeesGQL, GetAllGoodsCategoryWithGoodsGQL, GetAllReceptionPurposeGQL, GetAllServiceTypeWithServiceNameGQL, GetClientGQL, GetPetDetailGQL, GoodsCategory, Pet, ReceptionPurpose, ServiceType } from "src/graphql/generated";


@Injectable({
    providedIn: 'root'
})
export class ClientCardService
{
    private _clientsData: BehaviorSubject<Client[]> = new BehaviorSubject([] as Client[]);
    private _currentClient: BehaviorSubject<Client> = new BehaviorSubject<Client>({} as Client);
    private _currentPet: BehaviorSubject<Pet> = new BehaviorSubject<Pet>({} as Pet);
    
    private _serviceTypesList : BehaviorSubject<Array<ServiceType>> = new BehaviorSubject([] as ServiceType[]);
	private _goodsCategoriesList : BehaviorSubject<Array<GoodsCategory>> = new BehaviorSubject([] as GoodsCategory[]);
    private _employeesList : BehaviorSubject<Array<Employee>> = new BehaviorSubject([] as Employee[]);
    private _receptionPurposesList : BehaviorSubject<Array<ReceptionPurpose>> = new BehaviorSubject([] as ReceptionPurpose[]);


    constructor(
        private apollo: Apollo,
        private getClientGQL: GetClientGQL,
        private createClientGQL: CreateClientGQL,
        private clientDetailGQL: ClientDetailGQL,
        private createPetGQL: CreatePetGQL,
        private getPetDetailGQL: GetPetDetailGQL,
        private getAllServiceTypeWithServiceNameGQL: GetAllServiceTypeWithServiceNameGQL,
		private getAllGoodsCategoryWithGoodsGQL : GetAllGoodsCategoryWithGoodsGQL,
        private getAllEmployeesGQL : GetAllEmployeesGQL,
        private getAllReceptionPurposeGQL: GetAllReceptionPurposeGQL
    ){
        this.getAllServiceType();
        this.getAllGoodsCategory();
        this.getAllEmployees();
        this.getAllReceptionPurpose();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for client data
     */
    get getclientsData$(): Observable<Client[]>
    {
        this.getClientsData();
        return this._clientsData.asObservable();
    }

    /**
     * Setter for current select client data
     * @client string client id
     */
    setSelectedClient(clientId:string)
    {
        this.getClientDetail(clientId)
    }

    /**
     * Getter for current selected client
     */
    get getSelectedClient$(): Observable<Client>{ return this._currentClient.asObservable(); }

    /**
     * Setter for current pet
     */
    setPet(petId:string)
    {
        this.getPetDetail(petId)
    }

    /**
     * Getter for current selected client
     */
    get getPet$(): Observable<Pet>{ return this._currentPet.asObservable(); }

    get getServiceTypes$() : Observable<Array<ServiceType>>{
        return this._serviceTypesList.asObservable();
    }

    get getGoodsCategories$() : Observable<Array<GoodsCategory>>{
        return this._goodsCategoriesList.asObservable();
    }

    get getAllEmployees$() : Observable<Array<Employee>>{
        return this._employeesList.asObservable();
    }

    get getAllReceptionPurpose$() : Observable<Array<ReceptionPurpose>>{
        return this._receptionPurposesList.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get clients data with search string on name and phone number
     * @search (optionaly) for search need client 
     */
    getClientsData(search?:string): void
    {
        // Delete first letter in search string when enter telephone 
        // number starts on 8. Because number stored in +7 and 8
        if (search){
            if(parseInt(search)){
                search = search.slice(1)
            }
        }

        this.getClientGQL.watch({
            search: search == undefined ? "" : search
        })
        .valueChanges.subscribe({
            next : (data) => {
                this._clientsData.next(data.data.clientsWithSearch)
            },
            error: (error)  => {
                console.log(error)
            }
        });
    }

    /**
     * Get clients data with its pets
     * @clientId id of client
     */
    getClientDetail(clientId:string): void
    {
        this.clientDetailGQL.watch({
            clientId:clientId
        })
        .valueChanges.subscribe({
            next : (data) => {
                this._currentClient.next(data.data.clientDetail)
            },
            error: (error)  => {
                console.log(error)
            }
        });
    }


    /**
     * Creating client by its data 
     */
    createClient(data: CreateClientInput): Observable<Client>
    {
        return this.createClientGQL.mutate({
            data: data
        })
        .pipe(
            map(( data ) => {
                if (data.data?.createClient) {
                    this._clientsData.next(this._clientsData.getValue().concat(data.data.createClient));
                    return data.data.createClient;
                }
                return {} as Client
            })
        )
    }

    /**
     * Creating pet by its data 
     */
    createPet(data: CreatePetInput)
    {
        return this.createPetGQL.mutate({
            data: data
        }).pipe(
            map(( data ) => {
                if (data.data?.createPet) {
                    // eslint-disable-next-line prefer-const
                    let newClientsPets = {...this._currentClient.getValue()}
                    newClientsPets.pets = newClientsPets.pets?.concat(data.data.createPet)
                    this._currentClient.next(newClientsPets);
                }
            })
        )
    }

    /**
     * Get pet data with reception and analyzes
     * @petId id of pet
     */
    getPetDetail(petId:string): void
    {
        this.getPetDetailGQL.watch({
            petId:petId
        })
        .valueChanges.subscribe({
            next : (data) => {
                this._currentPet.next(data.data.pet)
            },
            error: (error)  => {
                console.log(error)
            }
        });
    }

    /**
     * Get all service in its category
     */
    getAllServiceType(): void
    {
        this.getAllServiceTypeWithServiceNameGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe({
			next : (data) => {
                this._serviceTypesList.next(data.data.allServiceType.map(item => renameKeys(item, { service: "items" })));
            },  
		});
    }

    /**
     * Get all service in its category
     */
    getAllGoodsCategory(): void
    {
        this.getAllGoodsCategoryWithGoodsGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe({
			next : (data) => {
                this._goodsCategoriesList.next(data.data.allGoodsCategory
                .map(item => renameKeys(renameKeys(item, { goods: "items" }), { categoryName: "typeName" })));
            },
		});
    }

    /**
     * Get all employees
     */
    getAllEmployees(): void
    {
        this.getAllEmployeesGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe({
			next : (data) => {
                this._employeesList.next(data.data.allEmployees)
            },
		});
    }

    /**
     * Get all purpose of reception
     */
    getAllReceptionPurpose(): void
    {
        this.getAllReceptionPurposeGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe({
			next : (data) => {
                this._receptionPurposesList.next(data.data.allReceptionPurpose)
            },
		});
    }


}

function renameKeys(obj: { [x: string]: any; }, newKeys: { [x: string]: string; }) {
	const keyValues = Object.keys(obj).map(key => {
		const newKey = newKeys[key] || key;
		return { [newKey]: obj[key] };
	});
	return Object.assign({}, ...keyValues);
}
