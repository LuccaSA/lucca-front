import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OptionComponent } from './option.component';

describe(OptionComponent.name, () => {
	let fixture: ComponentFixture<OptionComponent>;
	let host: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [OptionComponent],
		});
		fixture = TestBed.createComponent(OptionComponent);
		host = fixture.nativeElement;
	});

	it('should expose the indeterminate state only through aria-checked, never aria-selected', () => {
		fixture.componentRef.setInput('mixed', true);
		fixture.detectChanges();

		expect(host.getAttribute('aria-checked')).toBe('mixed');
		expect(host.hasAttribute('aria-selected')).toBe(false);
	});

	it('should reflect a plain checked option on aria-selected and leave aria-checked unset', () => {
		fixture.componentRef.setInput('checked', true);
		fixture.detectChanges();

		expect(host.getAttribute('aria-selected')).toBe('true');
		expect(host.hasAttribute('aria-checked')).toBe(false);
	});

	it('should not expose aria-selected on the "add" option', () => {
		fixture.componentRef.setInput('add', true);
		fixture.detectChanges();

		expect(host.hasAttribute('aria-selected')).toBe(false);
	});

	it('should not expose aria-selected nor aria-checked on a group option, even if checked or mixed', () => {
		fixture.componentRef.setInput('group', true);
		fixture.componentRef.setInput('checked', true);
		fixture.detectChanges();

		expect(host.getAttribute('role')).toBe('group');
		expect(host.hasAttribute('aria-selected')).toBe(false);

		fixture.componentRef.setInput('mixed', true);
		fixture.detectChanges();

		expect(host.hasAttribute('aria-checked')).toBe(false);
	});

	describe('disclosure', () => {
		// treeitemLevel is what tells the option it holds children when none are projected,
		// which is also how lu-select-option declares them.
		function withChildren(collapsable: boolean): void {
			fixture.componentRef.setInput('treeitemLevel', 1);
			fixture.componentRef.setInput('collapsable', collapsable);
			fixture.detectChanges();
		}

		function chevron(): HTMLElement | null {
			return host.querySelector('.listboxOption-content-disclosure');
		}

		it('should start collapsed and render a chevron once collapsable', () => {
			withChildren(true);

			expect(host.getAttribute('aria-expanded')).toBe('false');
			expect(chevron()).toBeTruthy();
			// A visual affordance only: the focus never leaves the combobox, so the row carries the state
			expect(chevron()!.getAttribute('aria-hidden')).toBe('true');
			expect(chevron()!.tagName).not.toBe('BUTTON');
		});

		it('should expand and collapse again when the chevron is clicked', () => {
			withChildren(true);

			chevron()!.click();
			fixture.detectChanges();
			expect(host.getAttribute('aria-expanded')).toBe('true');

			chevron()!.click();
			fixture.detectChanges();
			expect(host.getAttribute('aria-expanded')).toBe('false');
		});

		it('should keep a chevron click away from the row, which toggles the selection', () => {
			withChildren(true);
			const onRowClick = vi.fn();
			host.addEventListener('click', onRowClick);

			chevron()!.click();

			expect(onRowClick).not.toHaveBeenCalled();
		});

		it('should leave an always-open tree untouched when collapsable is not set', () => {
			withChildren(false);

			expect(host.hasAttribute('aria-expanded')).toBe(false);
			expect(chevron()).toBeNull();
			expect(host.querySelector('.listboxOptionWrapper')).toBeTruthy();
		});
	});
});
