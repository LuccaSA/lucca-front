import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-test',
	standalone: true,
	template: `
		<div class="grid">
			<div class="grid-column" style="--grid-colspan: 6">div migrated</div>
			<span class="grid-column" style="--grid-colspan: 6">span migrated</span>
			<button class="grid-column" style="--grid-colspan: 6">button skipped</button>
		</div>
		<span class="grid mod-auto">
			<span class="grid-column">span auto migrated</span>
		</span>
		<label class="grid">
			<span class="grid-column">span in label skipped</span>
		</label>
		<label class="grid">
			<li class="grid-column">label skipped, li skipped</li>
		</label>
	`,
	imports: [
		ButtonComponent
	]
})
export class MixedElementsComponent {
}
