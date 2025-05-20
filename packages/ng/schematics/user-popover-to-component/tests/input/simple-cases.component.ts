import { Component } from '@angular/core';
import { LuUserPopoverDirective } from '@lucca-front/ng/popup-employee';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<span [luUserPopover]="whatever"></span>
	`,
	imports: [
		LuUserPopoverDirective
	]
})
export class SimpleCasesComponent {
}
