import { FormsModule } from '@angular/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmentedControl';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { SegmentedControlPanelComponent } from 'packages/ng/segmentedControl/panel/panel.component';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface segmentedControlBasicStory {
	S: string;
	withNumericBadge: boolean;
	vertical: boolean;
	tabs: boolean;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlComponent, SegmentedControlFilterComponent, SegmentedControlPanelComponent, FormsModule, StoryModelDisplayComponent],
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
		return `<lu-segmented-control${size}${vertical} [(ngModel)]="sample">
	<lu-segmented-control-filter label="Lorem" value="0" />
	<lu-segmented-control-filter label="Ipsum" value="1" />
	<lu-segmented-control-filter label="Dolor sit amet" value="2" />
	<lu-segmented-control-filter label="Consectetur adipisicing elit" value="3" />
</lu-segmented-control>
<pr-story-model-display>{{sample}}</pr-story-model-display>
`;
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
