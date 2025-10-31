import { CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { generateInputs } from '../../../../helpers/stories';
import { LOCALE_ID } from '@angular/core';

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

		const { firstName, lastName, compact, small, content } = args;

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
	<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="${content}" />
	<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="Lorem ipsum dolor sit amet." />
	<lu-comment [date]="date"${generateInputs(commentParams, argTypes)} content="${richContent}" />
</lu-comment-block>`,
		};
	},
	argTypes: {
		compact: {
			description: "N'affiche l'auteur que sur le premier commentaire de <code><lu-comment-block></code>",
		},
		datePipeFormat: {
			description: "[v20.3]<br><a href='https://angular.dev/api/common/DatePipe' target='_blank'>Angular DatePipe</a>.<br>Exemples : 'mediumDate', 'YYYY', etc.",
		},
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?`,
		noAvatar: false,
		compact: false,
		small: false,
		date: new Date(),
		datePipeFormat: '',
		firstName: 'Marie',
		lastName: 'Bragoulet',
	},
};
