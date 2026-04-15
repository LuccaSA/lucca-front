import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luHorizontalNavigationTab]',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: 'test',
	host: {
		class: 'test',
	},
})
export class HorizontalNavigationTabComponent {}
