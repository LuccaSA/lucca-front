import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { createTestStory } from '@/helpers/stories';
import { findPanelOptions, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

@Component({
	selector: 'demo-child-component',
	imports: [LuMultiSelectInputComponent, LuMultiSelectCounterDisplayerComponent, LuOptionDirective, LuMultiDisplayerDirective, FilterLegumesPipe, LuSimpleSelectInputComponent, LuDisplayerDirective],
	template: `
		@if (multiple()) {
			<lu-multi-select #selectRef data-qa="cost-center-multi-select" [options]="legumes | filterLegumes: clue" clearable (clueChange)="clue = $event">
				<ng-container *luOption="let costCenter; select: selectRef">{{ costCenter.name }}</ng-container>
				<ng-container *luMultiDisplayer="let costCenters; select: selectRef">
					<lu-multi-select-counter-displayer label="Selected" [selected]="costCenters" />
				</ng-container>
			</lu-multi-select>
		} @else {
			<lu-simple-select #selectRef data-qa="cost-center-simple-select" [options]="legumes | filterLegumes: clue" clearable (clueChange)="clue = $event">
				<ng-container *luOption="let costCenter; select: selectRef">{{ costCenter.name }}</ng-container>
				<ng-container *luDisplayer="let costCenter; select: selectRef">{{ costCenter.name }}</ng-container>
			</lu-simple-select>
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MyChildComponent {
	legumes = allLegumes;
	clue: string;
	multiple = input<boolean>(false);
}

export default {
	title: 'Documentation/Forms/FiltersPills/FilterPills/Child Select',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillComponent,
				CheckboxInputComponent,
				FormsModule,
				DateRangeInputComponent,
				DateInputComponent,
				StoryModelDisplayComponent,
				LuSimpleSelectInputComponent,
				LuMultiSelectInputComponent,
				FilterLegumesPipe,
				FormFieldComponent,
				TextInputComponent,
				MyChildComponent,
			],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				simpleSelect: null,
				multiSelect: [],
				date: null,
				dateRange: null,
				legumes: allLegumes,
			},

			template: `<lu-filter-pill label="Test inner select">
	<demo-child-component />
</lu-filter-pill>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Test inner select/ });
	const queryClearer = () => within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ });

	await step('The pill picks up the select declared in a child component', async () => {
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-expanded', 'true');
		await expect(screen.getByRole('combobox')).toBeVisible();
	});

	let optionText = '';
	await step('Selecting an option fills the pill with the custom displayer', async () => {
		const [option] = await findPanelOptions();
		optionText = option.innerText;
		await userEvent.click(option);
		await waitForAngular();
		await waitFor(() => expect(pill).toHaveAttribute('aria-expanded', 'false'));
		await expect(pill).toHaveTextContent(optionText);
		await expect(queryClearer()).toBeVisible();
	});

	await step('Clearing the pill empties the select of the child component', async () => {
		await userEvent.click(queryClearer());
		await waitForAngular();
		await expect(pill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(queryClearer()).not.toBeInTheDocument();
	});
});
