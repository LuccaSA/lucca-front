import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent],
		}),
	],
	render: (args: CalloutComponent & { description: string }, context) => {
		const { palette, description, ...inputs } = args;
		const paletteArg = palette !== 'none' ? ` palette="${palette}"` : ``;
		return {
			template: `<lu-callout${paletteArg}${generateInputs(inputs, context.argTypes)}>
	${description}
	<div class="callout-content-description-actions">
		<button class="button mod-outlined" type="button">Associer</button>
		<button class="button mod-ghost" type="button">Non merci</button>
	</div>
</lu-callout>`,
		};
	},
	argTypes: {
		removable: {
			description: 'Supports two-ways binding',
		},
		palette: {
			options: ['none', 'product', 'neutral', 'success', 'warning', 'error', 'ia'],
			control: {
				type: 'select',
			},
		},
		icon: {
			options: [null, 'signInfo', 'signSuccess', 'signWarning', 'signError', 'signHelp', 'weatherStars', 'officePenStar'],
			control: {
				type: 'select',
			},
		},
		state: {
			options: [null, 'success', 'warning', 'error'],
			description: 'Shortcut to control both icon and palette',
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'radio',
			},
		},
		heading: {
			type: 'string',
			description: 'Optional',
		},
		description: {
			type: 'string',
			description: 'Required',
		},
		removedChange: HiddenArgType,
	},
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		heading: '',
		state: null,
		icon: null,
		description: `Description with more details`,
		palette: 'none',
		removable: false,
		removed: false,
	},
};
