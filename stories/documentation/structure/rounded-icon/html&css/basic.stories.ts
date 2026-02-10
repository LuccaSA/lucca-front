import { IconsList } from '@/stories/icons-list';
import { Meta, StoryObj } from '@storybook/angular';

interface RoundedIconBasicStory {
	icon: string;
	alt: string;
	size: string;
	palette: string;
}

export default {
	title: 'Documentation/Structure/Rounded icon/HTML&CSS/Basic',
	argTypes: {
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
		icon: {
			options: IconsList.filter((i) => !i.deprecated).map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: RoundedIconBasicStory): string {
	const altTpl = args.alt
		? `
		<span class="pr-u-mask">${args.alt}</span>`
		: ``;
	const paletteClass = args.palette !== 'product' ? ` palette-${args.palette}` : ``;
	const sizeClasse = args.size !== '' ? ` mod-${args.size}` : ``;
	return `<div class="roundedIcon${sizeClasse}${paletteClass}">
	<span aria-hidden="true" class="class="roundedIcon-icon" lucca-icon icon-${args.icon}"></span>${altTpl}
</div>`;
}

const Template = (args: RoundedIconBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<RoundedIconBasicStory> = {
	args: {
		icon: 'app',
		palette: 'product',
		size: '',
		alt: '',
	},
	render: Template,
};
