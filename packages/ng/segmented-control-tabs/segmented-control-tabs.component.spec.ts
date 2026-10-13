import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SegmentedControlTabsPanelComponent } from './panel/panel.component';
import { SegmentedControlTabsComponent } from './segmented-control-tabs.component';

@Component({
	template: `
		<lu-segmented-control-tabs [(active)]="active">
			<lu-segmented-control-tabs-panel label="List" value="list">List content</lu-segmented-control-tabs-panel>
			<lu-segmented-control-tabs-panel label="Grid view" icon="tiles" hiddenLabel value="grid">Grid content</lu-segmented-control-tabs-panel>
			<lu-segmented-control-tabs-panel label="Map" icon="mapPlan" value="map">Map content</lu-segmented-control-tabs-panel>
			<lu-segmented-control-tabs-panel [label]="customLabel" hiddenLabel value="custom">Custom content</lu-segmented-control-tabs-panel>
		</lu-segmented-control-tabs>
		<ng-template #customLabel><span class="customLabel">Custom</span></ng-template>
	`,
	imports: [SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent],
})
class HostComponent {
	readonly active = signal<string | null>(null);
}

describe(SegmentedControlTabsComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;

	const host = () => fixture.nativeElement.querySelector('lu-segmented-control-tabs') as HTMLElement;
	const tabButtons = () => Array.from(host().querySelectorAll<HTMLButtonElement>('[role="tab"]'));
	const tooltipPanel = () => TestBed.inject(OverlayContainer).getContainerElement().querySelector('.tooltip');

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
	});

	afterEach(() => {
		TestBed.inject(OverlayContainer).getContainerElement().remove();
	});

	it('renders the tablist as the first child of the host, followed by the panels', () => {
		const children = Array.from(host().children);

		expect(children.map((child) => child.getAttribute('role'))).toEqual(['tablist', 'tabpanel', 'tabpanel', 'tabpanel', 'tabpanel']);
	});

	it('activates the first tab by default', () => {
		expect(fixture.componentInstance.active()).toBe('list');
		expect(tabButtons()[0].getAttribute('aria-selected')).toBe('true');
	});

	it('moves the focus between tabs with the keyboard', () => {
		tabButtons()[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
		fixture.detectChanges();

		expect(fixture.componentInstance.active()).toBe('grid');
		expect(document.activeElement).toBe(tabButtons()[1]);
	});

	describe('icon and hiddenLabel', () => {
		it('displays the icon before a visible label', () => {
			const mapTab = tabButtons()[2];

			expect(mapTab.querySelector('lu-icon')).not.toBeNull();
			expect(mapTab.querySelector('.pr-u-mask')).toBeNull();
			expect(mapTab.textContent?.trim()).toBe('Map');
		});

		it('keeps a hidden label in the DOM for screen readers', () => {
			const gridTab = tabButtons()[1];

			expect(gridTab.querySelector('lu-icon')).not.toBeNull();
			expect(gridTab.querySelector('.pr-u-mask')?.textContent?.trim()).toBe('Grid view');
			expect(gridTab.hasAttribute('aria-label')).toBe(false);
		});

		it('ignores hiddenLabel for a template label, which stays visible', () => {
			const customTab = tabButtons()[3];

			expect(customTab.querySelector('.customLabel')).not.toBeNull();
			expect(customTab.querySelector('.pr-u-mask')).toBeNull();
			expect(customTab.querySelector('.tooltip_trigger')).toBeNull();
		});

		it('only sets up a tooltip on tabs with a hidden text label', () => {
			const [listTab, gridTab, mapTab] = tabButtons();

			expect(listTab.querySelector('.tooltip_trigger')).toBeNull();
			expect(gridTab.querySelector('.tooltip_trigger')).not.toBeNull();
			expect(mapTab.querySelector('.tooltip_trigger')).toBeNull();
		});

		it('keeps the tab id and roving tabindex, without announcing the tooltip as a description', () => {
			const gridTab = tabButtons()[1];

			expect(gridTab.id).toMatch(/^tab\d+$/);
			expect(gridTab.getAttribute('tabindex')).toBe('-1');
			expect(gridTab.hasAttribute('aria-describedby')).toBe(false);
			expect(gridTab.querySelector('[aria-describedby]')).toBeNull();
		});

		it('opens the tooltip on hover of the tab', fakeAsync(() => {
			tabButtons()[1].dispatchEvent(new MouseEvent('mouseenter'));
			tick(50);
			fixture.detectChanges();

			expect(tooltipPanel()?.textContent).toContain('Grid view');
		}));

		it('opens the tooltip on focus of the tab', fakeAsync(() => {
			tabButtons()[1].dispatchEvent(new FocusEvent('focus'));
			tick(50);
			fixture.detectChanges();

			expect(tooltipPanel()?.textContent).toContain('Grid view');
		}));
	});
});
