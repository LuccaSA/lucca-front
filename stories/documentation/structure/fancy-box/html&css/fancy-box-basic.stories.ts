import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
		},
		backgroundRight: {
			control: {
				type: 'text',
			},
		},
		foreground: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

function getTemplate(args: FancyBoxBasicStory): string {
	const bgLeft = args.backgroundLeft ? `\n--components-fancyBox-background-left: url(${args.backgroundLeft});` : ``;
	const bgRight = args.backgroundRight ? `\n--components-fancyBox-background-right: url(${args.backgroundRight});` : ``;
	const fg = args.foreground ? `\n--components-fancyBox-foreground: url(${args.foreground});` : ``;
	const style = args.backgroundLeft || args.backgroundRight || args.foreground ? `[attr.style]="'${bgLeft}${bgRight}${fg}'"` : ``;
	const divForeground = args.foreground ? `<div class="fancyBox-content-box-foreground"></div>` : ``;

	return `
	<div class="fancyBox" ${style}>
		<div class="fancyBox-content">
			<div class="fancyBox-content-box">
				${args.content}
				${divForeground}
			</div>
		</div>
	</div>
	`;
}

const Template: StoryFn<FancyBoxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	content: 'Lorem ipsum dolor sit amet.<br />Lorem ipsum dolor sit amet.<br />Lorem ipsum dolor sit amet.<br />Lorem ipsum dolor sit amet.',
	backgroundLeft: '',
	backgroundRight: '',
	foreground: '',
};
