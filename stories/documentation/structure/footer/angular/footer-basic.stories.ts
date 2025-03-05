import { FooterComponent } from '@lucca-front/ng/footer';
import { Meta, moduleMetadata } from '@storybook/angular';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Structure/Footer/Angular/Basic',
	argTypes: {
		narrowAtMediaMax: {
			options: ['XXS', 'XS', 'S', 'M'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FooterComponent],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			template: `
<lu-footer ${generateInputs(args, argTypes)}>
	Content
	<ng-container footerActions>
		<button type="button" class="button">Button</button>
    <button type="button" class="button mod-outlined">Button</button>
	</ng-container>
</lu-footer>
			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		sticky: false,
		container: false,
		forceNarrow: false,
		narrowAtMediaMax: 'XXS',
	},
};
