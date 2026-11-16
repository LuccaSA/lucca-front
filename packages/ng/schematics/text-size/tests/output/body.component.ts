import { Component } from '@angular/core';

@Component({
	selector: 'app-body',
	template: `
		<p class="pr-u-bodyXS">Lorem ipsum</p>
		<span class="pr-u-marginRight100 pr-u-bodyS pr-u-colorTextSubtle">Lorem ipsum</span>
		<div class="pr-u-bodyM">Lorem ipsum</div>
		<p class="pr-u-bodyS">Lorem ipsum</p>
		<p [class.pr-u-bodyS]="isCompact">Lorem ipsum</p>
		<p [ngClass]="{ 'pr-u-bodyXS': isCompact, 'pr-u-marginTop100': hasMargin }">Lorem ipsum</p>
		<p class="pr-u-bodyS pr-u-fontWeightSemiBold">Lorem ipsum</p>
		<span class="skeleton-item pr-u-bodyS"></span>
	`,
})
export class BodyCasesComponent {}
