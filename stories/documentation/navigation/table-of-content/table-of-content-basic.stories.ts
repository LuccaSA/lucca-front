import { Meta, Story } from '@storybook/angular';

interface TableOfContentBasicStory {
	mod: string;
}

export default {
	title: 'Documentation/Navigation/TableOfContent/Basic',
	argTypes: {
		mod: {
			options: ['', 'mod-grey'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: TableOfContentBasicStory): string {
	const classes = [args.mod].filter(Boolean).join(' ');
	return `
	<nav class="tableOfContent ${classes}">
		<a class="tableOfContent-item is-active">Section 1</a>
		<a class="tableOfContent-item">Section 2</a>
		<a class="tableOfContent-item">Section 3</a>
		<a class="tableOfContent-item">Section 4</a>
	</nav>
	`
}

const Template: Story<TableOfContentBasicStory> = (args: TableOfContentBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [`
		:host {
			display: block;
		}`,
		args.mod === ''
			? ':host { background-color: #F3F5FC; margin: -15px -15px; padding: 15px 15px; }'
			: ''
	],
});

export const Basic = Template.bind({});
Basic.args = { mod: '' };
