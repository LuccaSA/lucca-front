import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';
import { I18nTranslation, LuI18nInputComponent } from '@lucca-front/ng/i18n';

@Component({
	selector: 'i18n-input-stories',
	standalone: true,
	imports: [LuI18nInputComponent, FormsModule],
	template: `
		<div class="u-displayFlex">
			<button type="button" class="button" luI18nInput submitLabel="Submit" cancelLabel="Cancel" [(ngModel)]="translations">{{ translations[0].value }}</button>
		</div>
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
		},
		{
			cultureCode: 'fr-fr',
			cultureName: 'fr-FR',
			value: 'Tomate',
			required: false,
		},
		{
			cultureCode: 'en-us',
			cultureName: 'en-US',
			value: 'Tomato',
			required: false,
		},
		{
			cultureCode: 'es-es',
			cultureName: 'es-ES',
			value: '',
			required: false,
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
 imports: [LuI18nInputComponent, LuInputDisplayerDirective, FormsModule],
 template: \`
  <div class="u-displayFlex">
   <button type="button" class="button" luI18nInput submitLabel="Submit" cancelLabel="Cancel" [(ngModel)]="translations">{{ translations[0].value }}</button>
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
  },
  {
   cultureCode: 'fr-fr',
   cultureName: 'fr-FR',
   value: 'Tomate',
   required: false,
  },
  {
   cultureCode: 'en-us',
   cultureName: 'en-US',
   value: 'Tomato',
   required: false,
  },
  {
   cultureCode: 'es-es',
   cultureName: 'es-ES',
   value: '',
   required: false,
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
