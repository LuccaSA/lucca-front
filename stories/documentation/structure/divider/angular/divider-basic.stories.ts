import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface DividerBasicStory {
	size: string;
	content: string;
	separatorRole: boolean;
	icon: boolean;
	button: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Structure/Divider/Angular',
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
		separatorRole: {
			control: {
				type: 'boolean',
			},
			description: 'Permet de restituer Divider comme un séparateur natif (hr). Son éventuel contenu textuel ne sera alors plus restitué.',
		},
		button: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'icon', truthy: false },
		},
		icon: {
			control: {
				type: 'boolean',
			},
		},
		vertical: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: DividerBasicStory): string {
	const separatorParam = args.separatorRole ? `separatorRole` : ``;
	let sizes = ``;
	if (args.size === 'S' || args.size === 'M') {
		sizes = `size="${args.size}"`;
	}
	if (args.icon) {
		return `<lu-divider ${args.vertical ? 'vertical' : ''} ${separatorParam} ${sizes}><lu-icon icon="heart" /></lu-divider>`;
	} else {
		if (args.button) {
			return `<lu-divider ${args.vertical ? 'vertical' : ''} ${separatorParam} ${sizes}><button luButton>${args.content}</button></lu-divider>`;
		} else {
			return `<lu-divider ${args.vertical ? 'vertical' : ''} ${separatorParam} ${sizes}>${args.content}</lu-divider>`;
		}
	}
}

const Template: StoryFn<DividerBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host:has(.mod-vertical) {
			min-block-size: var(--pr-t-spacings-500);
			display: flex;
			justify-content: center;
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {
	content: 'Text',
	size: '',
	separatorRole: false,
	icon: false,
	button: false,
	vertical: false,
};
