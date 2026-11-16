import { Component } from '@angular/core';

@Component({
	selector: 'app-html-fallback',
	imports: [],
	template: `
		<span class="label palette-neutral pr-u-marginRight100">Total : <strong>{{ total }}</strong></span>
		<p class="label palette-error">{{ request.status }} <a href="/help">Aide</a></p>
	`,
})
export class HtmlFallbackCasesComponent {}
