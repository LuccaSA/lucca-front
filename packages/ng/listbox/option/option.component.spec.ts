import { ChangeDetectionStrategy, Component } from '@angular/core';
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
});

describe(`${OptionComponent.name} (group label)`, () => {
	@Component({
		selector: 'lu-test-group-option',
		changeDetection: ChangeDetectionStrategy.OnPush,
		imports: [OptionComponent],
		template: `
			<lu-listbox-option group>
				<span>Légumes</span>
				<div group-action class="link">Tout sélectionner</div>
			</lu-listbox-option>
		`,
	})
	class TestGroupOptionComponent {}

	it('should name the group by its projected title only, leaving the group action out of the label', () => {
		const fixture = TestBed.createComponent(TestGroupOptionComponent);
		fixture.detectChanges();

		const group = fixture.nativeElement.querySelector('lu-listbox-option[role="group"]') as HTMLElement;
		const label = group.querySelector(`[id="${group.getAttribute('aria-labelledby')}"]`)!;

		expect(label).toBeTruthy();
		expect(label.textContent!.trim()).toBe('Légumes');
		expect(label.querySelector('[group-action]')).toBeNull();
	});
});
