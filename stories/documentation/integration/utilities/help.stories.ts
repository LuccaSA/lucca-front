import { Meta, StoryObj } from '@storybook/angular';

interface HelpStory {}

export default {
	title: 'Documentation/Integration/Utilities/Help',
} as Meta;

function getTemplate(args: HelpStory): string {
	return `<p>J’ai besoin d’aide <span aria-hidden="true" class="lucca-icon icon-signHelp pr-u-help"></span><span class="pr-u-mask">?</span></p>`;
}

const Template = (args: HelpStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Help: StoryObj<HelpStory> = {
	args: {},
	render: Template,
};
