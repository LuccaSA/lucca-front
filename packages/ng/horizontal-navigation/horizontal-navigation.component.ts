import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, forwardRef, input, model, ViewEncapsulation } from '@angular/core';
import { HorizontalNavigationLinkDirective } from './horizontal-navigation-link.directive';
import { HorizontalNavigationTabComponent } from './horizontal-navigation-tab.component';
import { LU_HORIZONTALNAVIGATION_INSTANCE } from './horizontal-navigation.token';

@Component({
	selector: 'lu-horizontal-navigation',
	templateUrl: './horizontal-navigation.component.html',
	styleUrl: './horizontal-navigation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet],
	host: {
		class: 'horizontalNavigation',
		'[class.mod-noBorder]': 'noBorder()',
		'[class.mod-S]': 'size() === `S`',
		'[class.mod-vertical]': 'vertical()',
	},
	providers: [
		{
			provide: LU_HORIZONTALNAVIGATION_INSTANCE,
			useExisting: forwardRef(() => HorizontalNavigationComponent),
		},
	],
})
export class HorizontalNavigationComponent {
	readonly links = contentChildren(HorizontalNavigationLinkDirective);

	readonly tabs = contentChildren(HorizontalNavigationTabComponent);

	readonly noBorder = input(false, { transform: booleanAttribute });

	readonly container = input(false, { transform: booleanAttribute });

	readonly vertical = input(false, { transform: booleanAttribute });

	/**
	 * Which size should the horizontal navigation be? Defaults and small
	 */
	readonly size = input<null | 'S'>(null);

	readonly tablist = input(false, { transform: booleanAttribute });

	readonly selected = model<number>(1);

	navigateToFirstEnabledTab(): void {
		const firstEnabledIndex = this.findAccessibleTabIndex(1, 1);
		if (firstEnabledIndex !== null) {
			this.selected.set(firstEnabledIndex);
		}
	}

	navigateToLastEnabledTab(): void {
		const lastTabIndex = this.tabs().length;
		if (lastTabIndex === 0) return;

		const lastEnabledIndex = this.findAccessibleTabIndex(lastTabIndex, -1);
		if (lastEnabledIndex !== null) {
			this.selected.set(lastEnabledIndex);
		}
	}

	getTabIndex(tab: HorizontalNavigationTabComponent): number {
		return this.tabs().indexOf(tab) + 1;
	}

	navigateToTabByIndex(index: number): void {
		const tabCount = this.tabs().length;
		if (tabCount === 0) return;

		const direction = index > this.selected() ? 1 : -1;
		const accessibleIndex = this.findAccessibleTabIndex(index, direction);
		if (accessibleIndex !== null) {
			this.selected.set(accessibleIndex);
		}
	}

	private findAccessibleTabIndex(startIndex: number, direction: number): number | null {
		const tabCount = this.tabs().length;
		if (tabCount === 0) return null;

		const tabs = this.tabs();
		let attempts = 0;
		let currentIndex = startIndex;

		while (attempts < tabCount) {
			if (currentIndex < 1) currentIndex = tabCount;
			if (currentIndex > tabCount) currentIndex = 1;

			const tab = tabs[currentIndex - 1];
			if (tab && !tab.disabled()) {
				return currentIndex;
			}

			currentIndex += direction;
			attempts++;
		}

		return null;
	}
}
