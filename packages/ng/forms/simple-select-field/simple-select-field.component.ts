import { OverlayConfig } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, Type, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { LuOptionContext, LuSimpleSelectDefaultOptionComponent } from '@lucca-front/ng/core-select';
import { FormFieldComponent, FormFieldSize, InputDirective } from '@lucca-front/ng/form-field';
import { InlineMessageState } from '@lucca-front/ng/inline-message';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { AbstractFieldComponent } from '../abstract-field-component';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';

@Component({
	selector: 'lu-simple-select-field',
	standalone: true,
	imports: [FormFieldComponent, InputDirective, ReactiveFormsModule, LuSimpleSelectInputComponent],
	templateUrl: './simple-select-field.component.html',
	hostDirectives: [NoopValueAccessorDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class SimpleSelectFieldComponent<TOption> extends AbstractFieldComponent {
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
	 * This is all proxy inputs from LuSimpleSelectInputComponent
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

	@Input()
	optionComparer: (option1: TOption, option2: TOption) => boolean = (option1, option2) => JSON.stringify(option1) === JSON.stringify(option2);

	@Input()
	optionTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown> = LuSimpleSelectDefaultOptionComponent;

	@Input()
	valueTpl?: TemplateRef<LuOptionContext<TOption>> | Type<unknown>;

	@Output()
	clueChange = new EventEmitter<string>();

	@Output()
	nextPage = new EventEmitter<void>();

	@Output()
	previousPage = new EventEmitter<void>();
}
