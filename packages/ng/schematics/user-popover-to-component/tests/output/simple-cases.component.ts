import { Component } from '@angular/core';
import { LuUserPopoverComponent } from '@lucca-front/ng/popup-employee';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<span [luUserPopover]="whatever"></span>
	`,
	imports: [
		LuUserPopoverComponent
	]
})
export class SimpleCasesComponent {
}
