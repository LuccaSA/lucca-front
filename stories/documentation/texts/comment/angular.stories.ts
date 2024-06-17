import { Meta, StoryObj } from '@storybook/angular';
import { CommentComponent } from '@lucca-front/ng/comment';

export default {
	title: 'Documentation/Texts/Comment/Angular/Basic',
	component: CommentComponent,
	argTypes: {},
} as Meta;

export const Basic: StoryObj = {
	args: {
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?`,
		title: 'Commentaire simple',
		noAvatar: false,
		date: new Date(),
		dateDisplay: 'Lun. 4 janv. à 16:50 (custom display)',
		author: { firstName: 'Marie', lastName: 'Bragoulet' },
	},
};
