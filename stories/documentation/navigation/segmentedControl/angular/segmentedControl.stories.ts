import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmentedControl';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { SegmentedControlPanelComponent } from 'packages/ng/segmentedControl/panel/panel.component';

interface segmentedControlBasicStory {
	S: string;
	withNumericBadge: boolean;
	vertical: boolean;
	tabs: boolean;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlComponent, SegmentedControlFilterComponent, SegmentedControlPanelComponent],
		}),
	],
	title: 'Documentation/Navigation/segmentedControl/Angular/Basic',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.S ? ` small` : ``;
	const vertical = args.vertical ? ` vertical` : ``;
	const numericBadgeComponent = args.withNumericBadge ? ` <lu-numeric-badge value="7" />` : ``;
	if (args.tabs) {
		return `<lu-segmented-control tabs${size}${vertical} [active]="0">
	<lu-segmented-control-panel label="Lorem" active>Content for lorem</lu-segmented-control-panel>
	<lu-segmented-control-panel label="Ipsum">Content for ipsum</lu-segmented-control-panel>
	<lu-segmented-control-panel label="Dolor sit amet">Content for dolor sit amet</lu-segmented-control-panel>
	<lu-segmented-control-panel label="Consectetur adipisicing elit">Content for consectetur adipisicing elit</lu-segmented-control-panel>
</lu-segmented-control>`;
	} else {
		return `<lu-segmented-control${size}${vertical}>
	<lu-segmented-control-filter label="Lorem" />
	<lu-segmented-control-filter label="Ipsum" />
	<lu-segmented-control-filter label="Dolor sit amet" />
	<lu-segmented-control-filter label="Consectetur adipisicing elit" />
</lu-segmented-control>`;
	}
}

const Template: StoryFn<segmentedControlBasicStory> = (args: segmentedControlBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	S: false,
	withNumericBadge: false,
	vertical: false,
	tabs: false,
};
