import { Meta, StoryFn } from '@storybook/angular';

interface SpinStory {}

export default {
	title: 'Documentation/Integration/Utilities/Spin',
} as Meta;

function getTemplate(args: SpinStory): string {
	return `<label class="textfield">
	<input class="textfield-input" type="number" placeholder="Avec spin" />
</label>
<label class="textfield">
	<input class="textfield-input pr-u-noSpinButtons" type="number" placeholder="Sans spin" />
</label>`;
}

const Template: StoryFn<SpinStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.textfield {
			float: inline-start;
			margin-inline-end: 1rem;
		}
		}`,
	],
});

export const Spin = Template.bind({});
Spin.args = {};
