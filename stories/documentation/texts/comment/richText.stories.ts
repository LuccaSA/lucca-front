import { Meta, StoryFn } from '@storybook/angular';

interface CommentRichTextStory {}

export default {
	title: 'Documentation/Texts/Comment/HTML&CSS/RichText',
	argTypes: {},
} as Meta;

function getTemplate(args: CommentRichTextStory): string {
	return `<div class="comment">
	<div class="comment-infos">
		<div class="avatar"></div>
		<div class="comment-infos-content">
			<span class="comment-infos-name">Marie Bragoulet</span>
			<span class="comment-infos-date">lun. 4 janv. à 16:50</span>
		</div>
	</div>
	<blockquote class="comment-content">
		<div class="comment-content-textContainer">
			<h3>Lorem, ipsum.</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. <strong>Facilis voluptates ex</strong> qui iste libero suscipit cum
				earum harum animi praesentium, quidem non incidunt vel illum sunt nihil reprehenderit a itaque.
			</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque numquam itaque at facilis iusto inventore.</p>
		</div>
	</blockquote>
</div>`;
}

const Template: StoryFn<CommentRichTextStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.avatar {
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			background: red;
		}`,
	],
});

export const RichText = Template.bind({});
RichText.args = {};
