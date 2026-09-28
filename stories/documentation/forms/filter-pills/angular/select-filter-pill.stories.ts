import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectUsersDirective, provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { createTestStory } from '@/helpers/stories';
import { findPanelOptions, waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';

export default {
	title: 'Documentation/Forms/FiltersPills/Select/Angular',
	decorators: [
		applicationConfig({ providers: [provideAnimations(), provideHttpClient()] }),
		moduleMetadata({
			imports: [FilterPillComponent, LuSimpleSelectInputComponent, LuMultiSelectInputComponent, FormsModule, StoryModelDisplayComponent, JsonPipe, FilterLegumesPipe, LuCoreSelectUsersDirective],
			providers: [provideCoreSelectCurrentUserId(() => 66)],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				example: null,
				examples: [],
				user: null,
				legumes: allLegumes,
				legumesPluralFn: (count: number) => ({ one: `${count} légume`, other: `${count} légumes` }),
			},
			template: `<lu-filter-pill label="Légume" name="legume">
			<lu-simple-select [(ngModel)]="example"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" />
</lu-filter-pill>

<pr-story-model-display>{{ example | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Légume" name="legume">
	<lu-multi-select [(ngModel)]="examples"	[options]="legumes | filterLegumes:clue" (clueChange)="clue = $event" [filterPillLabelPluralFn]="legumesPluralFn" />
</lu-filter-pill>

<pr-story-model-display>{{ examples | json }}</pr-story-model-display>

<hr class="divider pr-u-marginBlock400" />

<lu-filter-pill label="Utilisateur" name="user">
	<lu-simple-select [(ngModel)]="user"	users enableFormerEmployees/>
</lu-filter-pill>

<pr-story-model-display>{{ user | json }}</pr-story-model-display>
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
	const [simplePill, multiPill] = canvas.getAllByRole('button', { name: /Légume/ });
	const getModelDisplay = (index: number) => canvas.getAllByTestId('pr-ng-model')[index];
	const getClearer = (pill: HTMLElement) => within(pill.closest('.filterPillWrapper') as HTMLElement).getByRole('button', { name: /Vider ce champ/ });

	await step('Selecting an option fills the simple select pill and the model', async () => {
		await userEvent.click(simplePill);
		await waitForAngular();
		const [option] = await findPanelOptions();
		const optionText = option.innerText;
		await userEvent.click(option);
		await waitForAngular();

		// Selecting a value closes the popover of a simple select
		await waitFor(() => expect(simplePill).toHaveAttribute('aria-expanded', 'false'));
		await expect(simplePill).toHaveTextContent(optionText);
		await expect(getModelDisplay(0)).toHaveTextContent(optionText);
	});

	await step('Clearing the simple select pill empties the model', async () => {
		await userEvent.click(getClearer(simplePill));
		await waitForAngular();
		await expect(simplePill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(0)).toHaveTextContent('null');
	});

	await step('Selecting several options displays the plural label', async () => {
		await userEvent.click(multiPill);
		await waitForAngular();
		const options = await findPanelOptions();
		const optionTexts = [options[0].innerText, options[1].innerText];
		await userEvent.click(options[0]);
		await waitForAngular();
		// The popover of a multi select stays open between selections
		await expect(multiPill).toHaveAttribute('aria-expanded', 'true');
		await expect(multiPill).toHaveTextContent(optionTexts[0]);
		await userEvent.click(options[1]);
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await waitFor(() => expect(multiPill).toHaveAttribute('aria-expanded', 'false'));

		await expect(multiPill).toHaveTextContent('2 légumes');
		await expect(getModelDisplay(1)).toHaveTextContent(optionTexts[0]);
		await expect(getModelDisplay(1)).toHaveTextContent(optionTexts[1]);
	});

	await step('Clearing the multi select pill empties the model', async () => {
		await userEvent.click(getClearer(multiPill));
		await waitForAngular();
		await expect(multiPill).toHaveTextContent('Aucune valeur sélectionnée');
		await expect(getModelDisplay(1)).toHaveTextContent('[]');
	});
});
