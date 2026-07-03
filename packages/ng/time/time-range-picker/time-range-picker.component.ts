import { afterNextRender, booleanAttribute, ChangeDetectionStrategy, Component, computed, forwardRef, inject, Injector, input, LOCALE_ID, model, output, signal, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { intlInputOptions } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { IconComponent } from '@lucca/prisme/icon';
import { ISO8601Duration, ISO8601Time } from '../core/date-primitives';
import { DEFAULT_TIME_VALUE, MAX_TIME } from '../core/duration.utils';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { TimeRangePickerRange } from './time-range-picker';
import { LU_TIME_RANGE_PICKER_INSTANCE } from './time-range-picker.token';
import { LU_TIME_RANGE_PICKER_TRANSLATIONS } from './time-range-picker.translate';
import { TimeRangePickerSize } from './time-range-picker.type';

@Component({
	selector: 'lu-time-range-picker',
	templateUrl: './time-range-picker.component.html',
	styleUrl: './time-range-picker.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, TimePickerComponent, ɵPresentationDisplayDefaultDirective],
	host: {
		'(focusin)': 'onFocusIn()',
		'(focusout)': 'onFocusOut()',
	},
	providers: [
		{
			provide: LU_TIME_RANGE_PICKER_INSTANCE,
			useExisting: forwardRef(() => TimeRangePickerComponent),
		},
	],
})
export class TimeRangePickerComponent implements Omit<FormValueControl<TimeRangePickerRange | null>, 'max'> {
	#injector = inject(Injector);
	#formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });
	#locale = inject(LOCALE_ID);

	readonly inputFocused = signal(false);

	readonly value = model<TimeRangePickerRange | null>(null);

	readonly intl = input(...intlInputOptions(LU_TIME_RANGE_PICKER_TRANSLATIONS));

	readonly displayArrows = input(false, { transform: booleanAttribute });

	readonly forceMeridiemDisplay = input(false, { transform: booleanAttribute });

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly size = input<TimeRangePickerSize>();

	readonly max = input<ISO8601Time | undefined>(MAX_TIME);

	readonly step = input<ISO8601Duration | null>(null);

	readonly touch = output<void>();

	keyPressed = signal(false);

	readonly startValue = computed(() => this.value()?.start ?? DEFAULT_TIME_VALUE);
	readonly endValue = computed(() => this.value()?.end ?? DEFAULT_TIME_VALUE);
	readonly formFieldLabel = computed(() => this.#formFieldRef?.label());
	readonly isLocaleFr = computed(() => this.#locale === 'fr');

	DEFAULT_TIME_VALUE = DEFAULT_TIME_VALUE;

	constructor() {
		if (this.#formFieldRef) {
			this.#formFieldRef.rolePresentationLabel.set(true);
		}
	}

	onStartChange(start: ISO8601Time): void {
		this.value.set({
			start,
			end: this.value()?.end,
		});
	}

	onEndChange(end: ISO8601Time): void {
		this.value.set({
			start: this.value()?.start,
			end,
		});
	}

	onFocusIn(): void {
		this.inputFocused.set(true);
	}

	onFocusOut(): void {
		this.inputFocused.set(false);
		afterNextRender(
			() => {
				if (!this.inputFocused()) {
					this.touch.emit();
				}
			},
			{ injector: this.#injector },
		);
	}

	partToFocus(): 'meridiem' | 'minutes' {
		return this.forceMeridiemDisplay() ? 'meridiem' : 'minutes';
	}
}
