import { DynamicFilterService } from './../../shared/components/advanced-dynamic-filter/dynamic-filter.service';
import { DynamicFilterBase } from './../../shared/components/advanced-dynamic-filter/dynamic-filter-base.class';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html'
})
export class RegistryComponent implements OnInit {

	// visibilitySidebarFilter = false;

	// payLoad= '';

	// segmentForm$: DynamicFilterBase<string | number | string[]>[];
 
    // toggleVisibilitySidebarFilter(visibilitySidebarFilter: boolean): void {
    //     this.visibilitySidebarFilter = visibilitySidebarFilter;
    // }

	constructor(
		//private dynamicFilterService: DynamicFilterService
	) {
		
	}

	ngOnInit() {
		//this.segmentForm$ = this.dynamicFilterService.getFilter('');
	}

}
