import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import {TuiAlertService, TuiDialogContext, TuiDialogService, TuiNotification} from '@taiga-ui/core';
import {POLYMORPHEUS_CONTEXT} from '@tinkoff/ng-polymorpheus';
import { CreateClientInput } from 'src/graphql/generated';
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
  selector: 'vet-crm-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddClientComponent {
    value: number | null = null;
	
	readonly searchForm = new FormGroup({
		fullName: new FormControl('', [Validators.required, fullNameValidator, Validators.minLength(4), Validators.maxLength(40)]),
		telephoneNumber: new FormControl('', [Validators.required, Validators.minLength(12)]),
		address: new FormControl(null),
	});

    constructor(
        @Inject(TuiDialogService) private readonly dialogService: TuiDialogService,
        @Inject(POLYMORPHEUS_CONTEXT)
        private readonly context: TuiDialogContext<any, number>,
        @Inject(TuiAlertService) private readonly alertService: TuiAlertService,
        private clientCardService: ClientCardService,
    ) {}

    get hasValue(): boolean {
        return this.searchForm.status == "VALID" ? true : false;
    }

    get data(): number {
        return this.context.data;
    }

    submit(): void {
        if (this.searchForm.status == "VALID") {
            this.clientCardService.createClient(this.searchForm.value as CreateClientInput).subscribe({
                next: () => { 
                    this.alertService.open("Клиент успешно добавлен!", {status: TuiNotification.Success}).subscribe({});
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
