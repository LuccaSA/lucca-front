import { LoadingComponent } from '@lucca-front/ng/loading';
import { Meta, moduleMetadata } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface LoadingsBasicStory {
	label: string;
	hiddenLabel: boolean;
	L: boolean;
	block: boolean;
	invert: boolean;
	template: string;
}

export default {
	title: 'Documentation/Loaders/Loading/Angular/Basic',
	argTypes: {
		block: {
			if: { arg: 'L', truthy: false },
		},
		template: {
			options: ['', 'popin', 'drawer', 'fullPage'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [LoadingComponent],
		}),
	],
	render: (args: LoadingsBasicStory) => {
		const lParam = args.L ? ` size="L"` : ``;
		const blockParam = args.block ? ` block` : ``;
		const invertParam = args.invert ? ` invert` : ``;
		const hiddenLabelParam = args.hiddenLabel ? ` hiddenLabel` : ``;
		const templateParam = args.template ? ` template="${args.template}"` : ``;
		if (args.label) {
			return {
				template: cleanupTemplate(`<lu-loading${lParam}${hiddenLabelParam}${invertParam}${blockParam}${templateParam}>${args.label}</lu-loading>`),
			};
		} else {
			return {
				template: cleanupTemplate(`<lu-loading${lParam}${invertParam}${blockParam}${templateParam} />`),
			};
		}
	},
} as Meta;

export const Basic = {
	args: {
		label: 'Chargement…',
		hiddenLabel: true,
		L: false,
		block: false,
		invert: false,
		template: '',
	},
};
