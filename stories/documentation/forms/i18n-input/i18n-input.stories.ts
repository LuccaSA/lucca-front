import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { I18nTranslation, LuI18nInputComponent } from '@lucca-front/ng/i18n';
import { JsonPipe } from '@angular/common';
import { TextfieldComponent } from '../../../../packages/ng/forms/textfield/textfield.component';

@Component({
	selector: 'i18n-input-stories',
	standalone: true,
	imports: [LuI18nInputComponent, FormsModule, JsonPipe, TextfieldComponent],
	template: `
		<form class="u-displayFlex u-flexDirectionColumn" #form="ngForm">
			<lu-i18n-textfield [(ngModel)]="translations" label="Label" placeholder="Placeholder" name="i18n"> </lu-i18n-textfield>
			<p>Valid : {{ form.valid }}</p>
			<p>Value : {{ translations | json }}</p>
		</form>
	`,
})
class I18nInputStory {
	translations: I18nTranslation[] = [
		{
			cultureCode: 'invariant',
			cultureName: 'Default value',
			value: 'Tomato',
			required: true,
			cultureIcon: 'mapGlobe',
			current: true,
		},
		{
			cultureCode: 'fr-fr',
			cultureName: 'fr-FR',
			required: true,
			value: 'Tomate',
		},
		{
			cultureCode: 'en-us',
			cultureName: 'en-US',
			value: 'Tomato',
		},
		{
			cultureCode: 'es-es',
			cultureName: 'es-ES',
			required: true,
			value: '',
		},
	];
}

export default {
	title: 'Documentation/Forms/I18n-Input',
	component: I18nInputStory,
	argTypes: {},
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<I18nInputStory> = (args: I18nInputStory) => ({
	props: args,
});

const code = `
import { FormsModule } from '@angular/forms';
import { LuI18nInputComponent } from '@lucca-front/ng/i18n';
@Component({
 selector: 'i18n-input-stories',
 standalone: true,
 imports: [LuI18nInputDirective, LuInputDisplayerDirective, FormsModule],
 template: \`
		<div class="u-displayFlex u-flexDirectionColumn">
			<lu-i18n-textfield [(ngModel)]="translations" label="Label" placeholder="Placeholder" name="i18n"> </lu-i18n-textfield>
			{{ translations | json }}
		</div>
 \`,
})
class I18nInputStory {
  translations: I18nTranslation[] = [
    {
      cultureCode: 'invariant',
      cultureName: 'Default value',
      value: 'Tomato',
      required: true,
      cultureIcon: 'mapGlobe',
      current: true,
    },
    {
      cultureCode: 'fr-fr',
      cultureName: 'fr-FR',
      value: 'Tomate',
    },
    {
      cultureCode: 'en-us',
      cultureName: 'en-US',
      value: 'Tomato',
    },
    {
      cultureCode: 'es-es',
      cultureName: 'es-ES',
      required: true,
      value: '',
    },
  ];
}`;

export const Basic = template.bind({});
Basic.args = {};
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
