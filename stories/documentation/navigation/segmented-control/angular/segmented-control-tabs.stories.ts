import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

interface segmentedControlBasicStory {
	S: boolean;
	withNumericBadge: boolean;
	vertical: boolean;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent],
		}),
	],
	argTypes: {
		S: {
			description: 'Modifie la taille du composant.',
		},
		withNumericBadge: {
			description: 'Présente un exemple avec un Numeric Badge.',
		},
		vertical: {
			description: 'Affiche le composant en vue verticale.',
		},
	},
	title: 'Documentation/Navigation/segmentedControl/Angular/Tabs',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.S ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const numericBadgeComponent = args.withNumericBadge ? ` <lu-numeric-badge value="8" />` : ``;
	return `<ng-template #label>
	Lorem${numericBadgeComponent}
</ng-template>
<lu-segmented-control-tabs${size}${vertical}>
	<lu-segmented-control-tabs-panel [label]="label" value="0">
		<div class="demo">Content Lorem</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Ipsum" value="1">
		<div class="demo">Content Ipsum</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Dolor sit amet" value="2">
		<div class="demo">Content Dolor sit amet</div>
	</lu-segmented-control-tabs-panel>
	<lu-segmented-control-tabs-panel label="Consectetur adipisicing elit" value="3">
		<div class="demo">Content Consectetur adipisicing elit</div>
	</lu-segmented-control-tabs-panel>
</lu-segmented-control-tabs>
`;
}

const Template = (args: segmentedControlBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`.demo { margin-block-start: 1rem }`],
});

export const Basic: StoryObj<segmentedControlBasicStory> = {
	args: {
		S: false,
		withNumericBadge: false,
		vertical: false,
	},
	render: Template,
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const tablist = canvas.getByRole('tablist');
		await expect(tablist).toBeVisible();
		const tabs = canvas.getAllByRole('tab');
		await expect(tabs.length).toBe(4);
	});

	await step('Clic sur un onglet', async () => {
		const tabs = canvas.getAllByRole('tab');
		await userEvent.click(tabs[1]);
		await waitForAngular();
		await expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
		await expect(canvas.getByText('Content Ipsum')).toBeVisible();
	});

	await step('Navigation clavier entre les onglets', async () => {
		const tabs = canvas.getAllByRole('tab');
		tabs[0].focus();
		await expect(tabs[0]).toHaveFocus();
		await userEvent.keyboard('{ArrowRight}');
		await waitForAngular();
		await expect(tabs[1]).toHaveFocus();
	});
});
