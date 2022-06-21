import { Meta, Story } from '@storybook/angular';

interface FloatStory {}

export default {
	title: 'Documentation/Integration/Utilities/Float',
} as Meta;

function getTemplate(args: FloatStory): string {
	return `
		<div class="u-left"><code class="code">u-left</code></div>
		<div class="u-right"><code class="code">u-right</code></div>
	`;
}

const Template: Story<FloatStory> = (args: FloatStory) => ({
	props: args,
	template: getTemplate(args),
  styles: [`
		}`],
});

export const Float = Template.bind({});
Float.args = { };
