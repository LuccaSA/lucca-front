import { CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../../helpers/stories';
import { LOCALE_ID } from '@angular/core';
import { LuHumanizeDatePipe } from '@lucca-front/ng/date';
import { AsyncPipe } from '@angular/common';

export default {
	title: 'Documentation/Texts/Comment/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, LuHumanizeDatePipe, AsyncPipe],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => {
		const avatar = args['noAvatar'] ? '' : '[avatar]="avatarTpl" ';
		const heading = args['withCustomHeading'] ? `[heading]="headingTemplate" ` : '[date]="date" ';

		const { firstName, lastName, compact, small } = args;

		const commentParams = { datePipeFormat: args['datePipeFormat'] || undefined };

		const richContent = `<h3>Lorem, ipsum.</h3>
	<p>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
		earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
	</p>
	<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>`;

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
		<lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}" />
	</ng-template>
	<ng-template #headingTemplate>
	  {{ date | luHumanizeDate | async }} (edited)
	</ng-template>
	<lu-comment ${heading} ${generateInputs(commentParams, argTypes)} content="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?" />
	<lu-comment ${heading} ${generateInputs(commentParams, argTypes)} content="Lorem ipsum dolor sit amet." />
	<lu-comment ${heading} ${generateInputs(commentParams, argTypes)} content="${richContent}" />
</lu-comment-block>`,
		};
	},
	argTypes: {
		noAvatar: {
			description: "Masque l'avatar.",
		},
		compact: {
			description: "N'affiche l'auteur que sur le premier commentaire de <code><lu-comment-block></code>",
		},
		small: {
			description: 'Modifie la taille du composant.',
		},
		date: {
			description: 'Modifie la date du commentaire.',
		},
		withCustomHeading: {
			description: `Template personalisée pour l'affichage de l'en-tête.`,
			type: 'boolean',
		},
		datePipeFormat: {
			description: "[v20.3] Modifie le format de date affiché, via <a href='https://angular.dev/api/common/DatePipe' target='_blank'>Angular DatePipe</a>. Exemples : 'mediumDate', 'YYYY', etc.",
		},
		firstName: {
			description: "Modifie le prénom de l'auteur.",
		},
		lastName: {
			description: "Modifie le nom de l'auteur.",
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		noAvatar: false,
		compact: false,
		small: false,
		date: new Date(),
		datePipeFormat: '',
		withCustomHeading: false,
		firstName: 'Marie',
		lastName: 'Bragoulet',
	},
};
