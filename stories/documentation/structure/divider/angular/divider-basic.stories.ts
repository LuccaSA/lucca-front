import { ButtonComponent } from '@lucca-front/ng/button';
import { DIVIDER_SIZE, DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';

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
			description: 'Contenu textuel projeté dans le séparateur.',
			table: { category: 'story' },
		},
		size: {
			options: setStoryOptions(DIVIDER_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du séparateur.',
			table: { category: 'inputs' },
		},
		separatorRole: {
			control: {
				type: 'boolean',
			},
			description: 'Ajoute `role="separator"` au composant pour qu’il soit restitué comme un séparateur par les technologies d’assistance.',
			table: { category: 'inputs' },
		},
		button: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'icon', truthy: false },
			description: 'Projette un bouton dans le séparateur.',
			table: { category: 'story' },
		},
		icon: {
			control: {
				type: 'boolean',
			},
			description: 'Projette une icône dans le séparateur.',
			table: { category: 'story' },
		},
		vertical: {
			control: {
				type: 'boolean',
			},
			description: 'Affiche le séparateur verticalement.',
			table: { category: 'inputs' },
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

const Template = (args: DividerBasicStory) => ({
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

export const Basic: StoryObj<DividerBasicStory> = {
	args: {
		content: 'Text',
		size: '',
		separatorRole: false,
		icon: false,
		button: false,
		vertical: false,
	},
	render: Template,
};
