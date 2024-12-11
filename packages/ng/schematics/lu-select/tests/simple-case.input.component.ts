import { Component } from '@angular/core';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuOptionItemComponent } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'lu-select-schematic-simple-case',
	standalone: true,
	template: `
		<lu-select class="textfield textfield-input" [(ngModel)]="selectedCulture" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly">
			<span *luDisplayer="let culture">
				{{ culture?.name }}
			</span>
			<lu-option-picker>
				<lu-option *ngFor="let culture of cultures" [value]="culture">
					{{ culture?.name }}
				</lu-option>
			</lu-option-picker>
		</lu-select>
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
