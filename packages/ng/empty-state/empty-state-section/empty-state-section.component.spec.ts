import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
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
});
