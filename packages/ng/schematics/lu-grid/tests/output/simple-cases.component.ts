import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { GridComponent } from '@lucca-front/ng/grid';
import { GridColumnComponent } from '@lucca-front/ng/grid';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<button luButton type="button">
			<lu-grid>
				<lu-grid-column colspan="6">col</lu-grid-column>
				<lu-grid-column colspan="6">col</lu-grid-column>
			</lu-grid>
		</button>
		<lu-grid mode="auto">
			<lu-grid-column>auto</lu-grid-column>
			<lu-grid-column>auto</lu-grid-column>
		</lu-grid>
		<lu-grid columns="1">
			<lu-grid-column justify="start">start</lu-grid-column>
			<lu-grid-column justify="end">end</lu-grid-column>
		</lu-grid>
		<lu-grid>
			<lu-grid-column colspan="12" [responsive]="{ colspanAtMediaMinXS: 4 }">col</lu-grid-column>
			<lu-grid-column colspan="12" [responsive]="{ colspanAtMediaMinXS: 8 }">col</lu-grid-column>
		</lu-grid>
	`,
	imports: [
		ButtonComponent, GridComponent, GridColumnComponent
	]
})
export class SimpleCasesComponent {
}
