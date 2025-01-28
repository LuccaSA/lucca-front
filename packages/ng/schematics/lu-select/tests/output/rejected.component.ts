import { Component } from '@angular/core';
import { LuEstablishmentSelectInputComponent, ALuEstablishmentService } from '@lucca-front/ng/establishment';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuOptionItemComponent, LuOptionSelectAllComponent } from '@lucca-front/ng/option';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-simple-select jobQualifications placeholder="Select a qualification" class="textfield-input"></lu-simple-select>
		<lu-simple-select users placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-simple-select>
		<!-- [lu-select migration] REJECTED: Unsupported input: blabla -->
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select" blabla="foo"></lu-user-select>
		<!-- [lu-select migration] REJECTED: ALuEstablishmentService overriden in providers -->
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
		<lu-department-select placeholder="Select an establishment" class="textfield-input"></lu-department-select>
		<!-- [lu-select migration] REJECTED: lu-option-select-all requires manual work and API support to be migrated -->
		<lu-select class="textfield-input">
			<lu-option *ngFor="let culture of cultures" [value]="culture">
				{{ culture?.name }}
			</lu-option>
			<lu-option-picker-advanced>
				<lu-option-select-all></lu-option-select-all>
			</lu-option-picker-advanced>
			<lu-input-clearer></lu-input-clearer>
		</lu-select>
		<!-- [lu-select migration] REJECTED: Tree selects don't have their "modern" implementation yet -->
		<lu-select class="textfield-input">
			<lu-tree-option *ngFor="let culture of cultures" [value]="culture">
				{{ culture?.name }}
			</lu-tree-option>
		</lu-select>
		<!-- [lu-select migration] REJECTED: conditional multiple isn't supported by the schematic, you might want to use @if to surround this and run the migration again -->
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
			useClass: WhateverClassName
		}
	],
	imports: [LuEstablishmentSelectInputComponent, LuUserSelectModule, LuSelectInputComponent, LuOptionSelectAllComponent, LuOptionItemComponent, LuDepartmentSelectInputComponent, LuSimpleSelectInputComponent, LuCoreSelectJobQualificationsDirective, LuCoreSelectUsersDirective]
})
export class ApiSelectsComponent {
}
