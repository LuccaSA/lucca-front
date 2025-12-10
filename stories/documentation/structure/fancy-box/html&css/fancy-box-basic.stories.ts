import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FancyBoxBasicStory {
	content: string;
	backgroundLeft: string;
	backgroundRight: string;
	foreground: string;
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
			description: 'URL injectée dans <code>--components-fancyBox-background-left</code>',
		},
		backgroundRight: {
			control: {
				type: 'text',
			},
			description: 'URL injectée dans <code>--components-fancyBox-background-right</code>',
		},
		foreground: {
			control: {
				type: 'text',
			},
			description: 'URL injectée dans <code>--components-fancyBox-foreground</code>',
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const bgLeft = args.backgroundLeft ? `\n--components-fancyBox-background-left: url(${args.backgroundLeft});` : ``;
	const bgRight = args.backgroundRight ? `\n--components-fancyBox-background-right: url(${args.backgroundRight});` : ``;
	const fg = args.foreground ? `\n--components-fancyBox-foreground: url(${args.foreground});` : ``;
	const style = args.backgroundLeft || args.backgroundRight || args.foreground ? `[attr.style]="'${bgLeft}${bgRight}${fg}'"` : ``;

	return `<div class="fancyBox" ${style}>
	<div class="fancyBox-content">
		<div class="fancyBox-content-box">
			${args.content}
			<div class="fancyBox-content-box-foreground"></div>
		</div>
	</div>
</div>`;
}

const Template = (args: FancyBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FancyBoxBasicStory> = {
	args: {
		content: 'Fancy box content',
		backgroundLeft: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-left-plant.svg',
		backgroundRight: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/background-right-candies.svg',
		foreground: 'https://cdn.lucca.fr/transverse/prisme/visuals/fancy-box/foreground-right-pizza.svg',
	},
	render: Template,
};
