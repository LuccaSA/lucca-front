import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutActionsComponent, CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent, CalloutActionsComponent, IconComponent],
		}),
	],
	render: (args: CalloutComponent & { description: string; actions: boolean; actionsInline: boolean }, context) => {
		const { palette, description, heading, actions, actionsInline, ...inputs } = args;
		const paletteArg = palette !== 'none' && palette !== undefined ? ` palette="${palette}"` : ``;
		const headingArg = heading ? ` heading="${heading}"` : ``;

		const actionsInlineArg = actionsInline ? ` inline` : ``;
		const actionsTemplate = actions
			? `<lu-callout-actions${actionsInlineArg}>
		<button luButton="outlined">Action</button>
		<button luButton="ghost">Action</button>
	</lu-callout-actions>`
			: ``;

		return {
			template: `<lu-callout${headingArg}${paletteArg}${generateInputs(inputs, context.argTypes)}>
	${description}
	${actionsTemplate}
</lu-callout>`,
		};
	},
	argTypes: {
		removable: {
			description: 'Supports two-ways binding',
		},
		palette: {
			options: ['none', 'product', 'neutral', 'success', 'warning', 'error'],
			control: {
				type: 'select',
			},
			if: { arg: 'AI', truthy: false },
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

export const Template: StoryObj<CalloutComponent & { description: string; actions: boolean; actionsInline: boolean }> = {
	args: {
		heading: '',
		state: null,
		icon: null,
		description: `Description with more details`,
		palette: 'none',
		removable: false,
		removed: false,
		AI: false,
		actions: false,
		actionsInline: false,
	},
};
