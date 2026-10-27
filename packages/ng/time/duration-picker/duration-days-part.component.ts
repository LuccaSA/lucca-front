import { ChangeDetectionStrategy, Component, ElementRef, LOCALE_ID, computed, inject, input, model, output, signal, viewChild } from '@angular/core';
import { luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { InputDirective } from '@lucca-front/ng/form-field';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { PickerControlDirection } from '../core/misc.utils';
import { RepeatOnHoldDirective } from '../core/repeat-on-hold.directive';

let nextId = 0;

/**
 * Single decimal field used by `lu-duration-picker` in `days` unit. Unlike `lu-time-picker-part`,
 * it accepts a decimal separator and lets the browser handle text editing, since a number of days
 * is typed freely instead of being filled digit by digit.
 */
@Component({
	selector: 'lu-duration-days-part',
	imports: [RepeatOnHoldDirective, InputDirective, FormLabelComponent],
	templateUrl: './duration-days-part.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationDaysPartComponent {
	readonly label = input('');

	/**
	 * Value in days, decimals allowed.
	 */
	readonly value = input(0, { transform: luNumberAttribute });

	/**
	 * Maximum number of decimals, derived from the step by the host picker.
	 */
	readonly decimals = input(0, { transform: luNumberAttribute });

	/**
	 * Maximum number of digits accepted for the integer part.
	 */
	readonly maxDigits = input(2, { transform: luNumberAttribute });

	readonly displayArrows = input(false, { transform: luBooleanAttribute });

	readonly hideValue = input(false, { transform: luBooleanAttribute });

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly isValueSet = model<boolean>(false);

	valueChange = output<number>();
	nonDigitKeyPressed = output<void>();
	inputControlClick = output<PickerControlDirection>();
	touched = output<void>();

	readonly daysInput = viewChild<ElementRef<HTMLInputElement>>('daysInput');

	readonly inputId = `duration-days-part-${nextId++}`;

	private readonly locale = inject(LOCALE_ID);

	/**
	 * What the user is currently typing, kept verbatim so an in-progress `0,` stays visible:
	 * the real input is transparent and the value is painted by the display span.
	 */
	private readonly draft = signal<string | null>(null);

	private readonly decimalSeparator = computed(() => new Intl.NumberFormat(this.locale).formatToParts(1.1).find((part) => part.type === 'decimal')?.value ?? '.');

	protected readonly formattedValue = computed(() => new Intl.NumberFormat(this.locale, { useGrouping: false, maximumFractionDigits: this.decimals() }).format(this.value()));

	protected readonly valueLabel = computed(() => {
		if (this.hideValue()) {
			return '  ';
		}

		const draft = this.draft();
		if (draft !== null) {
			return draft;
		}

		return this.isValueSet() ? this.formattedValue() : '';
	});

	protected readonly inputValue = computed(() => (this.hideValue() || !this.isValueSet() ? null : this.formattedValue()));

	protected readonly digitNumber = computed(() => Math.max(2, this.valueLabel().length));

	protected inputHandler(event: Event): void {
		if (!(event.target instanceof HTMLInputElement)) {
			return;
		}

		const rawValue = event.target.value;
		const sanitized = this.sanitize(rawValue);

		if (sanitized !== rawValue) {
			this.nonDigitKeyPressed.emit();
		}

		event.target.value = sanitized;
		this.draft.set(sanitized);
		this.isValueSet.set(true);
		this.valueChange.emit(this.parse(sanitized));
	}

	protected keydownHandler(event: KeyboardEvent): void {
		switch (event.key) {
			case 'ArrowUp':
				event.preventDefault();
				this.up();
				break;
			case 'ArrowDown':
				event.preventDefault();
				this.down();
				break;
		}
	}

	protected clickHandler(event: MouseEvent): void {
		event.preventDefault();
	}

	protected blurHandler(): void {
		this.draft.set(null);

		const input = this.daysInput()?.nativeElement;
		if (input) {
			input.value = this.inputValue() ?? '';
		}

		this.touched.emit();
	}

	up(): void {
		this.draft.set(null);
		this.isValueSet.set(true);
		this.inputControlClick.emit('up');
	}

	down(): void {
		this.draft.set(null);
		this.isValueSet.set(true);
		this.inputControlClick.emit('down');
	}

	focus(): void {
		this.daysInput()?.nativeElement.focus();
	}

	/**
	 * Keeps digits and at most one decimal separator, within the allowed number of digits.
	 */
	private sanitize(rawValue: string): string {
		const separators = new Set(['.', ',', this.decimalSeparator()]);
		let integerPart = '';
		let decimalPart = '';
		let hasSeparator = false;

		for (const char of rawValue) {
			if (char >= '0' && char <= '9') {
				if (hasSeparator) {
					if (decimalPart.length < this.decimals()) {
						decimalPart += char;
					}
				} else if (integerPart.length < this.maxDigits()) {
					integerPart += char;
				}
			} else if (separators.has(char) && !hasSeparator && this.decimals() > 0) {
				hasSeparator = true;
			}
		}

		return hasSeparator ? `${integerPart}${this.decimalSeparator()}${decimalPart}` : integerPart;
	}

	private parse(value: string): number {
		const parsed = Number.parseFloat(value.replace(this.decimalSeparator(), '.'));

		return Number.isNaN(parsed) ? 0 : parsed;
	}
}
