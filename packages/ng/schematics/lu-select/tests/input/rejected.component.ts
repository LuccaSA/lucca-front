import { Component } from '@angular/core';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
import { ALuEstablishmentService, LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
import { LuOptionItemComponent, LuOptionSelectAllComponent } from '@lucca-front/ng/option';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { EstablishmentServiceOverride } from '../establishment-service-override';

@Component({
	selector: 'lu-select-schematic-api-selects',
	template: `
		<lu-qualification-select placeholder="Select a qualification" class="textfield-input"></lu-qualification-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-user-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select" blabla="foo"></lu-user-select>
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
		<lu-department-select placeholder="Select a department" class="textfield-input"></lu-department-select>
		<lu-select class="textfield-input">
			<lu-option *ngFor="let culture of cultures" [value]="culture">
				{{ culture?.name }}
			</lu-option>
			<lu-option-picker-advanced>
				<lu-option-select-all></lu-option-select-all>
			</lu-option-picker-advanced>
			<lu-input-clearer></lu-input-clearer>
		</lu-select>
		<lu-select class="textfield-input">
			<lu-tree-option *ngFor="let culture of cultures" [value]="culture">
				{{ culture?.name }}
			</lu-tree-option>
		</lu-select>
		<lu-select [multiple]="someCondition" class="textfield textfield-input" [(ngModel)]="selectedCultures" (ngModelChange)="onCultureChanges()" [disabled]="defaultOnly">
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
	providers: [
		{
			provide: ALuEstablishmentService,
			useClass: EstablishmentServiceOverride
		}
	],
	imports: [
		LuQualificationSelectInputComponent,
		LuEstablishmentSelectInputComponent,
		LuUserSelectModule,
		LuSelectInputComponent,
		LuOptionSelectAllComponent,
		LuOptionItemComponent,
		LuDepartmentSelectInputComponent
	]
})
export class ApiSelectsComponent {
}
