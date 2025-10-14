import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';

@Component({
	selector: 'app-data-table',
	imports: [MainLayoutComponent],
	templateUrl: './data-table.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent {}
