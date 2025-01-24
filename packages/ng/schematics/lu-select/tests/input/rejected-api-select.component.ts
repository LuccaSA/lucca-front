import { Component } from '@angular/core';
import { LuQualificationSelectInputComponent } from '@lucca-front/ng/qualification';
import { LuEstablishmentSelectInputComponent, ALuEstablishmentService } from '@lucca-front/ng/establishment';
import { LuUserSelectModule } from '@lucca-front/ng/user';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-qualification-select placeholder="Select a qualification" class="textfield-input"></lu-qualification-select>
		<lu-user-select placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-user-select>
		<lu-establishment-select placeholder="Select an establishment" class="textfield-input"></lu-establishment-select>
	`,
	providers: [
		{
			provide: ALuEstablishmentService,
			useClass: WhateverClassName
		}
	],
	imports: [LuUserSelectModule, LuQualificationSelectInputComponent, LuEstablishmentSelectInputComponent]
})
export class ApiSelectsComponent {
}
