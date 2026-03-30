import { Meta, StoryObj } from '@storybook/angular';

interface LoadingsBasicStory {
	label: string;
	hiddenLabel: boolean;
	block: boolean;
	L: boolean;
	invert: boolean;
	template: string;
}

export default {
	title: 'Documentation/Loaders/Loading/HTML&CSS/Basic',
	argTypes: {
		block: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'L', truthy: false },
		},
		template: {
			options: ['', 'mod-popin', 'mod-drawer', 'mod-fullPage'],
			control: {
				type: 'select',
			},
		},
	},
} as Meta;

function getTemplate(args: LoadingsBasicStory): string {
	const block = args.block ? ` mod-block` : '';
	const L = args.L ? ` mod-L` : '';
	const invert = args.invert ? ` mod-invert` : '';
	const hiddenLabel = args.hiddenLabel ? ` mod-hiddenLabel` : '';

	return `<div class="loading${hiddenLabel}${block}${L}${invert}${args.template}">
	<span class="loading-label">${args.label}</span>
</div>
	`;
}

const Template = (args: LoadingsBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: block;
		}`,
		args.invert === true ? ':host { background-color: #333333;  }' : '',
	],
});

export const Basic: StoryObj<LoadingsBasicStory> = {
	args: { label: 'Chargement…', hiddenLabel: true, block: false, L: false, invert: false, template: '' },
	render: Template,
};
