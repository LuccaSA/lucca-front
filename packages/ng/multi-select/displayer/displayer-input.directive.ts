import { DestroyRef, Directive, ElementRef, HostBinding, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { map, startWith, switchMap } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input';
import { of } from 'rxjs';

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
				startWith([]),
				switchMap((options) => {
					if ((options || []).length > 0) {
						return of('');
					}
					return this.select.placeholder$;
				}),
				takeUntilDestroyed(this.destroyRef),
			)
			.subscribe((placeholder) => {
				this.placeholder = placeholder;
			});
		this.select.isPanelOpen$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((open) => {
			this.panelOpen = open;
		});
		this.select.activeDescendant$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((activeDescendant) => {
			// Pushing this to next cycle to avoid expression has changed while it was checked
			setTimeout(() => {
				this.activeDescendant = activeDescendant;
			}, 1);
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
