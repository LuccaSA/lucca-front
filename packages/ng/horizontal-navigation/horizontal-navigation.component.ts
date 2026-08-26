import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, forwardRef, inject, input, model, viewChildren, ViewEncapsulation } from '@angular/core';
import { DecorativePalette, isNil, isNotNil, luBooleanAttribute, Palette, PortalDirective } from '@lucca-front/ng/core';
import { LuDialogRef } from '@lucca-front/ng/dialog';
import { HorizontalNavigationLinkDirective } from './horizontal-navigation-link.directive';
import { HorizontalNavigationTabComponent } from './horizontal-navigation-tab.component';
import { LU_HORIZONTALNAVIGATION_INSTANCE } from './horizontal-navigation.token';
import { HorizontalNavigationSize } from './horizontal-navigation.type';

@Component({
	selector: 'lu-horizontal-navigation',
	templateUrl: './horizontal-navigation.component.html',
	styleUrl: './horizontal-navigation.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.horizontalNavigationWrapper]': 'this.dialogRef !== null',
	},
	imports: [NgTemplateOutlet, PortalDirective],
	providers: [
		{
			provide: LU_HORIZONTALNAVIGATION_INSTANCE,
			useExisting: forwardRef(() => HorizontalNavigationComponent),
		},
	],
})
export class HorizontalNavigationComponent {
	readonly dialogRef = inject(LuDialogRef, { optional: true });

	readonly links = contentChildren(HorizontalNavigationLinkDirective);

	readonly tabs = contentChildren(HorizontalNavigationTabComponent);

	readonly buttons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

	readonly noBorder = input(false, { transform: luBooleanAttribute });

	readonly container = input(false, { transform: luBooleanAttribute });

	readonly vertical = input(false, { transform: luBooleanAttribute });

	readonly palette = input<Palette | DecorativePalette | null>(null);
	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));

	/**
	 * Which size should the horizontal navigation be? Defaults and small
	 */
	readonly size = input<HorizontalNavigationSize | null>(null);

	readonly isTablist = computed(() => this.tabs().length > 0);

	readonly currentIndex = model<number>(0);

	readonly selectedIndex = computed(() => {
		const tabCount = this.tabs().length;
		if (tabCount === 0) {
			return null;
		}

		const requestedIndex = this.currentIndex();
		const normalizedIndex = ((requestedIndex % tabCount) + tabCount) % tabCount;

		const requestedTab = this.tabs()[normalizedIndex];
		if (isNotNil(requestedTab) && !requestedTab.disabled()) {
			return normalizedIndex;
		}

		return this.findAccessibleTabIndex(normalizedIndex + 1, 1);
	});

	constructor() {
		effect(() => {
			const normalizedIndex = this.selectedIndex();
			if (isNil(normalizedIndex)) {
				return;
			}

			if (this.currentIndex() !== normalizedIndex) {
				this.currentIndex.set(normalizedIndex);
			}
		});
	}

	navigateToFirstEnabledTab(): void {
		const firstEnabledIndex = this.findAccessibleTabIndex(0, 1);
		if (isNotNil(firstEnabledIndex)) {
			this.currentIndex.set(firstEnabledIndex);
			this.buttons()[firstEnabledIndex].nativeElement.focus();
		}
	}

	navigateToLastEnabledTab(): void {
		const lastTabIndex = this.tabs().length - 1;
		if (lastTabIndex < 0) return;

		const lastEnabledIndex = this.findAccessibleTabIndex(lastTabIndex, -1);
		if (isNotNil(lastEnabledIndex)) {
			this.currentIndex.set(lastEnabledIndex);
			this.buttons()[lastEnabledIndex].nativeElement.focus();
		}
	}

	getTabIndex(tab: HorizontalNavigationTabComponent): number {
		return this.tabs().indexOf(tab);
	}

	navigateToTabByIndex(index: number): void {
		const tab = this.tabs()[index];
		if (!tab || tab.disabled()) {
			return;
		}

		this.currentIndex.set(index);
		this.buttons()[index].nativeElement.focus();
	}

	private findAccessibleTabIndex(startIndex: number, direction: number): number | null {
		const tabCount = this.tabs().length;
		if (tabCount === 0) return null;
		if (direction !== 1 && direction !== -1) return null;

		const tabs = this.tabs();
		let attempts = 0;
		let currentIndex = ((startIndex % tabCount) + tabCount) % tabCount;

		while (attempts < tabCount) {
			const tab = tabs[currentIndex];
			if (isNotNil(tab) && !tab.disabled()) {
				return currentIndex;
			}

			currentIndex = (currentIndex + direction + tabCount) % tabCount;
			attempts++;
		}

		return null;
	}

	changeTab(event: KeyboardEvent, currentIndex: number): void {
		const key = event.key;

		if (key === 'ArrowLeft' || key === 'ArrowUp') {
			event.preventDefault();
			const nextEnabledIndex = this.findAccessibleTabIndex(currentIndex - 1, -1);
			if (isNotNil(nextEnabledIndex)) {
				this.navigateToTabByIndex(nextEnabledIndex);
			}
		} else if (key === 'ArrowRight' || key === 'ArrowDown') {
			event.preventDefault();
			const nextEnabledIndex = this.findAccessibleTabIndex(currentIndex + 1, 1);
			if (isNotNil(nextEnabledIndex)) {
				this.navigateToTabByIndex(nextEnabledIndex);
			}
		} else if (key === 'Home') {
			event.preventDefault();
			this.navigateToFirstEnabledTab();
		} else if (key === 'End') {
			event.preventDefault();
			this.navigateToLastEnabledTab();
		}
	}
}
