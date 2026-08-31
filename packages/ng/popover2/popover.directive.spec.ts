import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverDirective } from './popover.directive';
import { PopoverRole } from './popover-tokens';

@Component({
	selector: 'lu-popover-test',
	imports: [PopoverDirective],
	template: `
		<ng-template #content>Content</ng-template>
		<button type="button" id="bare" [luPopover2]="content" [luPopoverRole]="role()">Bare</button>
		<button type="button" id="valid" [luPopover2]="content" [luPopoverRole]="role()" aria-haspopup="dialog">Valid</button>
		<button type="button" id="legacy" [luPopover2]="content" [luPopoverRole]="role()" aria-haspopup="true">Legacy</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverTestComponent {
	role = input<PopoverRole | null>(null);
}

@Component({
	selector: 'lu-popover-invalid-test',
	imports: [PopoverDirective],
	template: `
		<ng-template #content>Content</ng-template>
		<button type="button" [luPopover2]="content" aria-haspopup="bogus">Invalid</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverInvalidTestComponent {}

describe('PopoverDirective aria-haspopup', () => {
	let fixture: ComponentFixture<PopoverTestComponent>;

	const haspopup = (id: string) => (fixture.nativeElement as HTMLElement).querySelector(`#${id}`)?.getAttribute('aria-haspopup');

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PopoverTestComponent, PopoverInvalidTestComponent],
		});

		fixture = TestBed.createComponent(PopoverTestComponent);
		fixture.detectChanges();
	});

	it('should not set aria-haspopup without luPopoverRole nor a template attribute', () => {
		expect(haspopup('bare')).toBeNull();
	});

	it('should preserve a valid template aria-haspopup while luPopoverRole is unset', () => {
		expect(haspopup('valid')).toBe('dialog');
		expect(haspopup('legacy')).toBe('true');
	});

	it('should throw on an invalid template aria-haspopup', () => {
		expect(() => TestBed.createComponent(PopoverInvalidTestComponent)).toThrowError(/Invalid aria-haspopup value "bogus"/);
	});

	it('should mirror luPopoverRole into aria-haspopup, overriding template attributes', () => {
		fixture.componentRef.setInput('role', 'listbox');
		fixture.detectChanges();

		for (const id of ['bare', 'valid', 'legacy']) {
			expect(haspopup(id)).toBe('listbox');
		}
	});
});
