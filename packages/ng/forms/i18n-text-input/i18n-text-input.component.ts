import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { FormFieldIdDirective } from '../form-field-id.directive';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { TextInputComponent } from '../text-input/text-input.component';
import { LU_TEXTFIELD_TRANSLATIONS } from './i18n-text-input.translate';

@Component({
	selector: 'lu-i18n-text-input',
	standalone: true,
	imports: [FormFieldComponent, ReactiveFormsModule, FormFieldIdDirective, NgTemplateOutlet, PopoverDirective, NgFor, TextInputComponent, FormFieldComponent, FormsModule],
	templateUrl: './i18n-text-input.component.html',
	styleUrl: './i18n-text-input.component.scss',
	hostDirectives: [NoopValueAccessorDirective],
	encapsulation: ViewEncapsulation.None,
})
export class I18nTextInputComponent {
	ngControl = injectNgControl();

	intl = getIntl(LU_TEXTFIELD_TRANSLATIONS);

	@Input()
	placeholder: string = '';

	@Input()
	languages = ['fr-FR', 'de-DE', 'es-ES'];
	// languages = ['fr-FR', 'de-DE', 'es-ES', 'en-EN', 'fr-BR', 'de-CH', 'en-US'];

	model = {};

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair({ originX: 'end', originY: 'bottom' }, { overlayX: 'end', overlayY: 'top' }, 16, 6),
		new ConnectionPositionPair({ originX: 'end', originY: 'top' }, { overlayX: 'end', overlayY: 'bottom' }, 16, -6),
	];
}
