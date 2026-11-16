import { Component } from '@angular/core';

@Component({
	selector: 'app-legacy',
	imports: [],
	template: `
		<span class="label palette-neutral">Texte</span>
		<span class="label mod-number">{{ count }}</span>
	`,
})
export class LegacyComponent {}
