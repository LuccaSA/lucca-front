import { Component } from '@angular/core';

@Component({
	selector: 'app-numeric-badge',
	imports: [],
	template: `
		<span class="label mod-number">2</span>
		<span class="label mod-number palette-neutral mod-S">{{ count() }}</span>
		<span class="label palette-product mod-number mod-XS">{{ items.length | number }}</span>
		<span class="label mod-number palette-grey">{{ total }}</span>
		<span class="label mod-number palette-primary">{{ total }}</span>
		<span class="label mod-number palette-neutral" [class.palette-product]="isSelected">{{ total }}</span>
		<span class="label mod-number" [class.palette-critical]="hasError">{{ total }}</span>
	`,
})
export class NumericCasesComponent {}
