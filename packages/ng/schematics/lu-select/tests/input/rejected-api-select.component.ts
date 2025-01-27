import { Component } from '@angular/core';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { LuEstablishmentSelectInputComponent, ALuEstablishmentService } from '@lucca-front/ng/establishment';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-qualification-select placeholder="Select a qualification" class="textfield-input"></lu-qualification-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-user-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select" blabla="foo"></lu-user-select>
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
		<lu-department-select placeholder="Select an establishment" class="textfield-input"></lu-department-select>
	`,
	providers: [
		{
			provide: ALuEstablishmentService,
			useClass: WhateverClassName
		}
	],
	imports: [LuQualificationSelectInputComponent, LuEstablishmentSelectInputComponent, LuDepartmentSelectInputComponent, LuUserSelectModule]
})
export class ApiSelectsComponent {
}
