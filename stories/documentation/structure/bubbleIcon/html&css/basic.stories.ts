import { IconsList } from '@/stories/icons-list';
import { Meta, StoryObj } from '@storybook/angular';

interface BubbleIconBasicStory {
	icon: string;
	direction: string;
	alt: string;
	size: string;
	palette: string;
}

export default {
	title: 'Documentation/Structure/Bubble icon/HTML&CSS/Basic',
	argTypes: {
		direction: {
			options: ['left', 'right', 'top', 'bottom'],
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
		icon: {
			options: IconsList.filter((i) => !i.deprecated).map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: BubbleIconBasicStory): string {
	const altTpl = args.alt
		? `
		<span class="pr-u-mask">${args.alt}</span>`
		: ``;
	const paletteClass = args.palette !== 'product' ? ` palette-${args.palette}` : ``;
	const sizeClasse = args.size !== '' ? ` mod-${args.size}` : ``;
	return `<div class="bubbleIcon${sizeClasse}${paletteClass} mod-${args.direction}">
	<svg class="bubbleIcon-bubble" xmlns="http://www.w3.org/2000/svg" fill="none" width="40" height="40" viewBox="0 0 40 40">
		<path
			class="bubbleIcon-bubble-pathInline"
			d="M8.02234 5.62248C18.6681.122 39.722-6.44995 39.9931 13.4051c.146 10.9657-1.8566 32.8782-21.3314 24.8746C-1.892 29.8346-5.51213 12.491 8.02234 5.62248"
		/>
		<path
			class="bubbleIcon-bubble-pathBlock"
			d="M2.25264 16.3895C8.11117 6.4042 21.9332-9.59108 32.4637 7.57789c5.8129 9.48391 15.5505 29.55471-4.5465 32.07901C6.70786 42.3228-5.2602 28.9757 2.25264 16.3895"
		/>
	</svg>
	<span class="bubbleIcon-icon">
		<span aria-hidden="true" class="lucca-icon icon-${args.icon}"></span>${altTpl}
	</span>
</div>`;
}

const Template = (args: BubbleIconBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BubbleIconBasicStory> = {
	args: {
		icon: 'app',
		direction: 'left',
		palette: 'product',
		size: '',
		alt: '',
	},
	render: Template,
};
