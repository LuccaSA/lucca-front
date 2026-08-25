import { ChangeDetectionStrategy, Component, forwardRef, inject, Injector, input, OnInit, signal, Signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { getIntl, luBooleanAttribute } from '@lucca-front/ng/core';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillInputComponent, FilterPillLabelDirective, FilterPillLayout } from '@lucca-front/ng/filter-pills';
import { FORM_FIELD_INSTANCE, FormFieldComponent, INPUT_FRAMED_INSTANCE, InputDirective, ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { map } from 'rxjs';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { CHECKBOX_INPUT_TRANSLATIONS } from './checkbox-input.translate';

let nextId = 0;

@Component({
	selector: 'lu-checkbox-input',
	imports: [ReactiveFormsModule, InputDirective, FilterPillLabelDirective, LuTooltipTriggerDirective, ɵPresentationDisplayDefaultDirective],
	hostDirectives: [NoopValueAccessorDirective],
	templateUrl: './checkbox-input.component.html',
	styleUrl: './checkbox-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: FILTER_PILL_INPUT_COMPONENT,
			useExisting: forwardRef(() => CheckboxInputComponent),
		},
	],
	host: {
		'[class.checkboxField]': 'true',
		'[class.mod-checklist]': 'checklist()',
	},
})
export class CheckboxInputComponent implements FilterPillInputComponent, OnInit {
	readonly #injector = inject(Injector);
	readonly framed = inject(INPUT_FRAMED_INSTANCE, { optional: true }) !== null;
	readonly parentInput = inject(FILTER_PILL_INPUT_COMPONENT, { optional: true, skipSelf: true });
	readonly formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });
	readonly intl = getIntl(CHECKBOX_INPUT_TRANSLATIONS);

	readonly checklist = input(false, { transform: luBooleanAttribute });

	/**
	 * Should set aria-checked='mixed' attribute ?
	 */
	readonly mixed = input(false, { transform: luBooleanAttribute });

	readonly isFilterPill = signal<boolean>(false);
	filterPillInputId = `lu-checkbox-pill-input-${nextId++}`;

	readonly filterPillLayout: Signal<FilterPillLayout> = signal('checkable');
	readonly isFilterPillEmpty: Signal<boolean> = signal(true);
	readonly isFilterPillClearable: Signal<boolean> = signal(false);
	readonly hideCombobox: Signal<boolean> = signal(true);
	readonly showColon: Signal<boolean> = signal(false);

	ngControl = injectNgControl();

	/**
	 * Reactive mirrors of the control's value/disabled state, so the filter pill button
	 * (rendered with OnPush) reflects programmatic changes such as a form reset without
	 * needing a DOM event to trigger change detection. Initialized in `ngOnInit` because
	 * `ngControl.control` is only wired once the control directive's `ngOnChanges` has run.
	 */
	protected checkboxValue: Signal<boolean>;
	protected isCheckboxDisabled: Signal<boolean>;

	constructor() {
		if (this.formField) {
			this.formField.layout.set('checkable');
		}
	}

	ngOnInit(): void {
		const control = this.ngControl.control;
		this.checkboxValue = toSignal(control.valueChanges.pipe(map((value) => !!value)), { initialValue: !!control.value, injector: this.#injector });
		this.isCheckboxDisabled = toSignal(control.statusChanges.pipe(map(() => control.disabled)), { initialValue: control.disabled, injector: this.#injector });
	}

	clearFilterPillValue(): void {
		// Nothing to do here, we're just a checkbox, there's no clearer
	}

	registerFilterPillClosePopover(_closeFn: () => void): void {
		// Nothing to do here, we don't open a popover !
	}

	enableFilterPillMode?(): void {
		this.isFilterPill.set(true);
	}

	onFilterPillClick(): void {}
}
