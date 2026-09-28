import { LISTBOX_STATE, ListboxComponent, OptionComponent } from '@lucca-front/ng/listbox';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { cleanupTemplate, createTestStory, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, within } from 'storybook/test';

interface OptionBasicStory {
	multiple: boolean;
	state: string;
	withOption: boolean;
}

export default {
	title: 'Documentation/Forms/Listbox Option/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [ListboxComponent, OptionComponent],
		}),
	],
	argTypes: {
		multiple: {
			description: 'Ajoute une checkbox à l’option.',
			table: { category: 'inputs' },
		},
		state: {
			control: 'select',
			options: setStoryOptions(LISTBOX_STATE),
			description: "Modifie l'état de l'option.",
			table: { category: 'inputs' },
		},
		withOption: {
			type: 'boolean',
			if: { arg: 'state', truthy: true },
			description: 'Conserve l’affichage des options déjà chargées.',
			table: { category: 'inputs' },
		},
	},
	render: (args: OptionBasicStory) => {
		const multiple = args.multiple ? ` multiple` : ``;
		const status = args.state ? ` state="${args.state}"` : ``;
		const statusMsg = args.state === 'loading' ? ` statusMsg="Chargement…"` : args.state === 'empty' ? ` statusMsg="Aucun résultat pour votre recherche"` : ``;
		if (args.withOption || !args.state) {
			return {
				template: cleanupTemplate(`<lu-listbox${multiple}${status}${statusMsg}>
	<lu-listbox-option>option 1</lu-listbox-option>
	<lu-listbox-option hovered>option 2</lu-listbox-option>
	<lu-listbox-option checked>option 3</lu-listbox-option>
	<lu-listbox-option checked hovered>option 4</lu-listbox-option>
	<lu-listbox-option disabled>option 5</lu-listbox-option>
	<lu-listbox-option checked disabled>option 6</lu-listbox-option>
</lu-listbox>`),
			};
		} else {
			return {
				template: cleanupTemplate(`<lu-listbox${multiple}${status}${statusMsg} />`),
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		multiple: false,
		withOption: false,
	},
};

const getOptionByText = (canvasElement: HTMLElement, text: string) => within(canvasElement).getByText(text).closest('lu-listbox-option');

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const listbox = canvas.getByRole('listbox');

	await step('The listbox is single selection and not busy', async () => {
		await expect(listbox).not.toHaveAttribute('aria-multiselectable');
		await expect(listbox).toHaveAttribute('aria-busy', 'false');
		await expect(listbox).not.toHaveAttribute('aria-describedby');
		await expect(within(listbox).getAllByRole('option')).toHaveLength(6);
	});

	await step('Checked options are exposed as selected', async () => {
		for (const text of ['option 3', 'option 4', 'option 6']) {
			await expect(getOptionByText(canvasElement, text)).toHaveAttribute('aria-selected', 'true');
		}
		for (const text of ['option 1', 'option 2', 'option 5']) {
			await expect(getOptionByText(canvasElement, text)).toHaveAttribute('aria-selected', 'false');
		}
	});

	await step('Disabled options are exposed as disabled', async () => {
		await expect(getOptionByText(canvasElement, 'option 5')).toHaveAttribute('aria-disabled', 'true');
		await expect(getOptionByText(canvasElement, 'option 6')).toHaveAttribute('aria-disabled', 'true');
		await expect(getOptionByText(canvasElement, 'option 1')).toHaveAttribute('aria-disabled', 'false');
	});

	await step('Hovered options are highlighted', async () => {
		await expect(getOptionByText(canvasElement, 'option 2').querySelector('.listboxOption-content')).toHaveClass('is-hovered');
		await expect(getOptionByText(canvasElement, 'option 1').querySelector('.listboxOption-content')).not.toHaveClass('is-hovered');
	});

	await step('Single selection options have no checkbox', async () => {
		await expect(listbox.querySelector('.checkboxField')).not.toBeInTheDocument();
	});
});

export const MultipleTEST = createTestStory({ ...Basic, name: 'Multiple', args: { ...Basic.args, multiple: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const listbox = within(canvasElement).getByRole('listbox');

	await step('The listbox is multi selection', async () => {
		await expect(listbox).toHaveAttribute('aria-multiselectable', 'true');
	});

	await step('Every option has a checkbox hidden from assistive technologies', async () => {
		for (const option of within(listbox).getAllByRole('option')) {
			const checkbox = option.querySelector('.checkboxField');
			await expect(checkbox).toBeInTheDocument();
			await expect(checkbox).toHaveAttribute('aria-hidden', 'true');
		}
	});
});

export const LoadingTEST = createTestStory({ ...Basic, name: 'Loading', args: { ...Basic.args, state: 'loading', withOption: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const listbox = canvas.getByRole('listbox');

	await step('The listbox is busy', async () => {
		await expect(listbox).toHaveAttribute('aria-busy', 'true');
	});

	await step('The options stay displayed and an inert skeleton is added after them', async () => {
		const skeleton = listbox.querySelector('lu-listbox-option.is-loading');
		await expect(skeleton).toHaveAttribute('inert');
		await expect(listbox.lastElementChild.previousElementSibling).toBe(skeleton);
		await expect(canvas.getByText('option 1')).toBeInTheDocument();
	});

	await step('The status message is available to assistive technologies', async () => {
		await expect(canvas.getByText('Chargement…')).toHaveClass('pr-u-mask');
	});
});

export const EmptyTEST = createTestStory({ ...Basic, name: 'Empty', args: { ...Basic.args, state: 'empty', withOption: true } }, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const listbox = canvas.getByRole('listbox');

	await step('The projected options are not rendered', async () => {
		await expect(canvas.queryByText('option 1')).not.toBeInTheDocument();
	});

	await step('The listbox is described by the empty status message', async () => {
		await expect(listbox).toHaveAccessibleDescription('Aucun résultat pour votre recherche');
		const emptyOption = canvasElement.querySelector(`#${listbox.getAttribute('aria-describedby')}`);
		await expect(emptyOption).toHaveAttribute('aria-hidden', 'true');
	});

	await step('The empty status message is not exposed as an option', async () => {
		await expect(within(listbox).queryAllByRole('option')).toHaveLength(0);
	});
});
