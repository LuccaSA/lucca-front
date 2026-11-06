import { LOCALE_ID } from '@angular/core';
import { CommentBlockComponent, CommentChatComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs } from '../../../../helpers/stories';

export default {
	title: 'Documentation/Texts/Comment/Angular/Chat',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, CommentChatComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => {
		const avatar = args['noAvatar'] ? '' : '[avatar]="avatarTpl" ';
		const avatar2 = args['noAvatar'] ? '' : '[avatar]="avatarTpl2" ';

		const { authorName, compact, small } = args;

		const commentParams = { datePipeFormat: args['datePipeFormat'] || undefined };

		const richContent = `<h3>Lorem, ipsum.</h3>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
		earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
	</p>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>`;

		return {
			props: {
				// The Storybook date control emits a timestamp
				date: args['date'] ? new Date(args['date']) : new Date(),
			},
			template: `<lu-comment-chat>
<lu-comment-block ${avatar} ${generateInputs(
				{
					compact,
					small,
					authorName,
				},
				argTypes,
			)}>
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" />
		</ng-template>
		<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?" />
		<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="Lorem ipsum dolor sit amet." />
		<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="${richContent}" />
	</lu-comment-block>
	<lu-comment-block [chatAnswer]="true" ${avatar2} ${generateInputs({ compact, small }, argTypes)} authorName="Chloé Alibert">
		<ng-template #avatarTpl2>
			<lu-user-picture [user]="{firstName: 'Chloé', lastName: 'Alibert'}" />
		</ng-template>
		<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?" />
	</lu-comment-block>
</lu-comment-chat>`,
		};
	},
	argTypes: {
		date: {
			control: { type: 'date' },
			description: 'Modifie la date du commentaire.',
			table: { category: 'inputs' },
		},
		datePipeFormat: {
			description: "[v20.3] Modifie le format de date affiché, via <a href='https://angular.dev/api/common/DatePipe' target='_blank'>Angular DatePipe</a>. Exemples : 'mediumDate', 'YYYY', etc.",
			table: { category: 'inputs' },
		},
		authorName: {
			description: 'Nom de l’auteur des commentaires du premier bloc. [PortalContent]',
			table: { category: 'inputs (comment-block)' },
		},
		noAvatar: {
			description: 'Masque l’avatar en ne renseignant pas l’input <code>avatar</code>.',
			table: { category: 'story' },
		},
		compact: {
			description: 'N’affiche l’auteur que sur le premier commentaire de <code><lu-comment-block></code>',
			table: { category: 'inputs (comment-block)' },
		},
		small: {
			description: 'Réduit la taille du texte de tous les commentaires du bloc.',
			table: { category: 'inputs (comment-block)' },
		},
	},
} as Meta;

export const Chat: StoryObj = {
	args: {
		date: new Date(),
		datePipeFormat: '',
		authorName: 'Marie Bragoulet',
		noAvatar: false,
		compact: false,
		small: false,
	},
};
