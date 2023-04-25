import { Component, Input } from '@angular/core';
import { ClientCardService } from 'src/app/modules/client-card/client-card.service';
import { FileData } from './FileData.interface';

@Component({
  selector: 'file-view',
  templateUrl: './file-view.component.html',
})
export class FileViewComponent {
    @Input() inputFile: FileData[] = [];

	constructor(private clientCardService: ClientCardService){}
   
	downloadFile(file: FileData){
		this.clientCardService.downloadAnalyzeFile(file)
	}
}


