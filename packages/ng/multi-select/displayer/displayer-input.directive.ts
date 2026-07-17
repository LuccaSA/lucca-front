import { computed, DestroyRef, Directive, ElementRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { isNotNil, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { InputDirective } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '../input';
import { MULTI_SELECT_WITH_SELECT_ALL_CONTEXT } from '../input/select-all/select-all.models';
import { LuMultiSelectContentDisplayerComponent } from './content-displayer/content-displayer.component';

@Directive({
	selector: '[luMultiSelectDisplayerInput]',
	host: {
		'aria-haspopup': 'listbox',
		role: 'combobox',
		class: 'multipleSelect-displayer-search',
		type: 'text',
		'[attr.aria-expanded]': 'panelOpen',
		'[attr.aria-activedescendant]': 'activeDescendant',
		'[attr.aria-controls]': 'controls',
		'[attr.disabled]': 'disabled',
		'[attr.placeholder]': 'placeholder',
		'[attr.readonly]': 'readonly',
		'(input)': 'onInput()',
	},
	hostDirectives: [InputDirective],
})
export class LuMultiSelectDisplayerInputDirective<T> implements OnInit {
	readonly select = inject<LuMultiSelectInputComponent<T>>(LuMultiSelectInputComponent);
	readonly selectAllContext = inject(MULTI_SELECT_WITH_SELECT_ALL_CONTEXT, { optional: true });
	readonly contentDisplayer = inject(LuMultiSelectContentDisplayerComponent, { optional: true });

	readonly context = inject<ILuOptionContext<T[]>>(LU_OPTION_CONTEXT);

	readonly elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

	readonly destroyRef = inject(DestroyRef);

	get panelOpen() {
		return this.#panelOpen();
	}

	get activeDescendant() {
		return this.#activeDescendant();
	}

	get controls() {
		return this.select.ariaControls;
	}

	get disabled() {
		return this.#disabled() || null;
	}

	get placeholder() {
		return this.#placeholder();
	}

	get readonly() {
		return this.select.searchable ? null : true;
	}

	onInput() {
		this.select.clueChanged(this.elementRef.nativeElement.value);
	}

	readonly #panelOpen = toSignal(this.select.isPanelOpen$);
	readonly #activeDescendant = toSignal(this.select.activeDescendant$);
	readonly #disabled = toSignal(this.select.disabled$);
	readonly #options = toSignal(this.context.option$, { initialValue: [] as T[] });
	readonly #placeholder = computed(() => {
		const options = this.#options();
		if ((options || []).length > 0 || this.selectAllContext?.mode() === 'all') {
			return '';
		}
		const placeholder = this.select.placeholder();
		return (isNotNil(placeholder) && placeholder.length > 0) || this.contentDisplayer ? placeholder : this.select.intl().placeholder;
	});

	constructor() {
		if (this.selectAllContext) {
			ɵeffectWithDeps([this.selectAllContext.mode], (mode) => {
				if (mode === 'all') {
					this.#clearText();
				}
			});
		}
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
		if (this.elementRef.nativeElement.value) {
			this.elementRef.nativeElement.value = '';
			this.select.clueChanged('');
		}
	}
}
