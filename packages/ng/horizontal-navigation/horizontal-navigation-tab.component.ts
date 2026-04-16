import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, ViewChild } from '@angular/core';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LU_HORIZONTALNAVIGATION_INSTANCE } from './horizontal-navigation.token';

@Component({
	selector: 'lu-horizontal-navigation-tab',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './horizontal-navigation-tab-component.html',
	imports: [PortalDirective],
	host: {
		class: 'horizontalNavigation-list-item',
		role: 'presentation',
	},
})
export class HorizontalNavigationTabComponent {
	protected horizontalNavigationRef = inject(LU_HORIZONTALNAVIGATION_INSTANCE);

	@ViewChild('button') buttonRef?: ElementRef<HTMLButtonElement>;

	readonly label = input.required<PortalContent>();
	readonly disabled = input(false, { transform: booleanAttribute });
	readonly index = computed(() => this.horizontalNavigationRef.getTabIndex(this));
	readonly selected = computed(() => this.index() === this.horizontalNavigationRef.selected());

	constructor() {
		effect(() => {
			if (this.selected() && this.buttonRef?.nativeElement) {
				setTimeout(() => {
					this.buttonRef?.nativeElement.focus();
				}, 0);
			}
		});
	}

	selectTab(): void {
		this.horizontalNavigationRef.navigateToTabByIndex(this.index());
	}

	changeTab(event: KeyboardEvent): void {
		const key = event.key;

		let handled = false;
		let newIndex: number | null = null;

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			newIndex = this.index() - 1;
			handled = true;
		} else if (key === 'ArrowRight' || key === 'ArrowDown') {
			newIndex = this.index() + 1;
			handled = true;
		} else if (key === 'Home') {
			handled = true;
			event.preventDefault();
			this.horizontalNavigationRef.navigateToFirstEnabledTab();
			return;
		} else if (key === 'End') {
			handled = true;
			event.preventDefault();
			this.horizontalNavigationRef.navigateToLastEnabledTab();
			return;
		}

		if (handled && newIndex !== null) {
			event.preventDefault();
			this.horizontalNavigationRef.navigateToTabByIndex(newIndex);
		}
	}
}
