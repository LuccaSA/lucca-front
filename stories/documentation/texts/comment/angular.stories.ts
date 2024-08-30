import { CommentAvatarDirective, CommentBlockComponent, CommentComponent } from '@lucca-front/ng/comment';
import { LuUserPictureModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Texts/Comment/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [CommentComponent, CommentBlockComponent, LuUserPictureModule, CommentAvatarDirective],
		}),
	],
	render: (args) => {
		const firstName = args['author'].firstName;
		const lastName = args['author'].lastName;
		const compact = args['compact'];
		const small = args['small'];
		const avatar = args['noAvatar'] ? '' : '[avatar]="avatarTpl"';
		const avatar2 = args['noAvatar'] ? '' : '[avatar]="avatarTpl2"';

		const richContent = `
			<h3>Lorem, ipsum.</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
				earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
			</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>
		`;

		return {
			props: {
				date: new Date(),
			},
			template: `
<div class="u-displayFlex u-flexDirectionColumn u-gapM">	
	<lu-comment-block ${avatar} authorName="${firstName} ${lastName}" compact="${compact}" small="${small}">
		<ng-template #avatarTpl>
			<lu-user-picture [user]="{firstName: 'Marie', lastName: 'Bragoulet'}"></lu-user-picture>
		</ng-template>
		<lu-comment [date]="date" content="${args['content']}" />
		<lu-comment [date]="date" content="Lorem ipsum dolor sit amet." />
		<lu-comment [date]="date" content="${richContent}" />
	</lu-comment-block>
	<lu-comment-block ${avatar2} authorName="Chloé Alibert" compact="${compact}" small="${small}">
		<ng-template #avatarTpl2>
			<lu-user-picture [user]="{firstName: 'Chloé', lastName: 'Alibert'}"></lu-user-picture>
		</ng-template>
		<lu-comment [date]="date" content="${args['content']}" />
	</lu-comment-block>
</div>`,
		};
	},
} as Meta;

export const Basic: StoryObj = {
	args: {
		content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus a veniam necessitatibus aut facilis repellendus provident nulla iste neque ex?`,
		noAvatar: false,
		compact: false,
		small: false,
		date: new Date(),
		author: { firstName: 'Marie', lastName: 'Bragoulet' },
	},
};
