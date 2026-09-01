import { ChangeDetectionStrategy, Component, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopoverDirective } from './popover.directive';

@Component({
	selector: 'lu-popover-test',
	imports: [PopoverDirective],
	template: `
		<ng-template #content>Content</ng-template>
		<button type="button" id="bare" [luPopover2]="content">Bare</button>
		<button type="button" id="dialog" [luPopover2]="content" aria-haspopup="dialog">Dialog</button>
		<button type="button" id="legacy" [luPopover2]="content" aria-haspopup="true">Legacy</button>
		<button type="button" id="invalid" [luPopover2]="content" aria-haspopup="bogus">Invalid</button>
		<button type="button" id="empty" [luPopover2]="content" aria-haspopup="">Empty</button>
		<button type="button" id="mixed-case" [luPopover2]="content" aria-haspopup="Dialog">Mixed case</button>
		<button type="button" id="inherited" [luPopover2]="content" aria-haspopup="toString">Inherited</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverTestComponent {
	popovers = viewChildren(PopoverDirective);
}

describe('PopoverDirective aria-haspopup', () => {
	let fixture: ComponentFixture<PopoverTestComponent>;

	const openPopover = (id: string) => {
		const index = ['bare', 'dialog', 'legacy', 'invalid', 'empty', 'mixed-case', 'inherited'].indexOf(id);
		fixture.componentInstance.popovers()[index].openPopover();
		fixture.detectChanges();
	};

	const panelRole = () => document.querySelector('lu-popover-content')?.getAttribute('role');

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [PopoverTestComponent],
		});

		fixture = TestBed.createComponent(PopoverTestComponent);
		fixture.detectChanges();
	});

	it('should apply no panel role without aria-haspopup on the trigger', () => {
		openPopover('bare');
		expect(panelRole()).toBeNull();
	});

	it('should apply the trigger aria-haspopup as the panel role', () => {
		openPopover('dialog');
		expect(panelRole()).toBe('dialog');
	});

	it('should apply the menu panel role for aria-haspopup="true"', () => {
		openPopover('legacy');
		expect(panelRole()).toBe('menu');
	});

	it('should throw on an invalid trigger aria-haspopup', () => {
		expect(() => openPopover('invalid')).toThrowError(/Invalid aria-haspopup value "bogus"/);
	});

	it('should apply no panel role for an empty trigger aria-haspopup', () => {
		// ARIA 1.2: empty => `false` default.
		openPopover('empty');
		expect(panelRole()).toBeNull();
	});

	it('should throw on a mixed-case trigger aria-haspopup', () => {
		// Lowercase only (https://w3c.github.io/html-aria/#case-sensitivity): AT casing support varies.
		expect(() => openPopover('mixed-case')).toThrowError(/Invalid aria-haspopup value "Dialog"/);
	});

	it('should throw on an inherited-key trigger aria-haspopup', () => {
		// Object prototype members must not pass the map lookup.
		expect(() => openPopover('inherited')).toThrowError(/Invalid aria-haspopup value "toString"/);
	});

	it('should stay closed after an invalid trigger aria-haspopup threw', () => {
		expect(() => openPopover('invalid')).toThrow();
		expect(fixture.componentInstance.popovers()[3].opened()).toBe(false);
		expect(panelRole()).toBeUndefined();
	});
});
