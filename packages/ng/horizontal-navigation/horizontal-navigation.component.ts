import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, ElementRef, forwardRef, input, model, viewChildren, ViewEncapsulation } from '@angular/core';
import { HorizontalNavigationLinkDirective } from './horizontal-navigation-link.directive';
import { HorizontalNavigationTabComponent } from './horizontal-navigation-tab.component';
import { LU_HORIZONTALNAVIGATION_INSTANCE } from './horizontal-navigation.token';
import { PortalDirective } from '@lucca-front/ng/core';
import { HorizontalNavigationSize } from './horizontal-navigation.type';

@Component({
	selector: 'lu-horizontal-navigation',
	templateUrl: './horizontal-navigation.component.html',
	styleUrl: './horizontal-navigation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgTemplateOutlet, PortalDirective],
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

	readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

	readonly noBorder = input(false, { transform: booleanAttribute });

	readonly container = input(false, { transform: booleanAttribute });

	readonly vertical = input(false, { transform: booleanAttribute });

	/**
	 * Which size should the horizontal navigation be? Defaults and small
	 */
  readonly size = input<HorizontalNavigationSize | null>(null);

	readonly tablist = input(false, { transform: booleanAttribute });

	readonly selected = model<number>(0);

	navigateToFirstEnabledTab(): void {
		const firstEnabledIndex = this.findAccessibleTabIndex(0, 1);
		if (firstEnabledIndex !== null) {
			this.selected.set(firstEnabledIndex);
			this.buttons()[firstEnabledIndex].nativeElement.focus();
		}
	}

	navigateToLastEnabledTab(): void {
		const lastTabIndex = this.tabs().length - 1;
		if (lastTabIndex === 0) return;

		const lastEnabledIndex = this.findAccessibleTabIndex(lastTabIndex, -1);
		if (lastEnabledIndex !== null) {
			this.selected.set(lastEnabledIndex);
			this.buttons()[lastEnabledIndex].nativeElement.focus();
		}
	}

	getTabIndex(tab: HorizontalNavigationTabComponent): number {
		return this.tabs().indexOf(tab);
	}

	navigateToTabByIndex(index: number): void {
		this.selected.set(index);
		this.buttons()[index].nativeElement.focus();
	}

	private findAccessibleTabIndex(startIndex: number, direction: number): number | null {
		const tabCount = this.tabs().length;
		if (tabCount === 0) return null;

		const tabs = this.tabs();
		let attempts = 0;
		let currentIndex = startIndex;

		while (attempts < tabCount) {
			if (currentIndex < 0) currentIndex = tabCount;
			if (currentIndex > tabCount) currentIndex = 0;

			const tab = tabs[currentIndex];
			if (tab && !tab.disabled()) {
				return currentIndex;
			}

			currentIndex += direction;
			attempts++;
		}

		return null;
	}

	changeTab(event: KeyboardEvent, currentIndex: number): void {
		const key = event.key;

		let handled = false;
		let newIndex: number | null = null;

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			newIndex = currentIndex - 1;
			if (newIndex < 0) {
				newIndex = this.tabs().length - 1;
			}
			handled = true;
		} else if (key === 'ArrowRight' || key === 'ArrowDown') {
			newIndex = (currentIndex + 1) % this.tabs().length;
			handled = true;
		} else if (key === 'Home') {
			handled = true;
			event.preventDefault();
			this.navigateToFirstEnabledTab();
			return;
		} else if (key === 'End') {
			handled = true;
			event.preventDefault();
			this.navigateToLastEnabledTab();
			return;
		}

		if (handled && newIndex !== null) {
			event.preventDefault();
			this.navigateToTabByIndex(newIndex);
		}
	}
}
