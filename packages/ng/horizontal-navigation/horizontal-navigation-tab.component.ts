import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { PortalContent } from '@lucca-front/ng/core';
import { LU_HORIZONTALNAVIGATION_INSTANCE } from './horizontal-navigation.token';

@Component({
	selector: 'lu-horizontal-navigation-tab',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content/>',
	host: {
		class: 'horizontalNavigation_panel',
		'[class.is-active]': 'selected()',
		role: 'tabpanel',
		'[id]': "'panel-' + index()",
		'[aria-labelledby]': "'tab-' + index()",
		tabindex: '0',
	},
})
export class HorizontalNavigationTabComponent {
	protected horizontalNavigationRef = inject(LU_HORIZONTALNAVIGATION_INSTANCE);

	readonly label = input.required<PortalContent>();
	readonly disabled = input(false, { transform: booleanAttribute });
	readonly index = computed(() => this.horizontalNavigationRef.getTabIndex(this));
	readonly selected = computed(() => this.index() === this.horizontalNavigationRef.selected());
}
