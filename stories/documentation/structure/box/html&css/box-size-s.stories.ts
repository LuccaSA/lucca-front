import { Meta, StoryObj } from '@storybook/angular-vite';

interface SizeSStory {}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Size S',
	argTypes: {},
} as Meta;

function getTemplate(args: SizeSStory): string {
	return `<div class="box mod-S">
	<div class="box-header">
		<div class="box-header-text">
			<div class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
</div>`;
}

const Template = (args: SizeSStory) => ({
	props: args,
	template: getTemplate(args),
});

export const SizeS: StoryObj<SizeSStory> = {
	args: {},
	render: Template,
};
