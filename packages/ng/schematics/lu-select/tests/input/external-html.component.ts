import { Component } from '@angular/core';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuOptionItemComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'lu-select-schematic-external-html',
	standalone: true,
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
}
