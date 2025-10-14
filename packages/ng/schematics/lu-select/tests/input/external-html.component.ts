import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuOptionItemComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';

@Component({
	selector: 'lu-select-schematic-external-html',
	templateUrl: './external-html.component.html',
	imports: [LuSelectInputComponent, LuOptionPickerComponent, LuOptionItemComponent, FormsModule]
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
