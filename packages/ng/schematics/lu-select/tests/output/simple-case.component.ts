import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
// eslint-disable-next-line @typescript-eslint/no-unused-vars
	type ILuUser,
// eslint-disable-next-line @typescript-eslint/no-unused-vars
	LuUserDisplayPipe,
  } from '@lucca-front/ng/user';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';

@Component({
	selector: 'lu-select-schematic-simple-case',
	standalone: true,
	template: `
		<lu-simple-select [options]="cultures" clearable class="textfield textfield-input" [(ngModel)]="selectedCulture" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly" id="foo"></lu-simple-select>
		<lu-multi-select [options]="cultures" clearable class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly"></lu-multi-select>
		<lu-multi-select [options]="cultures" clearable class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly"></lu-multi-select>
		<lu-multi-select [options]="cultures" clearable class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly"></lu-multi-select>
	`,
	imports: [FormsModule,LuSimpleSelectInputComponent, LuMultiSelectInputComponent]
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
