import { Meta, Story } from '@storybook/angular';

interface MenuBasicStory {
	noBorder: boolean;
	header: boolean;
	small: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu/Basic',
	argTypes: {
		noBorder: {
			control: {
				type: 'boolean',
			}
		},
		header: {
			control: {
				type: 'boolean',
			}
		},
		small: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: MenuBasicStory): string {
	const noBorder = args.noBorder ? `mod-noBorder` : '';
	const header = args.header ? `mod-header` : '';
	const small = args.small ? `mod-small` : '';
	return `
	<nav class="menu ${small} ${noBorder} ${header}">
		<ul class="menu-list">
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" aria-current="page">
					Menu 1
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 2
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 3
				</a>
			</li>
		</ul>
	</nav>
	`

}

const Template: Story<MenuBasicStory> = (args: MenuBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { noBorder: false, header: false, small: false, };
