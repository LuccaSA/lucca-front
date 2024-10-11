import { Meta, StoryFn } from '@storybook/angular';

interface segmentedControlFilterStory {
	S: string;
	withNumericBadge: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/segmentedControl/Filter',
	argTypes: {
		S: {
			control: {
				type: 'boolean',
			},
		},
		vertical: {
			control: {
				type: 'boolean',
			},
		},
		withNumericBadge: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: segmentedControlFilterStory): string {
	const size = args.S ? `mod-S` : '';
	const vertical = args.vertical ? `mod-vertical` : '';
	return `<ul class="segmentedControl ${size} ${vertical}" role="presentation">
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
		<label for="tab1" class="segmentedControl-item-action">
			Lorem
		</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
		<label for="tab2" class="segmentedControl-item-action">
			Ipsum
			<span class="numericBadge" *ngIf="withNumericBadge">8</span>
		</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
		<label for="tab3" class="segmentedControl-item-action">
			Dolor sit amet
			<span class="numericBadge" *ngIf="withNumericBadge">88</span>
		</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
		<label for="tab4" class="segmentedControl-item-action">
			Consectetur adipisicing elit
		</label>
	</li>
</ul>
`;
}

const Template: StoryFn<segmentedControlFilterStory> = (args: segmentedControlFilterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Filter = Template.bind({});
Filter.args = {
	S: false,
	withNumericBadge: false,
	vertical: false,
};
