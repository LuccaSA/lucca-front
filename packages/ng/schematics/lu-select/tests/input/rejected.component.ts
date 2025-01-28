import { Component } from '@angular/core';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { LuEstablishmentSelectInputComponent, ALuEstablishmentService } from '@lucca-front/ng/establishment';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuOptionItemComponent, LuOptionSelectAllComponent } from '@lucca-front/ng/option';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-qualification-select placeholder="Select a qualification" class="textfield-input"></lu-qualification-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-user-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select" blabla="foo"></lu-user-select>
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
		<lu-department-select placeholder="Select an establishment" class="textfield-input"></lu-department-select>
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
	`,
	providers: [
		{
			provide: ALuEstablishmentService,
			useClass: WhateverClassName
		}
	],
	imports: [LuQualificationSelectInputComponent, LuEstablishmentSelectInputComponent, LuUserSelectModule, LuSelectInputComponent, LuOptionSelectAllComponent, LuOptionItemComponent, LuDepartmentSelectInputComponent]
})
export class ApiSelectsComponent {
}
