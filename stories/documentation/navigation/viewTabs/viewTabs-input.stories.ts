import { Meta, StoryFn } from '@storybook/angular';

interface segmentedControlInputStory {
	size: string;
	withNumericBadge: boolean;
}

export default {
	title: 'Documentation/Navigation/segmentedControl/Input',
	argTypes: {
		size: {
			options: ['', 'mod-S', 'mod-XS'],
			control: {
				type: 'select',
			},
		},
		withNumericBadge: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: segmentedControlInputStory): string {
	return `<ul class="segmentedControl ${args.size}">
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

const Template: StoryFn<segmentedControlInputStory> = (args: segmentedControlInputStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Input = Template.bind({});
Input.args = {
	size: '',
	withNumericBadge: false,
};
