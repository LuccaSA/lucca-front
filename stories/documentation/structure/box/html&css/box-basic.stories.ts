import { Meta, StoryObj } from '@storybook/angular-vite';

interface BasicStory {}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<div class="box">
	<div class="box-header">
		<div class="box-header-text">
			<div class="box-header-text-heading" role="heading" aria-level="2">Title</div>
			<p class="box-header-text-subheading">Subheading</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
</div>`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: {},
	render: Template,
};
