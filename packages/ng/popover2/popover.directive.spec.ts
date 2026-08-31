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
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class PopoverTestComponent {
	popovers = viewChildren(PopoverDirective);
}

describe('PopoverDirective aria-haspopup', () => {
	let fixture: ComponentFixture<PopoverTestComponent>;

	const openPopover = (id: string) => {
		const index = ['bare', 'dialog', 'legacy', 'invalid'].indexOf(id);
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
});
