import { ChangeDetectionStrategy, Component, signal, ViewEncapsulation } from '@angular/core';
import { MultilanguageInputComponent } from '@lucca-front/ng/forms/multilanguage-input/multilanguage-input.component';
import { form, FormField } from '@angular/forms/signals';
import { MultilanguageTranslation } from '@lucca-front/ng/forms/multilanguage-input/model/multilanguage-translation';
import { JsonPipe } from '@angular/common';
import { CalloutComponent } from '@lucca-front/ng/callout/callout/callout.component';
import { CodeComponent } from '@lucca-front/ng/code/code.component';

@Component({
	selector: 'multilanguage-signal-field',
	imports: [MultilanguageInputComponent, FormField, JsonPipe, CalloutComponent, CodeComponent],
	templateUrl: './multilanguage-signal-field.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultilanguageSignalFieldComponent {
	formModel = signal<MultilanguageTranslation[]>([
		{
			cultureCode: 'invariant',
			value: 'Invariant value',
		},
		{
			cultureCode: 'fr-FR',
			value: 'Valeur en français',
		},
		{
			cultureCode: 'en-EN',
			value: 'English value',
		},
		{
			cultureCode: 'de-DE',
			value: "I don't speak German",
		},
	]);
	formField = form(this.formModel);
}
