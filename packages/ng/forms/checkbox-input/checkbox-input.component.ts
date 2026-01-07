import { booleanAttribute, ChangeDetectionStrategy, Component, forwardRef, inject, input, signal, Signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillInputComponent, FilterPillLabelDirective, FilterPillLayout } from '@lucca-front/ng/filter-pills';
import { FORM_FIELD_INSTANCE, FormFieldComponent, INPUT_FRAMED_INSTANCE, InputDirective, PresentationDisplayDirective } from '@lucca-front/ng/form-field';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { CHECKBOX_INPUT_TRANSLATIONS } from './checkbox-input.translate';
import { getIntl } from '../../core/translate';

let nextId = 0;

@Component({
	selector: 'lu-checkbox-input',
	imports: [ReactiveFormsModule, InputDirective, FilterPillLabelDirective, LuTooltipTriggerDirective, PresentationDisplayDirective],
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
export class CheckboxInputComponent implements FilterPillInputComponent {
	framed = inject(INPUT_FRAMED_INSTANCE, { optional: true }) !== null;
	parentInput = inject(FILTER_PILL_INPUT_COMPONENT, { optional: true, skipSelf: true });
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });
	intl = getIntl(CHECKBOX_INPUT_TRANSLATIONS);

	readonly checklist = input(false, { transform: booleanAttribute });

	/**
	 * Should set aria-checked='mixed' attribute ?
	 */
	readonly mixed = input(false, { transform: booleanAttribute });

	isFilterPill = signal<boolean>(false);
	filterPillInputId = `lu-checkbox-pill-input-${nextId++}`;

	filterPillLayout: Signal<FilterPillLayout> = signal('checkable');
	isFilterPillEmpty: Signal<boolean> = signal(true);
	isFilterPillClearable: Signal<boolean> = signal(false);
	hideCombobox: Signal<boolean> = signal(true);
	showColon: Signal<boolean> = signal(false);

	ngControl = injectNgControl();

	constructor() {
		if (this.formField) {
			this.formField.layout.set('checkable');
		}
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
