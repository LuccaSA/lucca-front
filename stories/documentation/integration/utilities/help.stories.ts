import { Meta, StoryFn } from '@storybook/angular';

interface HelpStory {}

export default {
	title: 'Documentation/Integration/Utilities/Help',
} as Meta;

function getTemplate(args: HelpStory): string {
	return `<p>J’ai besoin d’aide <span aria-hidden="true" class="lucca-icon icon-signHelp u-help"></span><span class="u-mask">?</span></p>`;
}

const Template: StoryFn<HelpStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Help = Template.bind({});
Help.args = {};
