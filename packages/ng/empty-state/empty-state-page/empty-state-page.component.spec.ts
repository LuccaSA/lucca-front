import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
});
