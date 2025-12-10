import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmentedControlTabs';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

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
