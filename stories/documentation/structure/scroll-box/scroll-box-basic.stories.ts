import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface ScrollBoxBasicStory {}

export default {
	title: 'Documentation/Structure/ScrollBox',
	decorators: [
		moduleMetadata({
			imports: [ScrollBoxComponent],
		}),
	],
} as Meta;

function getTemplate(args: ScrollBoxBasicStory): string {
	return `<lu-scroll-box>
	<div class="content">0</div>
	<div class="content">1</div>
	<div class="content">2</div>
	<div class="content">3</div>
	<div class="content">4</div>
	<div class="content">5</div>
	<div class="content">6</div>
	<div class="content">7</div>
	<div class="content">8</div>
	<div class="content">9</div>
</lu-scroll-box>`;
}

const Template: StoryFn<ScrollBoxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.content {
			width: 5rem;
			flex-shrink: 0;
			margin-block: 1rem;
		}	
	`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
