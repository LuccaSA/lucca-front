import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { ButtonComponent } from 'dist/ng/button';

interface DividerAngularStory {
	size: string;
	content: string;
	role: boolean;
	iconSample: boolean;
	buttonWrapper: boolean;
}

export default {
	title: 'Documentation/Structure/Divider',
	decorators: [
		moduleMetadata({
			imports: [DividerComponent, ButtonComponent, IconComponent],
		}),
	],
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
		size: {
			options: ['', 'S', 'M'],
			control: {
				type: 'select',
			},
		},
		role: {
			control: {
				type: 'boolean',
			},
		},
		buttonWrapper: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'iconSample', truthy: false },
		},
		iconSample: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: DividerAngularStory): string {
	const withRole = args.role ? `withRole` : ``;
	let sizes = ``;
	if (args.size === 'S' || args.size === 'M') {
		sizes = `size="${args.size}"`;
	}
	if (args.iconSample) {
		return `<lu-divider ${withRole} ${sizes}><lu-icon icon="heart" /></lu-divider>`;
	} else {
		if (args.buttonWrapper) {
			return `<lu-divider ${withRole} ${sizes}><button luButton>${args.content}</button></lu-divider>`;
		} else {
			return `<lu-divider ${withRole} ${sizes}>${args.content}</lu-divider>`;
		}
	}
}

const Template: StoryFn<DividerAngularStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Angular = Template.bind({});
Angular.args = {
	content: 'Lorem ipsum dolor',
	size: '',
	role: false,
	iconSample: false,
	buttonWrapper: false,
};
