import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FancyBoxBasicStory {
	content: string;
	backgroundLeft: string;
	backgroundRight: string;
	foreground: string;
	size: string;
}

export default {
	title: 'Documentation/Structure/FancyBox/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [FancyBoxComponent],
		}),
	],
	argTypes: {
		content: {
			control: {
				type: 'text',
			},
		},
		backgroundLeft: {
			control: {
				type: 'text',
			},
			description: "URL de l'image en arrière plan à gauche (200x160). Via <code>--components-fancyBox-background-left</code>.",
		},
		backgroundRight: {
			control: {
				type: 'text',
			},
			description: "URL de l'image en arrière plan à droite (200x160). Via <code>--components-fancyBox-background-right</code>.",
		},
		foreground: {
			control: {
				type: 'text',
			},
			description: "URL de l'image en premier plan (200x160). Via <code>--components-fancyBox-foreground</code>.",
		},
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const bgLeft = args.backgroundLeft
		? `
	--components-fancyBox-background-left: url(${args.backgroundLeft});`
		: ``;
	const bgRight = args.backgroundRight
		? `
	--components-fancyBox-background-right: url(${args.backgroundRight});`
		: ``;
	const fg = args.foreground
		? `
	--components-fancyBox-foreground: url(${args.foreground});`
		: ``;
	const style = args.backgroundLeft || args.backgroundRight || args.foreground ? ` [attr.style]="'${bgLeft}${bgRight}${fg}'"` : ``;
	const sizeAttr = args.size === 'S' ? ` mod-S` : ``;

	return `<div class="fancyBox${sizeAttr}"${style}>
	<div class="fancyBox-content">
		${args.content}
		<div class="fancyBox-content-foreground"></div>
	</div>
</div>`;
}

const Template = (args: FancyBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: block;
				padding-block: var(--pr-t-spacings-400);
			}
		`,
	],
});

export const Basic: StoryObj<FancyBoxBasicStory> = {
	args: {
		content: 'Fancy box content',
		backgroundLeft: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg',
		backgroundRight: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg',
		foreground: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg',
		size: null,
	},
	render: Template,
};
