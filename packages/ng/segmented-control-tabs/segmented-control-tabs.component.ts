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
	viewChildren,
	ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalDirective } from '@lucca-front/ng/core';
import { NoopValueAccessorDirective } from '@lucca-front/ng/forms';
import { SegmentedControlTabsPanelComponent } from './public-api';
import { LU_SEGMENTEDCONTROLTABS_INSTANCE } from './segmented-control-tabs.token';

let nextId = 0;

@Component({
	selector: 'lu-segmented-control-tabs',
	templateUrl: './segmented-control-tabs.component.html',
	styleUrl: './segmented-control-tabs.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [ReactiveFormsModule, PortalDirective],
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
	readonly small = input(false, { transform: booleanAttribute });
	readonly vertical = input(false, { transform: booleanAttribute });

	readonly id = `segmentedControl${nextId++}`;

	readonly tabs = contentChildren<SegmentedControlTabsPanelComponent<T>>(SegmentedControlTabsPanelComponent);
	readonly tabButtons = viewChildren<ElementRef<HTMLButtonElement>>('tabButton');

	active = model<T>(null);

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
