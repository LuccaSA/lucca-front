import { Meta, Story } from '@storybook/angular';

interface TableOfContentBasicStory {
}

export default {
	title: 'Documentation/Navigation/TableOfContent/Basic',
} as Meta;

function getTemplate(args: TableOfContentBasicStory): string {
	return `
	<nav class="tableOfContent">
		<a href="#" class="tableOfContent-item is-active">Section 1</a>
		<a href="#" class="tableOfContent-item">Section 2</a>
		<a href="#" class="tableOfContent-item">Section 3</a>
		<a href="#" class="tableOfContent-item">Section 4</a>
	</nav>
	`
}

const Template: Story<TableOfContentBasicStory> = (args: TableOfContentBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
