import { Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { Client, ClientDetailGQL, CreateClientGQL, CreateClientInput, CreatePetGQL, CreatePetInput, GetClientGQL, GetPetDetailGQL, Pet } from "src/graphql/generated";


@Injectable({
    providedIn: 'root'
})
export class ClientCardService
{
    private _clientsData: BehaviorSubject<Client[]> = new BehaviorSubject([] as Client[]);
    private _currentClient: BehaviorSubject<Client> = new BehaviorSubject<Client>({} as Client);
    private _currentPet: BehaviorSubject<Pet> = new BehaviorSubject<Pet>({} as Pet);

    constructor(
        private getClientGQL: GetClientGQL,
        private createClientGQL: CreateClientGQL,
        private clientDetailGQL: ClientDetailGQL,
        private createPetGQL: CreatePetGQL,
        private getPetDetailGQL: GetPetDetailGQL,
    ){

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
    get getSelectedClient$(): Observable<Client>
    {
        return this._currentClient.asObservable();
    }

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
    get getPet$(): Observable<Pet>
    {
        return this._currentPet.asObservable();
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
            map((data) => {
                if (!data.data?.createClient) {
                    return [] as unknown as Client;
                }
                this._clientsData.next(this._clientsData.getValue().concat(data.data.createClient))
                return data.data.createClient;
            }),
        )
    }

    /**
     * Creating pet by its data 
     */
    createPet(data: CreatePetInput)
    {
        return this.createPetGQL.mutate({
            data: data
        })
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

    // /**
    //  * Get all services names and prices
    //  * @petId id of pet
    //  */
    // getAllServices(): void
    // {
    //     this.getAllServiceGQL.watch()
    //     .valueChanges
    //     .subscribe({
    //         next : (data) => {

    //         },
    //         error: (error)  => {
    //             console.log(error)
    //         }
    //     });
    // }

}
