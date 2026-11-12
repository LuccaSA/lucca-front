import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CalloutComponent } from './callout.component';

@Component({
	selector: 'lu-callout-test',
	imports: [CalloutComponent],
	template: `
		<lu-callout class="default" heading="Title" />
		<lu-callout class="headingLevel" heading="Title" headingLevel="2" />
		<lu-callout class="hx" heading="Title" hx="4" />
		<lu-callout class="both" heading="Title" headingLevel="2" hx="4" />
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(CalloutComponent.name, () => {
	let element: HTMLElement;

	const title = (selector: string) => element.querySelector(`${selector} .callout-content-title`);

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	it('should not expose the title as a heading by default', () => {
		expect(title('.default')?.getAttribute('role')).toBeNull();
		expect(title('.default')?.getAttribute('aria-level')).toBeNull();
	});

	it('should apply headingLevel', () => {
		expect(title('.headingLevel')?.getAttribute('role')).toBe('heading');
		expect(title('.headingLevel')?.getAttribute('aria-level')).toBe('2');
	});

	it('should still apply the deprecated hx', () => {
		expect(title('.hx')?.getAttribute('aria-level')).toBe('4');
	});

	it('should give headingLevel priority over hx', () => {
		expect(title('.both')?.getAttribute('aria-level')).toBe('2');
	});
});
