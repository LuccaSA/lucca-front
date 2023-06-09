import { Meta, Story } from '@storybook/angular';

interface FloatStory {}

export default {
	title: 'Documentation/Integration/Utilities/Float',
} as Meta;

function getTemplate(args: FloatStory): string {
	return `
		<div class="u-floatLeft"><code class="code">u-floatLeft</code></div>
		<div class="u-floatRight"><code class="code">u-floatRight</code></div>
	`;
}

const Template: Story<FloatStory> = (args: FloatStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		}`,
	],
});

export const Float = Template.bind({});
Float.args = {};
