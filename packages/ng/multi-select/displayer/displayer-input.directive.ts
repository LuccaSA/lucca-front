import { DestroyRef, Directive, ElementRef, HostListener, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { getIntl, isNotNil } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { of } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input';
import { LU_MULTI_SELECT_TRANSLATIONS } from '../select.translate';
import { LuMultiSelectContentDisplayerComponent } from './content-displayer/content-displayer.component';

@Directive({
	selector: '[luMultiSelectDisplayerInput]',
	host: {
		'aria-haspopup': 'listbox',
		role: 'combobox',
		class: 'multipleSelect-displayer-search',
		type: 'text',
		'[attr.aria-expanded]': 'panelOpen()',
		'[attr.aria-activedescendant]': 'activeDescendant()',
		'[attr.aria-controls]': 'select.ariaControls',
		'[disabled]': 'disabled()',
		'[readonly]': '!this.select.searchable',
		'[placeholder]': 'placeholder()',
	},
	hostDirectives: [InputDirective],
})
export class LuMultiSelectDisplayerInputDirective<T> implements OnInit {
	intl = getIntl(LU_MULTI_SELECT_TRANSLATIONS);
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	contentDisplayer = inject(LuMultiSelectContentDisplayerComponent, { optional: true });

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

	destroyRef = inject(DestroyRef);

	@HostListener('input')
	onInput() {
		this.select.clueChanged(this.elementRef.nativeElement.value);
	}

	panelOpen = toSignal(this.select.isPanelOpen$);
	activeDescendant = toSignal(this.select.activeDescendant$);
	disabled = toSignal(this.select.disabled$);
	placeholder = toSignal(
		this.context.option$.pipe(
			startWith([]),
			switchMap((options) => {
				if ((options || []).length > 0) {
					return of('');
				}
				return this.select.placeholder$.pipe(map((placeholder) => ((isNotNil(placeholder) && placeholder.length > 0) || this.contentDisplayer ? placeholder : this.intl.placeholder)));
			}),
		),
	);

	ngOnInit(): void {
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data?: { keepClue: boolean }) => {
			if (!data?.keepClue) {
				this.elementRef.nativeElement.value = '';
				this.select.clueChanged('');
			}
			this.elementRef.nativeElement.focus();
		});
		this.select.emptyClue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.elementRef.nativeElement.value = '';
		});
	}
}
