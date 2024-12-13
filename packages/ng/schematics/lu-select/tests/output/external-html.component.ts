import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuDisplayerDirective } from '@lucca-front/ng/core-select';

@Component({
	selector: 'lu-select-schematic-external-html',
	standalone: true,
	templateUrl: './external-html.component.html',
	imports: [FormsModule, LuSimpleSelectInputComponent, LuOptionDirective, LuDisplayerDirective]
})
export class SimpleCaseInputComponent {
	cultures = [
		{
			name: 'Français',
			code: 'fr-FR'
		}
	];

	selectedCulture = null;

	defaultOnly = false;

	onCultureChanges(): void {
	}
}
