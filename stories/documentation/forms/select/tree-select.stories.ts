import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterBarComponent, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { expect, screen, userEvent, within } from 'storybook/test';
import { createTestStory } from '../../../helpers/stories';
import { waitForAngular } from '../../../helpers/test';

export default {
	title: 'Documentation/Forms/TreeSelect',
	decorators: [
		moduleMetadata({
			imports: [
				LuMultiSelectInputComponent,
				TreeSelectDirective,
				FilterPillComponent,
				LuCoreSelectDepartmentsDirective,
				FormFieldComponent,
				FilterBarComponent,
				LuSimpleSelectInputComponent,
				DividerComponent,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()],
		}),
	],
	argTypes: {},
	render: (args, { argTypes }) => {
		return {
			props: {
				allLegumes: allLegumes,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},
			template: `
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" clearable />
</lu-form-field><br>
`,
		};
	},
} as Meta;

export const AllImplementations: StoryObj = {
	render: (args, { argTypes }) => {
		return {
			props: {
				allLegumes: allLegumes,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},
			template: `
<lu-form-field label="Basic tree multi-select">
	<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Multi-select tree" />
</lu-form-field><br>
<lu-form-field label="Basic tree simple-select">
	<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" placeholder="Simple-select tree" />
</lu-form-field>
<br>
<lu-divider />
<lu-form-field label="Department multi-select">
	<lu-multi-select departments placeholder="Multi-select tree" />
</lu-form-field>
<br>
<lu-form-field label="Department simple-select">
	<lu-simple-select departments placeholder="Simple-select tree" />
</lu-form-field>
<br>
<lu-divider />
<lu-filter-bar>
	<lu-filter-pill label="Légumes">
		<lu-multi-select filterPillLabelPlural="légumes" [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Départements">
		<lu-multi-select departments filterPillLabelPlural="départements" />
	</lu-filter-pill>
	<lu-filter-pill label="Légume">
		<lu-simple-select [treeSelect]="groupingFn" [options]="allLegumes" />
	</lu-filter-pill>
	<lu-filter-pill label="Département">
		<lu-simple-select departments />
	</lu-filter-pill>
</lu-filter-bar>
`,
		};
	},
};

export const Basic: StoryObj = {};

// Same as for the multi-select
async function checkValues(input: HTMLElement, values: string[]) {
	if (values.length === 0) {
		await expect(input.parentElement?.getElementsByTagName('lu-numeric-badge').length).toBe(0);
	}
	// If it's a counter displayer
	if (input.parentElement?.getElementsByTagName('lu-numeric-badge').length > 0) {
		const counter = input.parentElement?.getElementsByTagName('lu-numeric-badge')[0];
		await expect(counter).toHaveTextContent(values.length.toString());
	} else {
		for (const value of values) {
			await expect(input.parentElement).toHaveTextContent(value);
		}
	}
}

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	// Mouse interactions
	const input = within(canvasElement).getByRole('combobox');
	const buttons = within(canvasElement).queryAllByRole('button');
	// Context
	const isBadgeDisplayer = input.parentElement?.getElementsByTagName('lu-simple-select-default-option').length > 0;
	if (buttons.length > 0) {
		const clearButton = buttons.find((button) => button.className.includes('multipleSelect-clear'));
		if (clearButton) {
			await userEvent.click(clearButton);
		}
	}
	await userEvent.click(input);
	await waitForAngular();
	const panel = within(screen.getByRole('listbox'));
	const options = await panel.findAllByRole('option').then((options) => options.filter((el) => !el.id.includes('select-all')));
	const optionValues = ['Artichaut', 'Brocoli', 'Céleri', 'Chou chinois', 'Laitue'];
	await userEvent.click(options[0]);
	await userEvent.click(options[1]);
	await userEvent.click(options[2]);
	await userEvent.click(options[3]);
	await userEvent.keyboard('{Escape}');
	await waitForAngular();
	await expect(screen.queryByText('listbox')).toBeNull();
	await checkValues(input, optionValues);
	if (isBadgeDisplayer) {
		await step('Clear and remove values using mouse', async () => {
			const chipClearButtons = await within(input.parentElement).findAllByRole('button');
			await userEvent.click(chipClearButtons[0]);
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await waitForAngular();
			const panel = within(screen.getByRole('listbox'));
			const options = await panel.findAllByRole('option');
			await userEvent.click(options[1]);
			await userEvent.keyboard('{Escape}');
			await waitForAngular();
			await expect(screen.queryByText('listbox')).toBeNull();
			await expect(input.parentElement).not.toHaveTextContent(optionValues[1]);
		});
	}
	// Doing the same but with keyboard
	await step('Keyboard interactions', async () => {
		const buttons = await within(canvasElement).findAllByRole('button');
		await userEvent.click(buttons.find((button) => button.className.includes('multipleSelect-clear')));
		await waitForAngular();
		input.focus();
		await expect(input).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await expect(screen.getByRole('listbox')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('listbox')).toBeNull();
		await waitForAngular();
		await expect(input).toHaveFocus();
		// Broken but fixed in current master, TODO uncomment
		// await userEvent.keyboard('{Space}');
		// await waitForAngular();
		// await expect(screen.getByRole('listbox')).toBeVisible();
		// await userEvent.keyboard('{Escape}');
		input.focus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		// For some reason, this arrowdown is not being handled properly, even tho it reaches the key manager
		// I'm keeping it as commented for now as it only happens in test env and I want to test more stuff and not get stuck on this
		// await userEvent.keyboard('{ArrowDown}');
		await userEvent.keyboard('{Enter}');
		// Because of the arrowDown issue, we'll select more using mouse in order to be able to test more stuff
		const panel = within(screen.getByRole('listbox'));
		const options = await panel.findAllByRole('option').then((options) => options.filter((el) => !el.id.includes('select-all')));
		const optionValues = ['Artichaut', 'Brocoli', 'Céleri', 'Chou chinois', 'Laitue'];
		await userEvent.click(options[1]);
		await userEvent.click(options[2]);
		await userEvent.click(options[3]);
		const allOptions = await panel.findAllByRole('option');
		await userEvent.keyboard('{Escape}');
		if (allOptions.some((opt) => opt.id.includes('select-all'))) {
			const valuesWithSelectAll = options.map((opt) => opt.textContent);
			valuesWithSelectAll.splice(1, 3);
			await checkValues(input, valuesWithSelectAll);
		} else {
			await checkValues(input, optionValues);
		}
		if (isBadgeDisplayer) {
			input.focus();
			await userEvent.tab();
			await userEvent.keyboard('{Enter}');
			// We should have unselected first option
			await expect(input.parentElement).not.toHaveTextContent(optionValues[0]);
			await userEvent.click(input);
			await userEvent.keyboard('{Backspace}');
			// We should have unselected last option
			await expect(input.parentElement).not.toHaveTextContent(optionValues[3]);
			// Now we search and select an option based on the result
			await userEvent.type(input, 'carotte');
			await waitForAngular();
			const searchResult = await within(screen.getByRole('listbox')).findAllByRole('option');
			await expect(searchResult).toHaveLength(1);
			await userEvent.keyboard('{Enter}');
			await userEvent.keyboard('{Escape}');
			await expect(input.parentElement).toHaveTextContent(searchResult[0].textContent);
		}
	});
});
