import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { createTestStory } from '@/helpers/stories';
import { expectNgModelDisplay, waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/FiltersPills/Checkbox/Angular',
	decorators: [
		moduleMetadata({
			imports: [FilterPillComponent, DateInputComponent, FormsModule, StoryModelDisplayComponent, DateRangeInputComponent, CheckboxInputComponent],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examplePeriod: null,
				checkboxValue: false,
			},
			template: `<lu-filter-pill label="Inclure les collaborateurs partis" name="includeFormerEmployees">
	<lu-checkbox-input [(ngModel)]="checkboxValue" />
</lu-filter-pill>

<pr-story-model-display>{{ checkboxValue }}</pr-story-model-display>
`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const pill = canvas.getByRole('button', { name: /Inclure les collaborateurs partis/ });

	await step('Initial state: the pill is not pressed', async () => {
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
		await expectNgModelDisplay(canvasElement, 'false');
	});

	await step('Clicking the pill toggles the value', async () => {
		await userEvent.click(pill);
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
		await expectNgModelDisplay(canvasElement, 'true');
	});

	await step('Space and Enter toggle the value', async () => {
		pill.focus();
		await userEvent.keyboard(' ');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'false');
		await expectNgModelDisplay(canvasElement, 'false');

		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(pill).toHaveAttribute('aria-pressed', 'true');
		await expectNgModelDisplay(canvasElement, 'true');
	});

	await step('A checkbox pill never shows a clear button', async () => {
		await expect(within(pill.closest('.filterPillWrapper') as HTMLElement).queryByRole('button', { name: /Vider ce champ/ })).not.toBeInTheDocument();
	});
});
