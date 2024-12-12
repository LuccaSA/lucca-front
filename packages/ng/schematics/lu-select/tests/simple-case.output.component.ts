import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';

@Component({
	selector: 'lu-select-schematic-simple-case',
	standalone: true,
	template: `
		<lu-simple-select [options]="cultures" class="textfield textfield-input" [(ngModel)]="selectedCulture" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly"></lu-simple-select>
	`,
	imports: [FormsModule, LuSimpleSelectInputComponent],
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
