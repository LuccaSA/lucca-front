import { provideRouter } from '@angular/router';
import { IconsList } from '@lucca-front/icons/icons-list';
import { TagComponent } from '@lucca-front/ng/tag';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { HiddenArgType, PaletteAllArgType } from 'stories/helpers/common-arg-types';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/Texts/Tags/Angular/Basic',
	component: TagComponent,
	decorators: [
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
	render: (args, context) => {
		return {
			template: `<lu-tag ${generateInputs(args, context.argTypes)}></lu-tag>`,
		};
	},
} as Meta;

export const Template: StoryObj<TagComponent> = {
	argTypes: {
		label: {
			type: 'string',
		},
		size: {
			options: ['M', 'L'],
			control: {
				type: 'select',
			},
		},
		palette: PaletteAllArgType,
		outlined: {
			control: {
				type: 'boolean',
			},
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
		},
		link: HiddenArgType,
	},

	args: {
		label: 'Text',
		palette: null,
		outlined: false,
		icon: null,
	},
};
