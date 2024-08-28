import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommentBlockComponent, CommentComponent, CommentAvatarDirective } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';

export default {
	title: 'Documentation/Texts/Comment/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, CommentAvatarDirective],
		}),
	],
	render: (args, context) => {
		return {
			props: {
				date: new Date(),
			},
			template: `<lu-comment-block authorName="Marie bragoulet">
	<lu-comment-avatar>
		<lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}"></lu-user-picture>
	</lu-comment-avatar>
	<lu-comment [date]="date">
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident
			nulla iste neque ex?
	</lu-comment>
	<lu-comment [date]="date">
		Lorem ipsum dolor sit amet
	</lu-comment>
	<lu-comment [date]="date">
		<h3>Lorem, ipsum.</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
				earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
			</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>
	</lu-comment>
</lu-comment-block>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?`,
		title: 'Commentaire simple',
		noAvatar: false,
		date: new Date(),
		author: { firstName: 'Marie', lastName: 'Bragoulet' },
	},
};
