import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BubbleIconStory {}

export default {
	title: 'Documentation/Structure/Box/HTML&CSS/Bubble icon',
	decorators: [
		moduleMetadata({
			imports: [BubbleIconComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: BubbleIconStory): string {
	return `<div class="box">
	<div class="box-header">
		<lu-bubble-icon icon="fileCopy" />
		<div class="box-header-text">
			<div role="heading" aria-level="3" class="box-header-title">Title</div>
			<p class="box-header-subtitle">Subtitle</p>
		</div>
	</div>
	<div class="box-slot">Custom content</div>
</div>`;
}

const Template = (args: BubbleIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const BubbleIcon: StoryObj<BubbleIconStory> = {
	args: {},
	render: Template,
};
