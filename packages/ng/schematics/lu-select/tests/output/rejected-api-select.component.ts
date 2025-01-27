import { Component } from '@angular/core';
import { LuEstablishmentSelectInputComponent, ALuEstablishmentService } from '@lucca-front/ng/establishment';
import { LuUserSelectModule } from '@lucca-front/ng/user';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
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
	`,
	providers: [
		{
			provide: ALuEstablishmentService,
			useClass: WhateverClassName
		}
	],
	imports: [LuEstablishmentSelectInputComponent, LuDepartmentSelectInputComponent, LuUserSelectModule, LuSimpleSelectInputComponent, LuCoreSelectJobQualificationsDirective, LuCoreSelectUsersDirective]
})
export class ApiSelectsComponent {
}
