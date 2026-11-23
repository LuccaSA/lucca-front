import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { InputFramedContentDirective } from './input-framed-content.directive';
import { InputFramedComponent } from './input-framed.component';

@Component({
	selector: 'lu-input-framed-test',
	imports: [InputFramedComponent, InputFramedContentDirective],
	template: `
		<lu-input-framed class="input" framedPortal="Input content">Field</lu-input-framed>
		<lu-input-framed class="projected"
			>Field
			<div luInputFramedContent>Projected content</div></lu-input-framed
		>
		<lu-input-framed class="both" framedPortal="Input content"
			>Field
			<div luInputFramedContent>Projected content</div></lu-input-framed
		>
		<lu-input-framed class="none">Field</lu-input-framed>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {}

describe(InputFramedComponent.name, () => {
	let element: HTMLElement;

	const content = (selector: string) => element.querySelector(`lu-input-framed.${selector} .inputFramed-content`);
	const text = (node: Element | null | undefined) => node?.textContent?.trim();

	beforeEach(() => {
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	describe('framed content', () => {
		it('should render the framedPortal input', () => {
			expect(text(content('input'))).toBe('Input content');
		});

		it('should render the luInputFramedContent element in the content area, not in the header', () => {
			expect(text(content('projected'))).toBe('Projected content');
			expect(text(element.querySelector('.projected .inputFramed-header-field'))).toBe('Field');
		});

		it('should give the framedPortal input priority over the projected element', () => {
			expect(text(content('both'))).toBe('Input content');
			expect(element.querySelector('.both')?.textContent).not.toContain('Projected');
		});

		it('should not render the content area without content', () => {
			expect(content('none')).toBeNull();
		});
	});
});
