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
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
	<button class="button mod-outline mod-S" type="button">button</button>
</lu-scroll-box>`;
}

const Template: StoryFn<ScrollBoxBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
