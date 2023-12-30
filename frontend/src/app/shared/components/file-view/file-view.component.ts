import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { ClientCardService } from 'src/app/modules/client-card/client-card.service';
import { FileData } from './FileData.interface';

@Component({
  selector: 'file-view',
  templateUrl: './file-view.component.html',
})
export class FileViewComponent {
    @Input() inputFile: FileData[] = [];
	loading = false;
	loadProgress= 0;
	loadProgressTotal = 1000;

	constructor(
		private clientCardService: ClientCardService,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
		public _changeDetectorRef: ChangeDetectorRef,
	){}
   
	downloadFile(file: FileData){
		this.loading = true;
		this.clientCardService.downloadAnalyzeFile(file).subscribe({
			next: (event: any) => {
				if (event.type === 3) {
					this.loadProgress = event.loaded;
					this.loadProgressTotal = event.total
					this._changeDetectorRef.markForCheck();
				}
				if (event.type === 4) {
					// console.log("donwload completed");
					this.loading = false;
					this._changeDetectorRef.markForCheck();
					this.loadProgress = 0;
				}
		
			},
			error: (error)  => 
			{
				this.alertService.open("Перезагрузите страницу или обратитесь к администратору", {
					status: TuiNotification.Error,
					label:"Не удалось найти файл!",
					autoClose: 5000,
				}).subscribe();		
				console.log(error)
				this.loading = false;
				this._changeDetectorRef.markForCheck();
			}
		})
	}
}


