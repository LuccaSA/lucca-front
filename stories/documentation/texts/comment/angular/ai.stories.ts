import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../../helpers/stories';

export default {
	title: 'Documentation/Texts/Comment/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, CommentChatComponent],
		}),
	],
	render: ({ argTypes }) => {
		return {
			props: {
				date: new Date(),
			},
			template: `<lu-comment-chat>
	<lu-comment-block compact [avatar]="avatarAI"${generateInputs({}, argTypes)} authorName="Assistant IA">
		<ng-template #avatarAI>
			<lu-user-picture AI />
		</ng-template>
		<lu-comment [date]="date" content="Bonjour, comment puis-je vous accompagner aujourd’hui ?" />
	</lu-comment-block>
	<lu-comment-block chatAnswer compact [avatar]="avatarTpl"${generateInputs({}, argTypes)} authorName="Chloé Alibert">
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{firstName: 'Chloé', lastName: 'Alibert'}" />
		</ng-template>
		<lu-comment [date]="date" content="Lorem ipsum dolor sit amet…" />
	</lu-comment-block>
</lu-comment-chat>`,
		};
	},
} as Meta;

export const Chat: StoryObj = {
	args: {},
};
