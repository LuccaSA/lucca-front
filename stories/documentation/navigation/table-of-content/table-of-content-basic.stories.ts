import { Meta, Story } from '@storybook/angular';

interface TableOfContentBasicStory {
}

export default {
	title: 'Documentation/Navigation/TableOfContent/Basic',
} as Meta;

function getTemplate(args: TableOfContentBasicStory): string {
	return `
	<nav class="tableOfContent">
		<ul class="tableOfContent-list">
			<li>
				<a href="#" class="tableOfContent-list-item is-active">Section 1</a>
			</li>
			<li>
				<a href="#" class="tableOfContent-list-item">Section 2</a>
			</li>
			<li>
				<a href="#" class="tableOfContent-list-item">Section 3</a>
			</li>
			<li>
				<a href="#" class="tableOfContent-list-item">Section 4</a>
			</li>
		</ul>
	</nav>
	`
}

const Template: Story<TableOfContentBasicStory> = (args: TableOfContentBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
