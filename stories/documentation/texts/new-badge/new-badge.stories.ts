import { Meta, StoryObj } from '@storybook/angular';
import { NewBadgeComponent } from '../../../../packages/ng/new-badge/new-badge.component';

export default {
	title: 'Documentation/Texts/NewBadge/Basic',
	component: NewBadgeComponent
} as Meta;

export const Template: StoryObj<NewBadgeComponent> = {
	args: {
		label: 'New',
	},
};
