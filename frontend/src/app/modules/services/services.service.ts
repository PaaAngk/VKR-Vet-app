import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { BehaviorSubject, map, Observable } from "rxjs";
import { CreateServiceGQL, CreateServiceInput, GetAllServiceGQL, GetAllServiceTypeGQL, Service, ServiceType, UpdateServiceGQL, UpdateServiceInput } from "src/graphql/generated";


@Injectable({
    providedIn: 'root'
})
export class ServicesService
{
    private _serviceList : BehaviorSubject<Array<Service>> = new BehaviorSubject([] as Service[]);
    private _serviceTypesList : BehaviorSubject<Array<ServiceType>> = new BehaviorSubject([] as ServiceType[]);


    constructor(
        private apollo: Apollo,
        private getAllServiceGQL: GetAllServiceGQL,
        private createServiceGQL : CreateServiceGQL,
        private getAllServiceTypeGQL: GetAllServiceTypeGQL,
        private updateServiceGQL: UpdateServiceGQL,
    ){
        this.getAllServices();
        this.getAllServiceTypes();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for services
     */
    get getServices$(): Observable<Service[]>
    {
        return this._serviceList.asObservable();
    }

    /**
     * Getter for service types
     */
    get getServiceTypes$(): Observable<ServiceType[]>
    {
        return this._serviceTypesList.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all services
     */
    getAllServices(): void
    {
        this.getAllServiceGQL.watch()
        .valueChanges.subscribe({
            next : (data) => {
                this._serviceList.next(data.data.allServices)
            },
            error: (error)  => {
                console.log(error)
            }
        });
    }

    /**
     * Get all services
     */
    getAllServiceTypes(): void
    {
        this.getAllServiceTypeGQL.watch()
        .valueChanges.subscribe({
            next : (data) => {
                this._serviceTypesList.next(data.data.allServiceType)
            },
            error: (error)  => {
                console.log(error)
            }
        });
    }

    /**
     * Query for service create
     * @param data CreateServiceInput 
     * @returns Observable of created service
     */
    createService(data: CreateServiceInput){
        return this.createServiceGQL.mutate({
            data: data
        }).pipe(
            map(( data ) => {
                if (data.data?.createService) {
                    this._serviceList.next(this._serviceList.getValue().concat(data.data?.createService));
                }
            })
        )
    }

    /**
     * Update service and replace updated in serviceList
     * @param id id current service
     * @param newService UpdateServiceInput new service data
     * @returns Observable of updated service
     */
    updateService(id:number, newService : UpdateServiceInput){
        console.log(newService)
        return this.updateServiceGQL.mutate({
            data: newService,
            serviceId: id
        }).pipe(
            map(( {data} ) => {
                
                if (data?.updateService) {
                    this._serviceList.next(
                        this._serviceList.getValue().map(val => {
                            return val.id === data?.updateService.id ? data?.updateService : val
                        })
                    );
                }
                console.log(this._serviceList.getValue())
            })
        )
    }
}
