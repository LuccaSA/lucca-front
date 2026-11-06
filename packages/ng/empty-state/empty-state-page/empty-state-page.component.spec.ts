import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EmptyStateDescriptionDirective } from '../empty-state-description.directive';
import { EmptyStateSlotTopDirective } from '../empty-state-slot-top.directive';
import { EmptyStatePageComponent } from './empty-state-page.component';

@Component({
	selector: 'lu-empty-state-page-test',
	imports: [EmptyStatePageComponent],
	template: `
		<lu-empty-state-page class="default" heading="Title" />
		<lu-empty-state-page class="headingLevel" heading="Title" headingLevel="2" headingStyle="2" />
		<lu-empty-state-page class="hx" heading="Title" hx="4" hxStyle="2" />
		<lu-empty-state-page class="both" heading="Title" headingLevel="2" hx="4" headingStyle="1" hxStyle="2" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

@Component({
	selector: 'lu-empty-state-page-slots-test',
	imports: [EmptyStatePageComponent, EmptyStateSlotTopDirective, EmptyStateDescriptionDirective],
	template: `
		<lu-empty-state-page class="input" heading="Title" description="Input description" [slotTop]="slotTopTpl" />
		<lu-empty-state-page class="projected" heading="Title">
			<span luEmptyStateSlotTop>Projected top</span>
			<p luEmptyStateDescription>Projected description</p>
			<button type="button">Action</button>
		</lu-empty-state-page>
		<lu-empty-state-page class="both" heading="Title" description="Input description" [slotTop]="slotTopTpl">
			<span luEmptyStateSlotTop>Projected top</span>
			<p luEmptyStateDescription>Projected description</p>
		</lu-empty-state-page>
		<lu-empty-state-page class="none" heading="Title" />
		<ng-template #slotTopTpl>Input top</ng-template>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SlotsHostComponent {}

describe(EmptyStatePageComponent.name, () => {
	let element: HTMLElement;

	const ariaLevel = (selector: string) => element.querySelector(`${selector} [role="heading"]`)?.getAttribute('aria-level');
	const hasHeadingStyleH2 = (selector: string) => element.querySelector(`${selector} .emptyState`)?.classList.contains('mod-headingStyleH2');

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent], providers: [provideHttpClient(), provideHttpClientTesting()] });
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	describe('headingLevel', () => {
		it('should expose the title as a level 1 heading by default', () => {
			expect(ariaLevel('.default')).toBe('1');
		});

		it('should apply headingLevel', () => {
			expect(ariaLevel('.headingLevel')).toBe('2');
		});

		it('should still apply the deprecated hx', () => {
			expect(ariaLevel('.hx')).toBe('4');
		});

		it('should give headingLevel priority over hx', () => {
			expect(ariaLevel('.both')).toBe('2');
		});
	});

	describe('headingStyle', () => {
		it('should use the level 1 style by default', () => {
			expect(hasHeadingStyleH2('.default')).toBe(false);
		});

		it('should apply headingStyle', () => {
			expect(hasHeadingStyleH2('.headingLevel')).toBe(true);
		});

		it('should still apply the deprecated hxStyle', () => {
			expect(hasHeadingStyleH2('.hx')).toBe(true);
		});

		it('should give headingStyle priority over hxStyle', () => {
			expect(hasHeadingStyleH2('.both')).toBe(false);
		});
	});

	describe('slotTop and description', () => {
		let slotsElement: HTMLElement;

		const slotTop = (selector: string) =>
			slotsElement.querySelector(`${selector} .emptyState-content-text > div:not(.emptyState-content-heading, .emptyState-content-description, .emptyState-actions)`);
		const description = (selector: string) => slotsElement.querySelector(`${selector} .emptyState-content-description`);
		const text = (node: Element | null | undefined) => node?.textContent?.trim();

		beforeEach(() => {
			const fixture = TestBed.createComponent(SlotsHostComponent);
			slotsElement = fixture.nativeElement as HTMLElement;
			fixture.detectChanges();
		});

		it('should render the slotTop and description inputs', () => {
			expect(text(slotTop('.input'))).toBe('Input top');
			expect(text(description('.input'))).toBe('Input description');
		});

		it('should render the projected elements in their slots, not in the actions', () => {
			expect(text(slotTop('.projected'))).toBe('Projected top');
			expect(text(description('.projected'))).toBe('Projected description');
			expect(text(slotsElement.querySelector('.projected .emptyState-actions'))).toBe('Action');
		});

		it('should give the inputs priority over the projected elements', () => {
			expect(text(slotTop('.both'))).toBe('Input top');
			expect(text(description('.both'))).toBe('Input description');
			expect(slotsElement.querySelector('.both')?.textContent).not.toContain('Projected');
		});

		it('should render neither slot without content', () => {
			expect(slotTop('.none')).toBeNull();
			expect(description('.none')).toBeNull();
		});
	});
});
