import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListboxComponent } from '../listbox.component';
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
});

@Component({
	selector: 'lu-empty-listbox-host',
	imports: [ListboxComponent, OptionComponent],
	template: `
		<lu-listbox state="empty" statusMsg="No results">
			<div listbox-header>
				<lu-listbox-option elementId="header-option" checkbox>Include former employees</lu-listbox-option>
			</div>
		</lu-listbox>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class EmptyListboxHostComponent {}

describe(`${OptionComponent.name} in an empty listbox`, () => {
	let host: HTMLElement;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [EmptyListboxHostComponent] });
		const fixture = TestBed.createComponent(EmptyListboxHostComponent);
		fixture.detectChanges();
		host = fixture.nativeElement;
	});

	it('should keep an option projected in the header visible and with its own id', () => {
		// aria-activedescendant may target it while the search has no results
		const headerOption = host.querySelector('#header-option');
		expect(headerOption).toBeTruthy();
		expect(headerOption!.getAttribute('aria-hidden')).not.toBe('true');
	});

	it('should still hide the status option and give it the listbox id', () => {
		const listbox = host.querySelector('lu-listbox')!;
		const statusOption = Array.from(host.querySelectorAll('lu-listbox-option')).find((option) => option.id !== 'header-option')!;
		expect(statusOption.getAttribute('aria-hidden')).toBe('true');
		expect(statusOption.id).toBe(listbox.getAttribute('aria-describedby'));
	});
});
