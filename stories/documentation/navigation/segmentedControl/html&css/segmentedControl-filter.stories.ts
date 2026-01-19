import { Meta, StoryObj } from '@storybook/angular';

interface segmentedControlFilterStory {
	S: boolean;
	withNumericBadge: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/segmentedControl/HTML&CSS/Filter',
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
	const size = args.S ? ` mod-S` : '';
	const vertical = args.vertical ? ` mod-vertical` : '';
	const numericBadge = args.withNumericBadge ? ` <span class="numericBadge">8</span>` : ``;
	return `<ul class="segmentedControl${size}${vertical}" role="presentation">
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
		<label for="tab1" class="segmentedControl-item-action">
			Lorem
		</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
		<label for="tab2" class="segmentedControl-item-action">
			Ipsum${numericBadge}
		</label>
	</li>
	<li class="segmentedControl-item">
		<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
		<label for="tab3" class="segmentedControl-item-action">
			Dolor sit amet
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

const Template = (args: segmentedControlFilterStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Filter: StoryObj<segmentedControlFilterStory> = {
	args: {
		S: false,
		withNumericBadge: false,
		vertical: false,
	},
	render: Template,
};
