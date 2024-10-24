import { CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { CommentChatComponent } from 'packages/ng/comment/comment-chat/comment-chat.component';
import { generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Texts/Comment/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, CommentChatComponent],
		}),
	],
	render: (args, { argTypes }) => {
		const avatar = args['noAvatar'] ? '' : '[avatar]="avatarTpl" ';
		const avatar2 = args['noAvatar'] ? '' : '[avatar]="avatarTpl2" ';

		const { firstName, lastName, compact, small, content } = args;

		const richContent = `<h3>Lorem, ipsum.</h3>
<p>
	Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
	earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
</p>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>
		`;

		if (args['chat']) {
			return {
				props: {
					date: new Date(),
				},
				template: `<lu-comment-chat>
	<lu-comment-block ${avatar} ${generateInputs(
		{
			compact,
			small,
		},
		argTypes,
	)} authorName="${firstName} ${lastName}">
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}"></lu-user-picture>
		</ng-template>
		<lu-comment [date]="date" content="${content}" />
		<lu-comment [date]="date" content="Lorem ipsum dolor sit amet." />
		<lu-comment [date]="date" content="${richContent}" />
	</lu-comment-block>
	<lu-comment-block [chatAnswer]="true" ${avatar2} ${generateInputs({ compact, small }, argTypes)} authorName="Chloé Alibert">
		<ng-template #avatarTpl2>
			<lu-user-picture [user]="{firstName: 'Chloé', lastName: 'Alibert'}"></lu-user-picture>
		</ng-template>
		<lu-comment [date]="date" content="${content}" />
	</lu-comment-block>
</lu-comment-chat>
	`,
			};
		} else {
			return {
				props: {
					date: new Date(),
				},
				template: `<lu-comment-block ${avatar} ${generateInputs(
					{
						compact,
						small,
					},
					argTypes,
				)} authorName="${firstName} ${lastName}">
	<ng-template #avatarTpl>
		<lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}"></lu-user-picture>
	</ng-template>
	<lu-comment [date]="date" content="${content}" />
	<lu-comment [date]="date" content="Lorem ipsum dolor sit amet." />
	<lu-comment [date]="date" content="${richContent}" />
</lu-comment-block>
	`,
			};
		}
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?`,
		noAvatar: false,
		compact: false,
		small: false,
		date: new Date(),
		firstName: 'Marie',
		lastName: 'Bragoulet',
		chat: false,
	},
};
