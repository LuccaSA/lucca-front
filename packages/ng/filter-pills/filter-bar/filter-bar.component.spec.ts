import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { FilterBarComponent } from './filter-bar.component';
import { FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective } from './filter-pill-addon.directive';

@Component({
	template: `
		<lu-filter-bar [segmentedControlTabs]="withTabs() ? tabs : null">
			<span class="addonBefore" *luFilterPillAddonBefore>Before</span>
			<button class="addonAfter" *luFilterPillAddonAfter type="button">Export</button>
		</lu-filter-bar>
		<lu-segmented-control-tabs #tabs [(active)]="active">
			<lu-segmented-control-tabs-panel label="List" value="list">List content</lu-segmented-control-tabs-panel>
			<lu-segmented-control-tabs-panel label="Grid" value="grid">Grid content</lu-segmented-control-tabs-panel>
		</lu-segmented-control-tabs>
	`,
	imports: [FilterBarComponent, FilterPillAddonBeforeDirective, FilterPillAddonAfterDirective, SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent],
})
class HostComponent {
	readonly withTabs = signal(true);
	readonly active = signal<string | null>(null);
}

@Component({
	template: `
		<lu-filter-bar [segmentedControlTabs]="tabs" />
		<lu-segmented-control-tabs #tabs>
			<lu-segmented-control-tabs-panel label="List" value="list">List content</lu-segmented-control-tabs-panel>
		</lu-segmented-control-tabs>
	`,
	imports: [FilterBarComponent, SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent],
})
class HostWithoutActionsComponent {}

describe('FilterBarComponent: segmentedControlTabs', () => {
	let fixture: ComponentFixture<HostComponent>;

	const filterBar = () => fixture.nativeElement.querySelector('lu-filter-bar') as HTMLElement;
	const segmentedControlTabs = () => fixture.nativeElement.querySelector('lu-segmented-control-tabs') as HTMLElement;
	const tabButtons = () => Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]'));

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent, HostWithoutActionsComponent] });
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	it('displays the tablist at the end of the scroll box, followed by a divider and the actions', () => {
		const classes = ['filterBar-scrollBox-tabs', 'filterBar-scrollBox-divider', 'filterBar-scrollBox-export'];
		const scrollBoxChildren = Array.from(filterBar().querySelector('.filterBar-scrollBox')!.children).map((child) => classes.find((c) => child.classList.contains(c)));

		expect(scrollBoxChildren.slice(-3)).toEqual(classes);
		expect(filterBar().querySelector('.filterBar-scrollBox-tabs > [role="tablist"]')).not.toBeNull();
		expect(segmentedControlTabs().querySelector('[role="tablist"]')).toBeNull();
	});

	it('keeps the panels where the segmented control tabs are declared', () => {
		expect(segmentedControlTabs().querySelectorAll('[role="tabpanel"]')).toHaveLength(2);
		expect(filterBar().querySelector('[role="tabpanel"]')).toBeNull();
	});

	it('displays the addons', () => {
		expect(filterBar().querySelector('.addonBefore')).not.toBeNull();
		expect(filterBar().querySelector('.filterBar-scrollBox-export .addonAfter')).not.toBeNull();
	});

	it('puts the divider last without actions, so that it is hidden', () => {
		const withoutActions = TestBed.createComponent(HostWithoutActionsComponent);
		withoutActions.detectChanges();
		const scrollBox = (withoutActions.nativeElement as HTMLElement).querySelector('.filterBar-scrollBox')!;

		expect(scrollBox.querySelector('.filterBar-scrollBox-tabs > [role="tablist"]')).not.toBeNull();
		expect(scrollBox.lastElementChild?.classList).toContain('filterBar-scrollBox-divider');
	});

	it('activates a tab on click', () => {
		tabButtons()[1].click();
		fixture.detectChanges();

		expect(fixture.componentInstance.active()).toBe('grid');
		expect(tabButtons()[1].getAttribute('aria-selected')).toBe('true');
	});

	it('moves the focus between tabs with the keyboard', () => {
		tabButtons()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
		fixture.detectChanges();

		expect(fixture.componentInstance.active()).toBe('grid');
		expect(document.activeElement).toBe(tabButtons()[1]);
	});

	it('gives the tablist back to the segmented control tabs when removed, and removes the divider', () => {
		fixture.componentInstance.withTabs.set(false);
		fixture.detectChanges();

		expect(filterBar().querySelector('[role="tablist"]')).toBeNull();
		expect(segmentedControlTabs().querySelector('[role="tablist"]')).not.toBeNull();
		expect(filterBar().querySelector('.filterBar-scrollBox-divider')).toBeNull();
		expect(filterBar().querySelector('.addonAfter')).not.toBeNull();
	});
});
