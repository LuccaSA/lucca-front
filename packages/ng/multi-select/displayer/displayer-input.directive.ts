import { DestroyRef, Directive, ElementRef, HostBinding, inject, OnInit } from '@angular/core';
import { LuMultiSelectInputComponent } from '../input';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '../../core-select/option';
import { map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
	selector: '[luMultiSelectDisplayerInput]',
	standalone: true,
	host: {
		'aria-haspopup': 'listbox',
		role: 'combobox',
		class: 'multipleSelect-displayer-search',
	},
})
export class LuMultiSelectDisplayerInputDirective<T> implements OnInit {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

	destroyRef = inject(DestroyRef);

	@HostBinding('attr.aria-expanded')
	panelOpen = false;

	@HostBinding('attr.aria-activedescendant')
	activeDescendant = '';

	@HostBinding('attr.aria-controls')
	controls = this.select?.ariaControls;

	@HostBinding('disabled')
	disabled = false;

	@HostBinding('placeholder')
	placeholder = '';

	ngOnInit(): void {
		this.context.option$
			.pipe(
				map((options) => {
					if ((options || []).length > 0) {
						return '';
					}
					return this.select.placeholder || '';
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((placeholder) => (this.placeholder = placeholder));
		this.select.isPanelOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((open) => {
			this.panelOpen = open;
		});
		this.select.activeDescendant$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((activeDescendant) => {
			this.activeDescendant = activeDescendant;
		});
		this.context.isDisabled$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((disabled) => {
			this.disabled = disabled;
		});
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.elementRef.nativeElement.value = '';
			this.select.clueChanged('');
			this.elementRef.nativeElement.focus();
		});
		this.select.emptyClue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.elementRef.nativeElement.value = '';
		});
	}
}
