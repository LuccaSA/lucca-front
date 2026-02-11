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
				'moodAngry',
				'moodBored',
				'moodHappy',
				'moodJoyful',
				'moodMoody',
				'moodSad',
				'moodShoked',
				'moodSly',
				'moodSmirking',
				'moodSurprised',
				'absence',
				'anniversary',
				'awardRibbon',
				'banknote',
				'battery',
				'bell',
				'binders',
				'biscuit',
				'bookmark',
				'books',
				'bronzeMedal',
				'building',
				'bulb',
				'calculator',
				'calendar',
				'camera',
				'charts',
				'chat',
				'checkmark',
				'chemistry',
				'clipboard',
				'clock',
				'coffee',
				'cup',
				'diamond',
				'equity',
				'error',
				'export',
				'file',
				'fish',
				'folder',
				'gear',
				'gift',
				'goldMedal',
				'graduate',
				'growth',
				'hearth',
				'home',
				'hourglass',
				'import',
				'invoice',
				'jigsaw',
				'link',
				'lock',
				'magnifyingGlass',
				'mail',
				'map',
				'mapPin',
				'medical',
				'megaphone',
				'mix',
				'mobile',
				'multipleReceipts',
				'newbie',
				'newsFeed',
				'office',
				'outside',
				'paint',
				'paperplane',
				'party',
				'paymentCards',
				'payslip',
				'pen',
				'percent',
				'phone',
				'picture',
				'polaroid',
				'receipt',
				'recruit',
				'reload',
				'restaurant',
				'rocket',
				'save',
				'screwdriver',
				'security',
				'silverMedal',
				'sliders',
				'speed',
				'stopwatch',
				'subjects',
				'survey',
				'target',
				'tasklist',
				'temperature',
				'thumbtack',
				'thumbUp',
				'timer',
				'trash',
				'userID',
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
