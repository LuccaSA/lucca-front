import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

@Component({
	selector: 'lu-select-schematic-external-html',
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

	testComparer = (a, b) => a === b;
}
