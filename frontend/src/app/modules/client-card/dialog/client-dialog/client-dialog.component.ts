import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { Client, CreateClientInput, UpdateClientInput } from 'src/graphql/generated';
import { ClientCardService } from '../../client-card.service';

const latinChars = /^[а-яА-Я ]+$/;
 
export function fullNameValidator(field: AbstractControl): Validators | null {
    return field.value && latinChars.test(field.value)
        ? null
        : {
              other: `Только русские буквы разрешены!`,
          };
}

@Component({
  selector: 'vet-crm-client-dialog',
  templateUrl: './client-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogClientComponent {
    value: number | null = null;
    clientsId:string = '';
	
	readonly searchForm = new FormGroup({
		fullName: new FormControl('', [Validators.required, fullNameValidator, Validators.minLength(4), Validators.maxLength(40)]),
		telephoneNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
		address: new FormControl(''),
	});

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, string>,
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        private clientCardService: ClientCardService,
    ) {
        if(this.context.data == 'edit'){
            this.clientCardService.getSelectedClient$
            .subscribe((client: Client) => {
                this.searchForm.setValue({
                    fullName: client.fullName, 
                    address: client.address as string,
                    telephoneNumber: client.telephoneNumber,
                }); 
                this.clientsId = client.id
            });
        }
    }

    get hasValue(): boolean {
        return this.searchForm.status == "VALID" ? true : false;
    }

    get data(): string {
        return this.context.data;
    }

    submit(): void {
        if (this.searchForm.status == "VALID" ) {
            if(this.context.data == 'add'){
                this.clientCardService.createClient(this.searchForm.value as CreateClientInput).subscribe({
                    next: (data ) => { 
                        this.alertService.open("", {status: TuiNotification.Success, label:"Клиент успешно добавлен!"}).subscribe({});
                        this.context.completeWith(data); 
                    },
                    error: (error)  => 
                    {
                        this.alertService.open("Клиент уже добавлен", {status: TuiNotification.Error}).subscribe({})
                        console.log(error)
                    }
                })
            }
            else if(this.context.data == 'edit'){
                this.clientCardService.updateClient(this.clientsId ,this.searchForm.value as UpdateClientInput).subscribe({
                    next: () => { 
                        this.alertService.open("", {status: TuiNotification.Success, label:"Данные успешно обновлены!"}).subscribe({});
                        this.context.completeWith(this.searchForm.value); 
                    },
                    error: (error)  => 
                    {
                        this.alertService.open("Клиент уже добавлен", {status: TuiNotification.Error}).subscribe({})
                        console.log(error)
                    }
                })
            }
        }
    }

}
