import { Component } from '@angular/core';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';

@Component({
	selector: 'app-numeric-badge',
	imports: [NumericBadgeComponent],
	template: `
		<lu-numeric-badge value="2" palette="product" />
		<lu-numeric-badge value="{{ count() }}" size="S" palette="neutral" />
		<lu-numeric-badge value="{{ items.length | number }}" size="XS" palette="product" />
		<lu-numeric-badge value="{{ total }}" palette="neutral" />
		<lu-numeric-badge value="{{ total }}" palette="product" />
		<lu-numeric-badge value="{{ total }}" [palette]="isSelected ? 'product' : 'neutral'" />
		<lu-numeric-badge value="{{ total }}" [palette]="hasError ? 'error' : 'product'" />
	`,
})
export class NumericCasesComponent {}
