import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputFramedContentDirective } from '@lucca-front/ng/form-field';
import { RadioGroupInputComponent } from '../radio-group-input.component';
import { RadioComponent } from './radio.component';

@Component({
	selector: 'lu-radio-test',
	imports: [RadioGroupInputComponent, RadioComponent, InputFramedContentDirective, ReactiveFormsModule],
	template: `
		<lu-radio-group-input framed [formControl]="framedControl">
			<lu-radio class="input" value="a" framedPortal="Input content">A</lu-radio>
			<lu-radio class="projected" value="b"
				>B
				<div luInputFramedContent>Projected content</div></lu-radio
			>
			<lu-radio class="container" value="c">C<ng-container luInputFramedContent>Projected content</ng-container></lu-radio>
			<lu-radio class="both" value="d" framedPortal="Input content"
				>D
				<div luInputFramedContent>Projected content</div></lu-radio
			>
			<lu-radio class="none" value="e">E</lu-radio>
		</lu-radio-group-input>
		<lu-radio-group-input [formControl]="control">
			<lu-radio class="notFramed" value="a"
				>A
				<div luInputFramedContent>Projected content</div></lu-radio
			>
		</lu-radio-group-input>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	framedControl = new FormControl('a');
	control = new FormControl('a');
}

describe(RadioComponent.name, () => {
	let element: HTMLElement;

	const content = (selector: string) => element.querySelector(`lu-radio.${selector} .inputFramed-content`);
	const label = (selector: string) => element.querySelector(`lu-radio.${selector} label`)?.textContent?.trim();
	const text = (node: Element | null | undefined) => node?.textContent?.trim();

	beforeEach(() => {
		const fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	describe('framed content', () => {
		it('should forward the framedPortal input to the frame', () => {
			expect(text(content('input'))).toBe('Input content');
		});

		it('should forward the luInputFramedContent element to the frame, outside the label', () => {
			expect(text(content('projected'))).toBe('Projected content');
			expect(label('projected')).toBe('B');
		});

		it('should forward the luInputFramedContent directive set on an ng-container', () => {
			expect(text(content('container'))).toBe('Projected content');
			expect(label('container')).toBe('C');
		});

		it('should give the framedPortal input priority over the projected element', () => {
			expect(text(content('both'))).toBe('Input content');
			expect(element.querySelector('lu-radio.both')?.textContent).not.toContain('Projected');
		});

		it('should not render the content area without content', () => {
			expect(content('none')).toBeNull();
		});

		it('should drop the projected content when the group is not framed, like the input', () => {
			expect(element.querySelector('lu-radio.notFramed')?.textContent).not.toContain('Projected');
			expect(label('notFramed')).toBe('A');
		});
	});
});
