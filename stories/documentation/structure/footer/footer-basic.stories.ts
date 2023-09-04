import { Meta, StoryObj } from '@storybook/angular';
import { FooterComponent } from '../../../../packages/ng/footer/footer.component';
import { HiddenArgType } from '../../../helpers/common-arg-types';

export default {
	title: 'Documentation/Structure/Footer/Basic',
	component: FooterComponent,
	argTypes: {
		sticky: {
			type: 'boolean',
		},
		content: {
			type: 'symbol',
			description: 'Optional content, can be string or a ng-template reference (see NgTemplate Content story)',
		},
		// For some reason Storybook detected an undefined input here... so we're hiding it.
		undefined: HiddenArgType,
	},
} as Meta;

export const Template: StoryObj<FooterComponent> = {
	args: {
		sticky: false,
	},
	render: (args) => {
		return {
			template: `<lu-footer ${args.sticky ? 'sticky' : ''} content="Footer content">
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outlined">Button</button>
			<button type="button" class="button mod-text">Button</button>
</lu-footer>`,
		};
	},
};
