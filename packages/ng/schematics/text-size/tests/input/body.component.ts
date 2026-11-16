import { Component } from '@angular/core';

@Component({
	selector: 'app-body',
	template: `
		<p class="pr-u-textXS">Lorem ipsum</p>
		<span class="pr-u-marginRight100 pr-u-textS pr-u-colorTextSubtle">Lorem ipsum</span>
		<div class="pr-u-textM">Lorem ipsum</div>
		<p class="u-textS">Lorem ipsum</p>
		<p [class.pr-u-textS]="isCompact">Lorem ipsum</p>
		<p [ngClass]="{ 'pr-u-textXS': isCompact, 'pr-u-marginTop100': hasMargin }">Lorem ipsum</p>
		<p class="pr-u-textS pr-u-fontWeightSemiBold">Lorem ipsum</p>
		<span class="skeleton-item pr-u-textS"></span>
	`,
})
export class BodyCasesComponent {}
