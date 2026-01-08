import { HttpClientModule } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface BubbleMoodBasicStory {
	mood: string;
	palette: string;
	size: string;
}

export default {
	title: 'Documentation/Structure/Bubble mood/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, HttpClientModule],
		}),
	],
	argTypes: {
		mood: {
			options: ['angry', 'bored', 'happy', 'joyful', 'moody', 'sad', 'shoked', 'sly', 'smirking', 'surprised'],
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

function getTemplate(args: BubbleMoodBasicStory): string {
	const palette = args.palette === 'product' ? `` : ` palette-${args.palette}`;
	const size = args.size === '' ? `` : ` mod-${args.size}`;
	return `<div class="bubbleMood${palette}${size}" aria-hidden="true" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/bubble-mood/${args.mood}.svg' | luSafeExternalSvg"></div>`;
}

const Template = (args: BubbleMoodBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BubbleMoodBasicStory> = {
	args: {
		mood: 'angry',
		palette: 'product',
		size: '',
	},
	render: Template,
};
