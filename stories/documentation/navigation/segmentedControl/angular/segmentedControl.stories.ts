import { FormsModule } from '@angular/forms';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmentedControl';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface segmentedControlBasicStory {
	S: string;
	withNumericBadge: boolean;
	vertical: boolean;
}

export default {
	decorators: [
		moduleMetadata({
			imports: [NumericBadgeComponent, SegmentedControlComponent, SegmentedControlFilterComponent, FormsModule, StoryModelDisplayComponent],
		}),
	],
	title: 'Documentation/Navigation/segmentedControl/Angular/Basic',
} as Meta;

function getTemplate(args: segmentedControlBasicStory): string {
	const size = args.S ? ` small` : ``;
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

const Template: StoryFn<segmentedControlBasicStory> = (args: segmentedControlBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	S: false,
	withNumericBadge: false,
	vertical: false,
};
