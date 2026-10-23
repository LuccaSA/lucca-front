import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface BasicStory {}

export default {
	title: 'Documentation/Structure/BoxDisclosure/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: BasicStory): string {
	return `<details class="boxDisclosure">
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-subtitle">Subtitle</span>
		</span>
		<span class="boxDisclosure-summary-metadata">Metadata</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">Custom content</div>
</details>`;
}

const Template = (args: BasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<BasicStory> = {
	args: {},
	render: Template,
};
