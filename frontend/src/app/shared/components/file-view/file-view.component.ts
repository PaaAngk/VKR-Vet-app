import { Component, Inject, Input } from '@angular/core';
import { TuiAlertService, TuiNotification } from '@taiga-ui/core';
import { ClientCardService } from 'src/app/modules/client-card/client-card.service';
import { FileData } from './FileData.interface';

@Component({
  selector: 'file-view',
  templateUrl: './file-view.component.html',
})
export class FileViewComponent {
    @Input() inputFile: FileData[] = [];

	constructor(
		private clientCardService: ClientCardService,
		@Inject(TuiAlertService) private readonly alertService: TuiAlertService,
	){}
   
	downloadFile(file: FileData){
		this.clientCardService.downloadAnalyzeFile(file).subscribe({
			error: (error)  => 
			{
				this.alertService.open("Перезагрузите страницу или обратитесь к администратору", {
					status: TuiNotification.Error,
					label:"Не удалось найти файл!",
					autoClose: 5000,
				}).subscribe();		
				console.log(error)
			}
		})
	}
}


