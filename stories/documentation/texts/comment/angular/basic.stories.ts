import { LOCALE_ID } from '@angular/core';
import { COMMENT_BLOCK_SIZE, CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs, setStoryOptions } from '../../../../helpers/stories';

export default {
	title: 'Documentation/Texts/Comment/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => {
		const avatar = args['noAvatar'] ? '' : '[avatar]="avatarTpl" ';

		const { authorName, compact, small, chatAnswer, size } = args;

		const commentParams = { datePipeFormat: args['datePipeFormat'] || undefined, noInfos: args['noInfos'], plainText: args['plainText'] };

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
			template: `<lu-comment-block ${avatar} ${generateInputs(
				{
					compact,
					small,
					chatAnswer,
					size,
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
</lu-comment-block>`,
		};
	},
	argTypes: {
		content: {
			description: 'Contenu du commentaire : chaîne de caractères (le HTML est interprété), TemplateRef ou composant. Requis.',
			control: false,
			table: { category: 'inputs', type: { summary: 'PortalContent' } },
		},
		date: {
			control: { type: 'date' },
			description: 'Modifie la date du commentaire.',
			table: { category: 'inputs' },
		},
		datePipeFormat: {
			description: "[v20.3] Modifie le format de date affiché, via <a href='https://angular.dev/api/common/DatePipe' target='_blank'>Angular DatePipe</a>. Exemples : 'mediumDate', 'YYYY', etc.",
			table: { category: 'inputs' },
		},
		noInfos: {
			description: 'Masque les informations du commentaire (avatar, auteur et date).',
			table: { category: 'inputs' },
		},
		plainText: {
			description: 'Conserve les retours à la ligne d’un contenu en texte brut.',
			table: { category: 'inputs' },
		},
		authorName: {
			description: 'Nom de l’auteur des commentaires. [PortalContent]',
			table: { category: 'inputs (comment-block)' },
		},
		avatar: {
			description: 'Template de l’avatar de l’auteur (généralement un <code>lu-user-picture</code>). Sans avatar, aucun n’est affiché.',
			control: false,
			table: { category: 'inputs (comment-block)', type: { summary: 'TemplateRef' } },
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
			description: 'Réduit la taille du texte de tous les commentaires du bloc. Même rendu que <code>size="S"</code>, mais indépendant de <code>size</code>.',
			table: { category: 'inputs (comment-block)' },
		},
		size: {
			options: setStoryOptions(COMMENT_BLOCK_SIZE),
			control: { type: 'select' },
			description: 'Modifie la taille des commentaires du bloc. Par défaut : taille M.',
			table: { category: 'inputs (comment-block)' },
		},
		chatAnswer: {
			description: 'Affiche le bloc comme une réponse dans un <code>lu-comment-chat</code>.',
			table: { category: 'inputs (comment-block)' },
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		date: new Date(),
		datePipeFormat: '',
		noInfos: false,
		plainText: false,
		authorName: 'Marie Bragoulet',
		noAvatar: false,
		compact: false,
		small: false,
		size: '',
		chatAnswer: false,
	},
};
