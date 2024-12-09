import { Meta, StoryFn } from '@storybook/angular';

interface SampleBasicStory {}

export default {
	title: 'Documentation/Sample/HTML&CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: SampleBasicStory): string {
	return `<div class="sample">
	sample
</div>`;
}

const Template: StoryFn<SampleBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
