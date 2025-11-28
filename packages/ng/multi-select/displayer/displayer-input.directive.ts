import { DestroyRef, Directive, ElementRef, HostBinding, HostListener, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { ɵeffectWithDeps } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { LuMultiSelectInputComponent } from '../input';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from '../input/select-all/select-all.models';

@Directive({
	selector: '[luMultiSelectDisplayerInput]',
	standalone: true,
	host: {
		'aria-haspopup': 'listbox',
		role: 'combobox',
		class: 'multipleSelect-displayer-search',
		type: 'text',
	},
	hostDirectives: [InputDirective],
})
export class LuMultiSelectDisplayerInputDirective<T> implements OnInit {
	select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT);

	context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

	destroyRef = inject(DestroyRef);

	@HostBinding('attr.aria-expanded')
	get panelOpen() {
		return this.#panelOpen();
	}

	@HostBinding('attr.aria-activedescendant')
	get activeDescendant() {
		return this.#activeDescendant();
	}

	@HostBinding('attr.aria-controls')
	get controls() {
		return this.select.ariaControls;
	}

	@HostBinding('disabled')
	get disabled() {
		return this.#disabled();
	}

	@HostBinding('placeholder')
	get placeholder() {
		return this.#placeholder();
	}

	@HostBinding('readonly')
	get readonly() {
		return !this.select.searchable;
	}

	@HostListener('input')
	onInput() {
		this.select.clueChanged(this.elementRef.nativeElement.value);
	}

	#panelOpen = toSignal(this.select.isPanelOpen$);
	#activeDescendant = toSignal(this.select.activeDescendant$);
	#disabled = toSignal(this.select.disabled$);
	#placeholder = toSignal(
		this.context.option$.pipe(
			startWith([]),
			switchMap((options) => {
				if ((options || []).length > 0) {
					return of('');
				}
				return this.select.placeholder$;
			}),
		),
	);

	constructor() {
		ɵeffectWithDeps([this.selectAllContext.mode], (mode) => {
			if (mode === 'all') {
				this.#clearText();
			}
		});
	}

	ngOnInit(): void {
		this.select.focusInput$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((data?: { keepClue: boolean }) => {
			if (!data?.keepClue) {
				this.#clearText();
			}
			this.elementRef.nativeElement.focus();
		});
		this.select.emptyClue$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
			this.elementRef.nativeElement.value = '';
		});
	}

	#clearText() {
		this.elementRef.nativeElement.value = '';
		this.select.clueChanged('');
	}
}
