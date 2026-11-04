import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ResourceCardComponent } from './resource-card.component';

@Component({
	selector: 'lu-resource-card-test',
	imports: [ResourceCardComponent],
	template: `
		<lu-resource-card class="default">Title</lu-resource-card>
		<lu-resource-card class="number" [headingLevel]="2">Title</lu-resource-card>
		<lu-resource-card class="string" headingLevel="4">Title</lu-resource-card>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(ResourceCardComponent.name, () => {
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

	it('should accept a number', () => {
		expect(ariaLevel('.number')).toBe('2');
	});

	it('should still accept a string', () => {
		expect(ariaLevel('.string')).toBe('4');
	});
});
