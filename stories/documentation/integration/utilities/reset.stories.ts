import { Meta, StoryFn } from '@storybook/angular';

interface ResetStory {}

export default {
	title: 'Documentation/Integration/Utilities/Reset',
} as Meta;

function getTemplate(args: ResetStory): string {
	return `
		<button>Bouton sans reset</button>
		<button class="u-buttonReset">Bouton avec reset</button>
    <ul>
      <li>Liste sans reset</li>
      <li>Liste sans reset</li>
      <li>Liste sans reset</li>
    </ul>
    <ul class="u-listReset">
      <li>Liste avec reset</li>
      <li>Liste avec reset</li>
      <li>Liste avec reset</li>
    </ul>
	`;
}

const Template: StoryFn<ResetStory> = (args: ResetStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		}`,
	],
});

export const Reset = Template.bind({});
Reset.args = {};
