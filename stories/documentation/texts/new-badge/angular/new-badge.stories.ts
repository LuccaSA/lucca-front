import { Meta, StoryObj } from '@storybook/angular';
import { NewBadgeComponent } from "@lucca-front/ng/new-badge";

export default {
	title: 'Documentation/Texts/NewBadge/Angular/Basic',
	component: NewBadgeComponent
} as Meta;

export const Template: StoryObj<NewBadgeComponent> = {
	args: {
		label: 'New',
	},
};
