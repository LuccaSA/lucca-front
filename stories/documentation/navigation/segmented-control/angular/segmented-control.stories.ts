import { FormsModule } from '@angular/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { expectNgModelDisplay, waitForAngular } from 'stories/helpers/test';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';
import { expect, userEvent, within } from 'storybook/test';

interface segmentedControlBasicStory {
	small: boolean;
	withNumericBadge: boolean;
	vertical: boolean;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlComponent, SegmentedControlFilterComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	argTypes: {
		small: {
			description: 'Modifie la taille du composant.',
		},
		withNumericBadge: {
			description: 'Présente un exemple avec un Numeric Badge.',
		},
		vertical: {
			description: 'Affiche le composant en vue verticale.',
		},
	},
	title: 'Documentation/Navigation/segmentedControl/Angular/Basic',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.small ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const numericBadgeComponent = args.withNumericBadge ? ` <lu-numeric-badge value="8" />` : ``;

	return `<ng-template #label>
	Lorem${numericBadgeComponent}
</ng-template>
<lu-segmented-control${size}${vertical} [(ngModel)]="sample">
	<lu-segmented-control-filter [label]="label" value="0" />
	<lu-segmented-control-filter label="Ipsum" value="1" />
	<lu-segmented-control-filter label="Dolor sit amet" value="2" />
	<lu-segmented-control-filter label="Consectetur adipisicing elit" value="3" />
</lu-segmented-control>
<pr-story-model-display>{{sample}}</pr-story-model-display>
`;
}

const Template = (args: segmentedControlBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<segmentedControlBasicStory> = {
	args: {
		small: false,
		withNumericBadge: false,
		vertical: false,
	},
	render: Template,
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const options = canvas.getAllByRole('radio');
		await expect(options.length).toBe(4);
	});

	await step('Sélectionne une option par clic', async () => {
		const options = canvas.getAllByRole('radio');
		await userEvent.click(options[1]);
		await waitForAngular();
		await expect(options[1]).toBeChecked();
		await expectNgModelDisplay(canvasElement, '1');
	});

	await step('Navigation clavier entre les options', async () => {
		const options = canvas.getAllByRole('radio');
		options[0].focus();
		await expect(options[0]).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
		await expect(options[1]).toHaveFocus();
	});
});
