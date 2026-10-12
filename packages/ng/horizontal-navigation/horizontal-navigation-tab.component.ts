import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { luBooleanAttribute, PortalContent } from '@lucca-front/ng/core';
import { LU_HORIZONTALNAVIGATION_INSTANCE } from './horizontal-navigation.token';

@Component({
	selector: 'lu-horizontal-navigation-tab',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: '<ng-content/>',
	host: {
		class: 'horizontalNavigation_panel',
		role: 'tabpanel',
		tabindex: '0',
		'[class.is-active]': 'selected()',
		'[id]': "'panel-' + index()",
		'[aria-labelledby]': "'tab-' + index()",
	},
})
export class HorizontalNavigationTabComponent {
	protected horizontalNavigationRef = inject(LU_HORIZONTALNAVIGATION_INSTANCE);

	readonly label = input.required<PortalContent>();
	readonly disabled = input(false, { transform: luBooleanAttribute });
	readonly index = computed(() => this.horizontalNavigationRef.getTabIndex(this));
	readonly selected = computed(() => !this.disabled() && this.index() === this.horizontalNavigationRef.selectedIndex());
}
