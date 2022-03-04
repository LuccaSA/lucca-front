import { Meta, Story } from '@storybook/angular';

interface LinkBasicStory {
}

export default {
	title: 'SCSS/Link/Basic',
} as Meta;

function getTemplate(args: LinkBasicStory): string {
	return `
	<a href="#" class="link">Lien</a>
	`
}

const Template: Story<LinkBasicStory> = (args: LinkBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
