import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuUserModule } from '@lucca-front/ng/user';

@Component({
	selector: 'app-data-table-page',
	imports: [MainLayoutComponent, ButtonComponent, LuUserModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './data-table.component.html',
})
export class DataTableComponent {}
