import { NgTemplateOutlet } from '@angular/common';
import {
	AfterContentInit,
	ChangeDetectionStrategy,
	Component,
	computed,
	contentChildren,
	ElementRef,
	forwardRef,
	input,
	model,
	signal,
	TemplateRef,
	viewChild,
	viewChildren,
	ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { luBooleanAttribute, PortalDirective } from '@lucca-front/ng/core';
import { NoopValueAccessorDirective } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { SegmentedControlTabsPanelComponent } from './public-api';
import { LU_SEGMENTEDCONTROLTABS_INSTANCE } from './segmented-control-tabs.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-tabs',
	templateUrl: './segmented-control-tabs.component.html',
	styleUrl: './segmented-control-tabs.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ReactiveFormsModule, PortalDirective, NgTemplateOutlet, LuTooltipTriggerDirective, IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	hostDirectives: [NoopValueAccessorDirective],
	providers: [
		{
			provide: LU_SEGMENTEDCONTROLTABS_INSTANCE,
			useExisting: forwardRef(() => SegmentedControlTabsComponent),
		},
	],
})
export class SegmentedControlTabsComponent<T = unknown> implements AfterContentInit {
	/**
	 * Applies small size to segmented control tabs
	 */
	readonly small = input(false, { transform: luBooleanAttribute });

	/**
	 * Display segmented control tabs vertically
	 */
	readonly vertical = input(false, { transform: luBooleanAttribute });

	/**
	 * Accessible name for the tablist, exposed to assistive technologies
	 */
	readonly ariaLabel = input<string | null>(null);

	readonly active = model<T | null>(null);

	readonly id = `segmentedControl${nextId++}`;

	readonly tabs = contentChildren<SegmentedControlTabsPanelComponent<T>>(SegmentedControlTabsPanelComponent);
	readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

	/**
	 * Tablist template, rendered by the component itself unless a host (e.g. `lu-filter-bar`) renders it elsewhere
	 */
	readonly tablistTemplate = viewChild.required<TemplateRef<unknown>>('tablist');

	/**
	 * Set by a host rendering the tablist itself, so the component only renders its panels
	 */
	readonly externalTablist = signal(false);

	readonly currentIndex = computed(() => this.tabs().findIndex((tab) => tab.value() === this.active()));

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
		this.active.set(this.tabs()[index].value());
		this.tabButtons()[index].nativeElement.focus();
	}

	ngAfterContentInit(): void {
		if (this.active() === null) {
			this.active.set(this.tabs()[0].value());
		}
	}
}
