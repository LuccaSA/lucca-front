import { IconComponent } from '@lucca-front/ng/icon';
import { ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';

interface OptionBasicStory {
	multiple: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Add option',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent, IconComponent],
		}),
	],
	argTypes: {},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		return {
			styles: [`lu-listbox { block-size: 15rem }`],
			template: cleanupTemplate(`<lu-listbox${multiple}>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option>option 2</lu-listbox-option>
	<lu-listbox-option>option 3</lu-listbox-option>
	<lu-listbox-option>option 4</lu-listbox-option>
	<lu-listbox-option>option 5</lu-listbox-option>
	<lu-listbox-option>option 6</lu-listbox-option>
	<lu-listbox-option>option 7</lu-listbox-option>
	<lu-listbox-option>option 8</lu-listbox-option>
	<lu-listbox-option>option 9</lu-listbox-option>
	<lu-listbox-option add>Ajouter une option</lu-listbox-option>
</lu-listbox>`),
		};
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
	},
};

const getAddOption = (canvasElement: HTMLElement) => within(canvasElement).getByRole('option', { name: /Ajouter une option/ });

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	await step('The add option is an option without selection state', async () => {
		const addOption = getAddOption(canvasElement);
		await expect(addOption).toHaveClass('mod-add');
		await expect(addOption).not.toHaveAttribute('aria-selected');
	});

	await step('The add option displays a plus icon', async () => {
		await expect(getAddOption(canvasElement).querySelector('.lucca-icon')).toHaveClass('icon-mathsPlus');
	});
});

export const MultipleTEST = createTestStory({ ...Basic, name: 'Multiple', args: { ...Basic.args, multiple: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	await step('The add option has no checkbox, unlike the other options', async () => {
		await expect(getAddOption(canvasElement).querySelector('.checkboxField')).not.toBeInTheDocument();
		const option1 = within(canvasElement).getByText('option 1').closest('[role="option"]');
		await expect(option1.querySelector('.checkboxField')).toBeInTheDocument();
	});
});
