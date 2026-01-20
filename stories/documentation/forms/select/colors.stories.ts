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
import { createTestStory, getStoryGenerator, useDocumentationStory } from 'stories/helpers/stories';
import { expect, screen, userEvent, within } from 'storybook/test';
import { waitForAngular } from '../../../helpers/test';
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

const basePlay = async ({ canvasElement, step }) => {
	const input = within(canvasElement).getByRole('combobox');

	await step('Mouse interactions', async () => {
		await userEvent.click(input);
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option');
		const optionText = options[0].innerText;
		await userEvent.click(options[0]);
		await waitForAngular();
		await expect(input).toHaveFocus();
		await expect(input.parentElement).toHaveTextContent(optionText);
	});

	await step('Keyboard interactions', async () => {
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('listbox')).toBeNull();
		await expect(input).toHaveFocus();
		await waitForAngular();
	});
};

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

export const BasicTEST = createTestStory(Basic, basePlay);

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
