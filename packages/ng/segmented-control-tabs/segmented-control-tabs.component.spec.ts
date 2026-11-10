import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SegmentedControlTabsPanelLabelDirective } from './panel/panel-label.directive';
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

@Component({
	template: `
		<lu-segmented-control-tabs>
			<lu-segmented-control-tabs-panel label="Input" value="input">Input content</lu-segmented-control-tabs-panel>
			<lu-segmented-control-tabs-panel value="projected">
				<ng-container luSegmentedControlTabsPanelLabel>Projected <strong>label</strong></ng-container>
				Projected content
			</lu-segmented-control-tabs-panel>
			<lu-segmented-control-tabs-panel label="Input" value="both">
				<ng-container luSegmentedControlTabsPanelLabel>Projected label</ng-container>
				Both content
			</lu-segmented-control-tabs-panel>
		</lu-segmented-control-tabs>
	`,
	imports: [SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent, SegmentedControlTabsPanelLabelDirective],
})
class ProjectedLabelHostComponent {}

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

	describe('projected label', () => {
		let labelFixture: ComponentFixture<ProjectedLabelHostComponent>;

		const tabs = () => Array.from((labelFixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('[role="tab"]'));
		const panels = () => Array.from((labelFixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('[role="tabpanel"]'));
		const text = (node: Element | undefined) => node?.textContent?.replace(/\s+/g, ' ').trim();

		beforeEach(() => {
			labelFixture = TestBed.createComponent(ProjectedLabelHostComponent);
			labelFixture.detectChanges();
		});

		it('renders the label input in the tab', () => {
			expect(text(tabs()[0])).toBe('Input');
		});

		it('renders the luSegmentedControlTabsPanelLabel element in the tab, not in the panel', () => {
			expect(text(tabs()[1])).toBe('Projected label');
			expect(tabs()[1].querySelector('strong')).not.toBeNull();
			expect(text(panels()[1])).toBe('Projected content');
		});

		it('gives the label input priority over the projected element', () => {
			expect(text(tabs()[2])).toBe('Input');
			expect(text(panels()[2])).toBe('Both content');
		});
	});
});
