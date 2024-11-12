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
		// TODO : if content is empty
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
	let classes = ``;
	if (args.size === 'S' || args.size === 'M') {
		classes = `class="mod-${args.size}"`;
	}
	if (args.iconSample) {
		return `<lu-divider ${withRole} ${classes}><lu-icon icon="heart" /></lu-divider>`;
	} else {
		if (args.buttonWrapper) {
			return `<lu-divider ${withRole} ${classes}><button luButton>{{content}}</button></lu-divider>`;
		} else {
			return `<lu-divider ${withRole} ${classes}>{{content}}</lu-divider>`;
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
