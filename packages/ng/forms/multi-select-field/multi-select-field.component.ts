import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, numberAttribute, Output, TemplateRef, Type, ViewEncapsulation } from '@angular/core';
import { AbstractFieldComponent } from '../abstract-field-component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { InlineMessageState } from '@lucca-front/ng/inline-message';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';
import { OverlayConfig } from '@angular/cdk/overlay';
import { LuOptionContext } from '../../core-select/select.model';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { LuSimpleSelectDefaultOptionComponent } from '../../core-select/option';
import { LuMultiSelectInputComponent } from '../../multi-select/input';
import { LuMultiSelectDefaultDisplayerComponent } from '../../multi-select/displayer';

@Component({
	selector: 'lu-multi-select-field',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, ReactiveFormsModule, LuMultiSelectInputComponent],
	templateUrl: './multi-select-field.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class MultiSelectFieldComponent<TOption> extends AbstractFieldComponent {
	@Input({ required: true })
	label: string;

	@Input({ transform: booleanAttribute })
	hiddenLabel = false;

	@Input()
	tooltip: string | SafeHtml;

	@Input()
	inlineMessage: string;

	@Input()
	inlineMessageState: InlineMessageState;

	@Input()
	size: FormFieldSize = 'M';

	/**
	 * This is all proxy inputs from LuMultiSelectInputComponent
	 */
	@Input()
	placeholder: string;

	@Input({ transform: booleanAttribute })
	clearable = false;

	@Input({ transform: booleanAttribute })
	disabled = false;

	@Input({ transform: booleanAttribute })
	loading = false;

	@Input()
	overlayConfig?: OverlayConfig = {
		hasBackdrop: true,
		backdropClass: 'cdk-overlay-transparent-backdrop',
	};

	@Input()
	options: TOption[];

	@Input({ transform: numberAttribute })
	maxValuesShown = Infinity;

	@Input()
	optionComparer: (option1: TOption, option2: TOption) => boolean = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);

	@Input()
	optionTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown> = LuSimpleSelectDefaultOptionComponent;

	@Input()
	valueTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown>;

	@Input()
	valuesTpl?: TemplateRef<LuOptionContext<TOption[]>> | Type<unknown> = LuMultiSelectDefaultDisplayerComponent;

	@Output()
	clueChange = new EventEmitter<string>();

	@Output()
	nextPage = new EventEmitter<void>();

	@Output()
	previousPage = new EventEmitter<void>();
}
