import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';

@Component({
	selector: 'app-data-table-page',
	imports: [MainLayoutComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './data-table.component.html',
})
export class DataTableComponent {}
