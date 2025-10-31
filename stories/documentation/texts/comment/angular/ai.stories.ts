import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../../helpers/stories';
import { LOCALE_ID } from '@angular/core';

export default {
	title: 'Documentation/Texts/Comment/Angular/AI',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, CommentChatComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => {
		const { content } = args;

		return {
			props: {
				date: new Date(),
			},
			template: `<lu-comment-chat>
	<lu-comment-block compact [avatar]="avatarAI"${generateInputs({}, argTypes)} authorName="Assistant IA">
		<ng-template #avatarAI>
			<lu-user-picture AI />
		</ng-template>
		<lu-comment [date]="date" content="${content}" />
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
	args: {
		content: `Bonjour, comment puis-je vous accompagner aujourd’hui ?`,
	},
};
