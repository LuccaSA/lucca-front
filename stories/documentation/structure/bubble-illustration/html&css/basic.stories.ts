import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface BubbleIllustrationBasicStory {
	illustration: string;
	palette: string;
	size: string;
	action: boolean;
}

export default {
	title: 'Documentation/Structure/Bubble illustration/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {
		illustration: {
			options: [
				'mood-angry',
				'mood-bored',
				'mood-happy',
				'mood-joyful',
				'mood-moody',
				'mood-sad',
				'mood-shoked',
				'mood-sly',
				'mood-smirking',
				'mood-surprised',
				'absence',
				'anniversary',
				'annual-rem',
				'bell',
				'bill',
				'bills',
				'bookmark',
				'books',
				'bronze',
				'building',
				'bulb',
				'calculate',
				'camera',
				'cash',
				'charts',
				'chats',
				'check',
				'chemistry',
				'clock',
				'coffee',
				'cog',
				'cup',
				'cursor',
				'diamond',
				'diversity',
				'enquete',
				'export',
				'file-2',
				'file',
				'folders',
				'gift',
				'gold',
				'growth',
				'hearth',
				'hold',
				'hourglass',
				'import',
				'link',
				'lock',
				'magnifying-glass',
				'mail',
				'marseille',
				'medical',
				'mix',
				'mobile',
				'mood',
				'nantes',
				'newbies',
				'news-feed',
				'office',
				'outside',
				'paint',
				'paper-plane',
				'paris',
				'payment-cards',
				'payslip-2',
				'payslip',
				'pen',
				'percent',
				'phone',
				'picture',
				'pin',
				'pola',
				'power',
				'puzzle',
				'recruit',
				'reload',
				'remote-work',
				'remuneration',
				'restaurant',
				'rocket',
				'save',
				'security',
				'silver',
				'sound',
				'speed',
				'stop-watch',
				'subjects',
				'tada',
				'target',
				'task',
				'thumb-up',
				'thumbtack',
				'timer',
				'tool',
				'training',
				'trash',
				'user-file',
				'user',
				'video',
				'warning',
				'widget',
			],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['S', '', 'L'],
			control: {
				type: 'select',
			},
		},
		palette: {
			options: [
				// products
				'product',
				'pagga',
				'poplee',
				'coreHR',
				'timmi',
				'cleemy',
				'cc',
				'brand',
				// states
				'neutral',
				'success',
				'warning',
				'critical',
				// decoratives
				'kiwi',
				'lime',
				'cucumber',
				'mint',
				'glacier',
				'lagoon',
				'blueberry',
				'lavender',
				'grape',
				'watermelon',
				'pumpkin',
				'pineapple',
			],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: BubbleIllustrationBasicStory): string {
	const palette = args.palette === 'product' ? `` : ` palette-${args.palette}`;
	const size = args.size === '' ? `` : ` mod-${args.size}`;
	const action = args.action ? ` mod-action` : ``;
	const domain = 'https://cdn.lucca.fr';
	const path = '/transverse/prisme/visuals/bubble-illustration/';
	const extension = '.svg';
	return `<div class="bubbleIllustration${palette}${size}${action}" aria-hidden="true" [innerHtml]="'${domain}${path}${args.illustration}${extension}' | luSafeExternalSvg"></div>`;
}

const Template = (args: BubbleIllustrationBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BubbleIllustrationBasicStory> = {
	args: {
		illustration: 'anniversary',
		palette: 'product',
		size: '',
		action: false,
	},
	render: Template,
};
