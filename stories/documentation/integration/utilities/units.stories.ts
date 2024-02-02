import { Meta, StoryFn } from '@storybook/angular';

interface UnitsStory {}

export default {
	title: 'Documentation/Integration/Utilities/Units',
} as Meta;

function getTemplate(args: UnitsStory): string {
	return `<h1>75 <span class="u-unit">%</span></h1>
<h2>75 <span class="u-unit">%</span></h2>
<p>75 <span class="u-unit">%</span></p>`;
}

const Template: StoryFn<UnitsStory> = (args: UnitsStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		* {
			margin: 0;
			padding: 0;
		}
		}`,
	],
});

export const Units = Template.bind({});
Units.args = {};
