import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { VerticalNavigationComponent } from './vertical-navigation.component';

@Component({
	selector: 'lu-vertical-navigation-test',
	imports: [VerticalNavigationComponent],
	template: `
		<lu-vertical-navigation class="default" heading="Title" />
		<lu-vertical-navigation class="headingLevel" heading="Title" headingLevel="2" />
		<lu-vertical-navigation class="level" heading="Title" level="4" />
		<lu-vertical-navigation class="both" heading="Title" headingLevel="2" level="4" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(VerticalNavigationComponent.name, () => {
	let element: HTMLElement;

	const ariaLevel = (selector: string) => element.querySelector(`${selector} [role="heading"]`)?.getAttribute('aria-level');

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
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

	it('should still apply the deprecated level', () => {
		expect(ariaLevel('.level')).toBe('4');
	});

	it('should give headingLevel priority over level', () => {
		expect(ariaLevel('.both')).toBe('2');
	});
});
