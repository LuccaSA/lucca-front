import { Component } from '@angular/core';
import { ALuEstablishmentService, LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuCoreSelectJobQualificationsDirective, LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-simple-select jobQualifications placeholder="Select a qualification" class="textfield-input"></lu-simple-select>
		<lu-simple-select users placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-simple-select>
		<!-- [lu-select migration] REJECTED: ALuEstablishmentService overriden in providers -->
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
	`,
	providers: [
		{
			provide: ALuEstablishmentService,
			useClass: WhateverClassName
		}
	],
	imports: [LuEstablishmentSelectInputComponent, LuSimpleSelectInputComponent, LuCoreSelectJobQualificationsDirective, LuCoreSelectUsersDirective]
})
export class ApiSelectsComponent {
}
