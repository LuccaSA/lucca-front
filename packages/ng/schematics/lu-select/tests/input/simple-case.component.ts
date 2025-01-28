import { Component } from '@angular/core';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuOptionItemComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { FormsModule } from '@angular/forms';
import { LuInputClearerComponent } from '@lucca-front/ng/input';

@Component({
	selector: 'lu-select-schematic-simple-case',
	standalone: true,
	template: `
		<lu-select class="textfield textfield-input" [(ngModel)]="selectedCulture" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly">
			<span *luDisplayer="let culture">
				{{ culture?.name }}
			</span>
			<lu-input-clearer></lu-input-clearer>
			<lu-option-picker>
				<lu-option *ngFor="let culture of cultures" [value]="culture">
					{{ culture?.name }}
				</lu-option>
			</lu-option-picker>
		</lu-select>
		<lu-select multiple="true" class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly">
			<span *luDisplayer="let culture">
				{{ culture?.name }}
			</span>
			<lu-input-clearer></lu-input-clearer>
			<lu-option-picker>
				<lu-option *ngFor="let culture of cultures" [value]="culture">
					{{ culture?.name }}
				</lu-option>
			</lu-option-picker>
		</lu-select>
		<lu-select [multiple]="true" class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly">
			<span *luDisplayer="let culture">
				{{ culture?.name }}
			</span>
			<lu-input-clearer></lu-input-clearer>
			<lu-option-picker>
				<lu-option *ngFor="let culture of cultures" [value]="culture">
					{{ culture?.name }}
				</lu-option>
			</lu-option-picker>
		</lu-select>
		<lu-select multiple class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly">
			<span *luDisplayer="let culture">
				{{ culture?.name }}
			</span>
			<lu-input-clearer></lu-input-clearer>
			<lu-option-picker>
				<lu-option *ngFor="let culture of cultures" [value]="culture">
					{{ culture?.name }}
				</lu-option>
			</lu-option-picker>
		</lu-select>
	`,
	imports: [LuSelectInputComponent, LuOptionPickerComponent, LuOptionItemComponent, LuInputClearerComponent, FormsModule]
})
export class SimpleCaseComponent {
	cultures = [
		{
			name: 'Français',
			code: 'fr-FR'
		}
	];

	selectedCulture = null;

	selectedCultures = [];

	defaultOnly = false;

	onCultureChanges(): void {
	}
}
