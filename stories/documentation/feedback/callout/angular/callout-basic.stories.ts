import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CalloutComponent, CalloutFeedbackItemComponent, CalloutFeedbackListComponent } from '@lucca-front/ng/callout';
import { HiddenArgType, PaletteArgType } from 'stories/helpers/common-arg-types';
import { ButtonComponent } from '@lucca-front/ng/button';

export default {
	title: 'Documentation/Feedback/Callout/Angular/Basic',
	component: CalloutComponent,
	decorators: [
		moduleMetadata({
			imports: [CalloutFeedbackItemComponent, CalloutFeedbackListComponent, ButtonComponent],
		}),
	],
	render: (args: CalloutComponent & { description: string }) => {
		const { description, heading, palette, size, removable, icon, removed } = args;
		return {
			template: `<lu-callout heading="${heading}" palette="${palette}" size="${size}" ${removable ? 'removable ' : ''} icon="${icon}" ${removed ? 'removed' : ''}>
	${description}
</lu-callout>`,
		};
	},
	argTypes: {
		palette: PaletteArgType,
		removable: {
			description: 'Supports two-ways binding',
		},
		icon: {
			options: ['info', 'success', 'warning', 'error', 'help'],
			control: {
				type: 'select',
			},
		},
		size: {
			options: ['M', 'S'],
			control: {
				type: 'select',
			},
		},
		heading: {
			type: 'string',
		},
		description: {
			type: 'string',
		},
		removedChange: HiddenArgType,
	},
} as Meta;

export const Template: StoryObj<CalloutComponent & { description: string }> = {
	args: {
		heading: 'Feedback or informations',
		icon: 'info',
		palette: 'none',
		size: 'M',
		removable: false,
		removed: false,
		description: `Description with more details`,
	},
};
