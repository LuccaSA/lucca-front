import { Component } from '@angular/core';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuCoreSelectJobQualificationsDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectUsersDirective } from '@lucca-front/ng/core-select';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';

@Component({
	selector: 'lu-select-schematic-api-selects',
	standalone: true,
	template: `
		<lu-simple-select jobQualifications placeholder="Select a qualification" class="textfield-input"></lu-simple-select>
		<lu-simple-select users placeholder="Select a user" class="textfield-input" data-testid="lu-select"></lu-simple-select>
		<lu-simple-select establishments placeholder="Select an establishment" class="textfield-input"></lu-simple-select>
		<lu-multi-select establishments placeholder="Select an establishment" class="textfield-input"></lu-multi-select>
	`,
	imports: [LuSimpleSelectInputComponent, LuCoreSelectJobQualificationsDirective, LuCoreSelectUsersDirective, LuCoreSelectEstablishmentsDirective, LuMultiSelectInputComponent]
})
export class ApiSelectsComponent {
}
