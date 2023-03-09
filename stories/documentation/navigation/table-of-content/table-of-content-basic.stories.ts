import { Meta, Story } from '@storybook/angular';

interface TableOfContentBasicStory {
	disabled: boolean;
}

export default {
	title: 'Documentation/Navigation/TableOfContent/Basic',
	argTypes: {
		disabled: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: TableOfContentBasicStory): string {
	const disabled = args.disabled ? `disabled` : '';
	return `
	<nav class="tableOfContent ">
		<ul class="tableOfContent-list">
			<li class="tableOfContent-list-item">
				<a href="#" class="tableOfContent-list-item-action is-active">Section 1</a>
			</li>
			<li class="tableOfContent-list-item">
				<a href="#" class="tableOfContent-list-item-action" ${disabled}>Section 2</a>
			</li>
			<li class="tableOfContent-list-item">
				<a href="#" class="tableOfContent-list-item-action" ${disabled}>Section 3</a>
			</li>
			<li class="tableOfContent-list-item">
				<a href="#" class="tableOfContent-list-item-action" ${disabled}>Section 4</a>
			</li>
		</ul>
	</nav>
	`;
}

const Template: Story<TableOfContentBasicStory> = (args: TableOfContentBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { disabled: false };
