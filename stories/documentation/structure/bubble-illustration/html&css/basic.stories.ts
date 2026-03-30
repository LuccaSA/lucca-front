import { HttpClientModule } from '@angular/common/http';
import { BUBBLE_ILLUSTRATION_SIZE, BubbleIllustrationList } from '@lucca-front/ng/bubble-illustration';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { setStoryOptions } from 'stories/helpers/stories';

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
			options: setStoryOptions(BubbleIllustrationList),
			control: {
				type: 'select',
			},
			description: "Modifie l'illustration.",
		},
		size: {
			options: setStoryOptions(BUBBLE_ILLUSTRATION_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
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
			description: 'Applique une palette de couleurs au composant.',
		},
		action: {
			description: "Ajoute une icône d'action (+) à l'illustration.",
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
