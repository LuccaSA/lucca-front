import {
	AfterContentInit,
	booleanAttribute,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	ElementRef,
	forwardRef,
	input,
	model,
	output,
	viewChildren,
	ViewEncapsulation,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { PortalDirective } from '@lucca-front/ng/core';
import { SegmentedControlTabsPanelComponent } from './public-api';
import { LU_SEGMENTEDCONTROLTABS_INSTANCE } from './segmented-control-tabs.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-tabs',
	templateUrl: './segmented-control-tabs.component.html',
	styleUrl: './segmented-control-tabs.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [PortalDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: LU_SEGMENTEDCONTROLTABS_INSTANCE,
			useExisting: forwardRef(() => SegmentedControlTabsComponent),
		},
	],
})
export class SegmentedControlTabsComponent<T = unknown> implements AfterContentInit, FormValueControl<T | null> {
	/**
	 * Applies small size to segmented control tabs
	 */
	readonly small = input(false, { transform: booleanAttribute });

	/**
	 * Display segmented control tabs vertically
	 */
	readonly vertical = input(false, { transform: booleanAttribute });

	readonly value = model<T | null>(null);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	readonly id = `segmentedControl${nextId++}`;

	readonly tabs = contentChildren<SegmentedControlTabsPanelComponent<T>>(SegmentedControlTabsPanelComponent);
	readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

	readonly currentIndex = computed(() => this.tabs().findIndex((tab) => tab.value() === this.value()));

	previous() {
		let newIndex = this.currentIndex() - 1;
		if (newIndex < 0) {
			newIndex = this.tabs().length - 1;
		}
		this.setActiveTab(newIndex);
	}

	next() {
		let newIndex = this.currentIndex() + 1;
		if (newIndex >= this.tabs().length) {
			newIndex = 0;
		}
		this.setActiveTab(newIndex);
	}

	first() {
		this.setActiveTab(0);
	}

	last() {
		this.setActiveTab(this.tabs().length - 1);
	}

	setActiveTab(index: number) {
		this.value.set(this.tabs()[index].value());
		this.tabButtons()[index].nativeElement.focus();
	}

	ngAfterContentInit(): void {
		if (this.value() === null) {
			this.value.set(this.tabs()[0].value());
		}
	}
}
