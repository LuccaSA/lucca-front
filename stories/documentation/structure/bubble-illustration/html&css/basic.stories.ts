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
			options: ['absence', 'anniversary'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['XS', 'S', '', 'L'],
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
	return `<div class="bubbleIllustration${palette}${size}${action}" aria-hidden="true" [innerHtml]="'https://tmp.vincent-valentin.name/lucca/bubble-illustrations/${args.illustration}.svg' | luSafeExternalSvg"></div>`;
}

const Template = (args: BubbleIllustrationBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BubbleIllustrationBasicStory> = {
	args: {
		illustration: 'absence',
		palette: 'product',
		size: '',
		action: false,
	},
	render: Template,
};
