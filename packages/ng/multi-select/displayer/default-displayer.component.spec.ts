import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LuDisabledOptionDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuMultiSelectInputComponent } from '../input/select-input.component';

type Entity = { id: number; name: string; disabled: boolean };

const options: Entity[] = [
	{ id: 1, name: 'test 1', disabled: false },
	{ id: 2, name: 'test 2', disabled: true },
	{ id: 3, name: 'test 3', disabled: false },
];

@Component({
	selector: 'lu-multi-select-disabled-option-tpl-host',
	imports: [ReactiveFormsModule, LuMultiSelectInputComponent, LuOptionDirective, LuDisabledOptionDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-multi-select #selectRef [formControl]="control" [options]="options">
			<ng-container *luOption="let option; select: selectRef" [luDisabledOption]="option.disabled">{{ option.name }}</ng-container>
		</lu-multi-select>
	`,
})
class DisabledOptionTplHostComponent {
	options = options;
	control = new FormControl(options);
}

@Component({
	selector: 'lu-multi-select-disabled-displayer-tpl-host',
	imports: [FormsModule, LuMultiSelectInputComponent, LuOptionDirective, LuDisplayerDirective, LuDisabledOptionDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-multi-select #selectRef [(ngModel)]="selected" [options]="options">
			<ng-container *luDisplayer="let option; select: selectRef" [luDisabledOption]="option.disabled">{{ option.name }}</ng-container>
			<ng-container *luOption="let option; select: selectRef">{{ option.name }}</ng-container>
		</lu-multi-select>
	`,
})
class DisabledDisplayerTplHostComponent {
	options = options;
	selected = options;
}

describe(LuMultiSelectInputComponent.name + ' displayer chips', () => {
	async function render<THost>(host: new () => THost): Promise<ComponentFixture<THost>> {
		const fixture = TestBed.createComponent(host);
		fixture.detectChanges();
		// ngModel writes its value asynchronously
		await fixture.whenStable();
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		return fixture;
	}

	function getChips(fixture: ComponentFixture<unknown>): HTMLElement[] {
		return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll<HTMLElement>('.multipleSelect-displayer-chip'));
	}

	function hasKillButton(chip: HTMLElement): boolean {
		return chip.querySelector('.chip-kill') !== null;
	}

	describe('with a disabled option declared in the option template', () => {
		it('should keep the kill button on enabled options and remove it on disabled ones', async () => {
			const fixture = await render(DisabledOptionTplHostComponent);

			const chips = getChips(fixture);
			expect(chips.map((chip, index) => chip.textContent?.includes(options[index].name))).toEqual([true, true, true]);
			expect(chips.map(hasKillButton)).toEqual([true, false, true]);
		});

		it('should remove every kill button when the whole select is disabled', async () => {
			const fixture = await render(DisabledOptionTplHostComponent);

			fixture.componentInstance.control.disable();
			fixture.detectChanges();

			expect(getChips(fixture).map(hasKillButton)).toEqual([false, false, false]);
		});
	});

	describe('with a disabled option declared in a custom displayer template', () => {
		it('should remove the kill button on disabled options only', async () => {
			const fixture = await render(DisabledDisplayerTplHostComponent);

			expect(getChips(fixture).map(hasKillButton)).toEqual([true, false, true]);
		});
	});
});
