import { booleanAttribute, Component, forwardRef, inject, input, Input, signal, Signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FILTER_PILL_INPUT_COMPONENT, FilterPillInputComponent, FilterPillLabelDirective, FilterPillLayout } from '@lucca-front/ng/filter-pills';
import { FORM_FIELD_INSTANCE, FormFieldComponent, FRAMED_INPUT_INSTANCE, InputDirective } from '@lucca-front/ng/form-field';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

let nextId = 0;

@Component({
	selector: 'lu-checkbox-input',
	standalone: true,
	imports: [ReactiveFormsModule, InputDirective, FilterPillLabelDirective, LuTooltipTriggerDirective],
	hostDirectives: [NoopValueAccessorDirective],
	templateUrl: './checkbox-input.component.html',
	styleUrls: ['./checkbox-input.component.scss'],
	encapsulation: ViewEncapsulation.None,
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
	formField = inject<FormFieldComponent>(FORM_FIELD_INSTANCE, { optional: true });

	isFilterPill = false;
	filterPillInputId = `lu-checkbox-pill-input-${nextId++}`;
	checklist = input(false, { transform: booleanAttribute });

	filterPillLayout: Signal<FilterPillLayout> = signal('checkable');
	isFilterPillEmpty: Signal<boolean> = signal(true);
	isFilterPillClearable: Signal<boolean> = signal(false);
	hideCombobox: Signal<boolean> = signal(true);
	showColon: Signal<boolean> = signal(false);

	ngControl = injectNgControl();

	@Input({ transform: booleanAttribute })
	/**
	 * Should set aria-checked='mixed' attribute ?
	 */
	mixed = false;

	framed = inject(FRAMED_INPUT_INSTANCE, { optional: true }) !== null;

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
		this.isFilterPill = true;
	}

	onFilterPillClick(): void {}
}
