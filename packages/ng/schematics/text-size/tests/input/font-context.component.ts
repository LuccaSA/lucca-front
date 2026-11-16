import { Component } from '@angular/core';

@Component({
	selector: 'app-font-context',
	template: `
		<code class="pr-u-textL">npm start</code>
		<a class="link pr-u-textL" href="/help">Lorem ipsum</a>
		<em class="pr-u-textS">Lorem ipsum</em>
		<div class="pr-u-fontFamilyBrand"><span class="pr-u-textM">Lorem ipsum</span></div>
		<div class="u-fontWeightBold"><span class="u-textS">Lorem ipsum</span></div>
		<lu-foo cssClass="pr-u-textS" />
		@defer {
			<p>Lorem ipsum</p>
		} @placeholder {
			<p class="pr-u-textS">Lorem ipsum</p>
		}
	`,
})
export class FontContextCasesComponent {}
