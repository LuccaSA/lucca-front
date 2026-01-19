import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from '@lucca-front/ng/color';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { getStoryGenerator, useDocumentationStory } from 'stories/helpers/stories';
import { colorDecoratives50, colorDecoratives500, colorLucca, colorNeutral, colorPickerStory, FilterColorsPipe, LuCoreColorPickerInputStoryComponent } from './select.utils';

export type LuColorPickerInputStoryComponent = LuCoreColorPickerInputStoryComponent & {
	selectedColor: ColorOption | null;
} & LuSimpleSelectInputComponent<ColorOption>;

const generateStory = getStoryGenerator<LuColorPickerInputStoryComponent>({
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	...colorPickerStory,
	argTypes: {
		...colorPickerStory.argTypes,
		selectedColor: HiddenArgType,
	},
});

export const Basic = generateStory({
	name: 'Basic',
	description: '',
	template: `<lu-form-field label="Décoratives 500" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>`,
	storyPartial: {
		args: {
			colors: colorDecoratives500,
		},
	},
});

export const Decorative = generateStory({
	name: 'Decorative Color',
	description: '',
	template: `<lu-form-field label="Décoratives 50" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>`,
	storyPartial: {
		args: {
			colors: colorDecoratives50,
		},
	},
});

export const Neutral = generateStory({
	name: 'Neutral Color',
	description: '',
	template: `<lu-form-field label="Neutrales" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>`,
	storyPartial: {
		args: {
			colors: colorNeutral,
		},
	},
});

export const Lucca = generateStory({
	name: 'Lucca Color',
	description: '',
	template: `<lu-form-field label="lucca" [size]="size === '' ? null : size">
	<lu-color-input [colors]="colors" [(ngModel)]="selectedColor" [clearable]="clearable" [compact]="compact" />
</lu-form-field>`,
	storyPartial: {
		args: {
			colors: colorLucca,
		},
	},
});

const meta: Meta<LuColorPickerInputStoryComponent> = {
	title: 'Documentation/Forms/ColorPicker',
	component: LuSimpleSelectInputComponent,
	decorators: [
		moduleMetadata({
			imports: [
				FormFieldComponent,
				FilterColorsPipe,
				LuSimpleSelectInputComponent,
				LuTooltipTriggerDirective,
				LuDisplayerDirective,
				LuOptionDirective,
				FormsModule,
				ColorInputComponent,
				ColorComponent,
			],
		}),
	],
	args: {
		colors: [],
		compact: false,
		clearable: true,
	},
	parameters: {
		docs: useDocumentationStory(Basic),
	},
};

export default meta;
