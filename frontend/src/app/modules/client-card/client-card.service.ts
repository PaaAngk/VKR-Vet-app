import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, map, Observable, take } from "rxjs";
import { AnalyzesResearch, Client, ClientDetailGQL, CreateAnalyzesResearchGQL, CreateAnalyzesResearchInput, CreateClientGQL, CreateClientInput, CreatePetGQL, CreatePetInput, CreateReceptionGQL, CreateReceptionInput, DeleteClientGQL, DeletePetGQL, Employee, GetAllAnalyzeTypesGQL, GetAllEmployeesGQL, GetAllGoodsCategoryWithGoodsGQL, GetAllReceptionPurposeGQL, GetAllServiceTypeWithServiceNameGQL, GetClientGQL, GetPetDetailGQL, GoodsCategory, Pet, Reception, ReceptionPurpose, ServiceType, UpdateAnalyzesResearchGQL, UpdateAnalyzesResearchInput, UpdateClientGQL, UpdateClientInput, UpdatePetGQL, UpdatePetInput, UpdateReceptionGQL, UpdateReceptionInput } from "src/graphql/generated";
import { AnalyzesList } from "./analyzes/analyzeFormTemplates";
import { AnalyzeType } from "./models/analyzeType";

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
        private http: HttpClient,

        private getClientGQL: GetClientGQL,
        private createClientGQL: CreateClientGQL,
        private clientDetailGQL: ClientDetailGQL,
        private createPetGQL: CreatePetGQL,
        private getPetDetailGQL: GetPetDetailGQL,
        private getAllServiceTypeWithServiceNameGQL: GetAllServiceTypeWithServiceNameGQL,
		private getAllGoodsCategoryWithGoodsGQL : GetAllGoodsCategoryWithGoodsGQL,
        private getAllEmployeesGQL : GetAllEmployeesGQL,
        private getAllReceptionPurposeGQL: GetAllReceptionPurposeGQL,
        private updateClientGQL: UpdateClientGQL,
        private deleteClientGQL: DeleteClientGQL,
        private updatePetGQL: UpdatePetGQL,
        private deletePetGQL: DeletePetGQL,
        private updateReceptionGQL: UpdateReceptionGQL,
        private createReceptionGQL: CreateReceptionGQL,
        private createAnalyzesResearchGQL: CreateAnalyzesResearchGQL, 
        private updateAnalyzesResearchGQL: UpdateAnalyzesResearchGQL,
        private getAllAnalyzeTypesGQL : GetAllAnalyzeTypesGQL,
    ){
        this.getAllServiceType();
        this.getAllGoodsCategory();
        this.getAllEmployees();
        this.getAllReceptionPurpose();
        this.getClientsData();
        this.getAllAnalyzeTypes();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for client data
     */
    get getclientsData$(): Observable<Client[]>
    {
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
    // @ API methods
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
                this._currentClient.error(error)
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
            data: data,
        }).pipe(
            map(( data ) => {
                if (data.data?.createPet) {
                    // eslint-disable-next-line prefer-const
                    let newClientsPets = {...this._currentClient.getValue()}
                    newClientsPets.pets = newClientsPets.pets?.concat(data.data.createPet)
                    this._currentClient.next(newClientsPets);

                    this.apollo.client.cache.modify({
                        id: this.apollo.client.cache.identify({ __typename: 'Client', id: newClientsPets.id }),
                        fields: {
                            pets() {
                                return newClientsPets.pets
                            },
                        },
                    });

                    this._clientsData.next(this._clientsData.getValue().filter((client: Client) => client.id != newClientsPets.id).concat(newClientsPets));
                }
                return data
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
                this._currentPet.error(error)
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

    getAllAnalyzeTypes(){
        //Getting analyze types 
        this.getAllAnalyzeTypesGQL.watch().valueChanges
		.pipe(take(1))
		.subscribe( ({data}) => {
			// Set id from DB for list of accesing analyzes
			AnalyzesList.map((analyze: AnalyzeType) => 
				analyze['id'] = data.allTypeAnalyzesResearch.find(obj => obj.typeName?.trim() == analyze.name.trim())?.id || -1
			)
        })
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

    /**
     * Updating clients data 
     */
    updateClient(clientId:string, data:UpdateClientInput)
    {
        return this.updateClientGQL.mutate({
            clientId: clientId,
            data: data,
        }).pipe(
            map(( data ) => {
                if (data.data?.updateClient) {
                    this._currentClient.next(data.data.updateClient);
                    return data.data.updateClient;
                }
                return data
            })
        )
    }

    /**
     * Delete client 
     */
    deleteClient(clientId:string)
    {
        return this.deleteClientGQL.mutate({
			clientId: clientId
		}).pipe(
            map(( data ) => {
                if (data.data?.deleteClient) {
                    this._clientsData.next(this._clientsData.getValue().filter( (item:Client) => item.id != clientId));
                    return data.data.deleteClient;
                }
                return data
            })
        )
    }

    /**
     * Updating clients data 
     */
    updatePet(petId:string, data:UpdatePetInput)
    {
        return this.updatePetGQL.mutate({
            petId: petId,
            data: data,
        }).pipe(
            map(( data ) => {
                if (data.data?.updatePet) {
                    this._currentPet.next(data.data.updatePet);
                    return data.data.updatePet;
                }
                return data
            })
        )
    }

    /**
     * Delete pet  rediict when seleect not existing pet 
     */
    deletePet(petId:string)
    {
        return this.deletePetGQL.mutate({
            petId: petId
        })
        .pipe(
            map(( data ) => {
                if (data.data?.deletePet) {
                    // Set deleted pet in client data and update list of clients 
                    // eslint-disable-next-line prefer-const
                    let newClientsPets = {...this._currentClient.getValue()}
                    newClientsPets.pets = newClientsPets.pets?.filter( (pet:Pet) => pet.id != petId)
                    this._currentClient.next(newClientsPets);

                    this.apollo.client.cache.modify({
                        id: this.apollo.client.cache.identify({ __typename: 'Client', id: newClientsPets.id }),
                        fields: {
                            pets() {
                                return newClientsPets.pets
                            },
                        },
                    });

                    const newClient = this._clientsData.getValue().filter((client: Client) => client.id != newClientsPets.id).concat(newClientsPets);
                    this._clientsData.next(newClient);
                }
                return data
            })
        )
    }

    /**
     * Create reception  
     */
    createReception(newData:CreateReceptionInput)
    {
        return this.createReceptionGQL.mutate({
            data: newData,
        }).pipe(
            map(( {data} ) => {
                if (data?.createReception) {
                    // eslint-disable-next-line prefer-const
                    let newPetReception = {...this._currentPet.getValue()}
                    newPetReception.receptions = newPetReception.receptions?.concat(data?.createReception)

                    this.apollo.client.cache.modify({
                        id: this.apollo.client.cache.identify({ __typename: 'Pet', id: newData.petId }),
                        fields: {
                            receptions() {
                                return newPetReception.receptions
                            },
                        },
                    });
                    return data;
                }
                return data
            })
        )
    }

    /**
     * Updating receptions  
     */
    updateReception(receptionId:string, data:UpdateReceptionInput)
    {
        return this.updateReceptionGQL.mutate({
            receptionId: receptionId,
            data: data,
        }).pipe(
            map(( {data} ) => {
                if (data?.updateReception) {

                    // eslint-disable-next-line prefer-const
                    let newPetReception = {...this._currentPet.getValue()}
                    newPetReception.receptions = newPetReception 
                        .receptions?.filter( (reception: Reception) => reception.id != data?.updateReception.id )
                        .concat(data?.updateReception)
                    
                    this._currentPet.next(newPetReception);

                    //Delete reception from cache for fetch in reception view
                    this.apollo.client.cache.evict({id:this.apollo.client.cache.identify({ __typename: 'Reception', id: receptionId })})                    
                    return data;
                }
                return data
            })
        )
    }

    /**
     * Create Analyze with editing cached pet in service and appolo cache  
     */
    createAnalyzesResearch(newData:CreateAnalyzesResearchInput)
    {
        return this.createAnalyzesResearchGQL.mutate({
            data: newData,
        }).pipe(
            map(( {data} ) => {
                if (data?.createAnalyzesResearch) {
                    // eslint-disable-next-line prefer-const
                    let newPetAnalyzesResearchs = {...this._currentPet.getValue()}
                    newPetAnalyzesResearchs.analyzesResearchs = newPetAnalyzesResearchs.analyzesResearchs?.concat(data?.createAnalyzesResearch)
                    this.apollo.client.cache.modify({
                        id: this.apollo.client.cache.identify({ __typename: 'Pet', id: newData.petId }),
                        fields: {
                            analyzesResearchs() {
                                return newPetAnalyzesResearchs.analyzesResearchs
                            },
                        },
                    });
                    return data;
                }
                return data
            })
        )
    }

    /**
     * Updating analyze  
     */
    updateAnalyzesResearch(analyzesResearchId:string, data:UpdateAnalyzesResearchInput)
    {
        return this.updateAnalyzesResearchGQL.mutate({
            analyzesResearchId: analyzesResearchId,
            data: data,
        }).pipe(
            map(( {data} ) => {
                if (data?.updateAnalyzesResearch) {

                    // eslint-disable-next-line prefer-const
                    let newPetAnalyzesResearch = {...this._currentPet.getValue()}
                    newPetAnalyzesResearch.analyzesResearchs = newPetAnalyzesResearch 
                        .analyzesResearchs?.filter( (analyzesResearchs: AnalyzesResearch) => analyzesResearchs.id != data?.updateAnalyzesResearch.id )
                        .concat(data?.updateAnalyzesResearch)
                    
                    this._currentPet.next(newPetAnalyzesResearch);

                    //Delete reception from cache for refetch in reception view
                    this.apollo.client.cache.evict({id:this.apollo.client.cache.identify({ __typename: 'AnalyzesResearch', id: analyzesResearchId })})                    
                    return data;
                }
                return data
            })
        )
    }


    uploadAnalyzeFile(files: File[], analyzeData: any){
        
        const formData:FormData = new FormData();
        files.forEach((file, i) => {
            formData.append(`file${i}`, file);
        })
        formData.append(`analyzeData`, JSON.stringify(analyzeData));
        const headers = new HttpHeaders();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', '*/*');
        const options = { headers: headers };

        console.log(formData)   
        return this.http.post(`http://localhost:3000/analyzes/upload-file`, formData, options)
        // .subscribe({
        //     next: (buffer: any) => {
        //         const fileURL = URL.createObjectURL(new Blob([new Uint8Array(buffer.data).buffer], {type: 'application/pdf'}))
        //         window.open(fileURL);
        //     },
        //     error: (error: any) => console.log(error),
        // })
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * При выборе препарата необходимо указывать количество использованных миллилитров, с условием: 
	 * при использовании 0.5 мл и меньше - стоимость = половина стоимости за мл, 
	 * больше 0.5 мл – полная стоимость мл( мл, таблетки, ампулы)
     * @param good 
     */
    calculateGoodsQuantity(quantity: number ){
        let setQuantity = 0;
        const mod = Math.round((quantity||0 % 1) * 10)
        if ( mod > 0 && mod < 5) setQuantity = Math.round(quantity||0) + 0.5 
        else if(mod >= 5 && mod < 10) setQuantity = Math.round(quantity||0)
        else setQuantity = quantity as number;

        return setQuantity
    }
}

function renameKeys(obj: { [x: string]: any; }, newKeys: { [x: string]: string; }) {
	const keyValues = Object.keys(obj).map(key => {
		const newKey = newKeys[key] || key;
		return { [newKey]: obj[key] };
	});
	return Object.assign({}, ...keyValues);
}
