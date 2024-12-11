import { Component } from '@angular/core';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuOptionItemComponent } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'lu-select-schematic-simple-case',
	standalone: true,
	template: `
		<lu-simple-select [options]="cultures" class="textfield textfield-input" [(ngModel)]="selectedCulture" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly"></lu-simple-select>
	`,
	imports: [LuSelectInputComponent, LuOptionPickerComponent, LuOptionItemComponent, FormsModule],
})
export class SimpleCaseInputComponent {
	cultures = [
		{
			name: 'Français',
			code: 'fr-FR',
		},
	];

	selectedCulture = null;

	defaultOnly = false;

	onCultureChanges(): void {}
}
