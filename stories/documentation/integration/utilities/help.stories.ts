import { Meta, Story } from '@storybook/angular';

interface HelpStory {}

export default {
	title: 'Documentation/Integration/Utilities/Help',
} as Meta;

function getTemplate(args: HelpStory): string {
	return `
	<p>J'ai besoin d'aide <span aria-hidden="true" class="lucca-icon icon-signHelp u-help"></span><span class="u-mask">Infos supplémentaires</span></p>
	`;
}

const Template: Story<HelpStory> = (args: HelpStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		}`,
	],
});

export const Help = Template.bind({});
Help.args = {};
