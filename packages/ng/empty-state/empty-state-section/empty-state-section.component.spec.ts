import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EmptyStateDescriptionDirective } from '../empty-state-description.directive';
import { EmptyStateSectionComponent } from './empty-state-section.component';

@Component({
	selector: 'lu-empty-state-section-test',
	imports: [EmptyStateSectionComponent],
	template: `
		<lu-empty-state-section class="default" heading="Title" />
		<lu-empty-state-section class="headingLevel" heading="Title" headingLevel="2" />
		<lu-empty-state-section class="hx" heading="Title" hx="4" />
		<lu-empty-state-section class="both" heading="Title" headingLevel="2" hx="4" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

@Component({
	selector: 'lu-empty-state-section-description-test',
	imports: [EmptyStateSectionComponent, EmptyStateDescriptionDirective],
	template: `
		<lu-empty-state-section class="input" heading="Title" description="Input description" />
		<lu-empty-state-section class="projected" heading="Title">
			<p luEmptyStateDescription>Projected description</p>
			<button type="button">Action</button>
		</lu-empty-state-section>
		<lu-empty-state-section class="both" heading="Title" description="Input description">
			<p luEmptyStateDescription>Projected description</p>
		</lu-empty-state-section>
		<lu-empty-state-section class="none" heading="Title" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DescriptionHostComponent {}

describe(EmptyStateSectionComponent.name, () => {
	let element: HTMLElement;

	const ariaLevel = (selector: string) => element.querySelector(`${selector} [role="heading"]`)?.getAttribute('aria-level');

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent], providers: [provideHttpClient(), provideHttpClientTesting()] });
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	it('should expose the title as a level 3 heading by default', () => {
		expect(ariaLevel('.default')).toBe('3');
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

	describe('description', () => {
		let descriptionElement: HTMLElement;

		const description = (selector: string) => descriptionElement.querySelector(`${selector} .emptyState-content-description`);
		const text = (node: Element | null | undefined) => node?.textContent?.trim();

		beforeEach(() => {
			const fixture = TestBed.createComponent(DescriptionHostComponent);
			descriptionElement = fixture.nativeElement as HTMLElement;
			fixture.detectChanges();
		});

		it('should render the description input', () => {
			expect(text(description('.input'))).toBe('Input description');
		});

		it('should render the projected description, not in the actions', () => {
			expect(text(description('.projected'))).toBe('Projected description');
			expect(text(descriptionElement.querySelector('.projected .emptyState-actions'))).toBe('Action');
		});

		it('should give the description input priority over the projected element', () => {
			expect(text(description('.both'))).toBe('Input description');
			expect(descriptionElement.querySelector('.both')?.textContent).not.toContain('Projected');
		});

		it('should not render the description without content', () => {
			expect(description('.none')).toBeNull();
		});
	});
});
