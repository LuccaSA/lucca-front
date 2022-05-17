import { Meta, Story } from '@storybook/angular';

interface MenuCountStory {
	noBorder: boolean;
	header: boolean;
	small: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu/Count',
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

function getTemplate(args: MenuCountStory): string {
	const noBorder = args.noBorder ? `mod-noBorder` : '';
	const header = args.header ? `mod-header` : '';
	const small = args.small ? `mod-small` : '';
	return `
	<nav class="menu ${small} ${noBorder} ${header}">
		<ul class="menu-list">
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" aria-current="page">
					Menu
					<span class="label mod-number">2</span>
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu
					<span class="label mod-number">2</span>
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu
					<span class="label mod-number">2</span>
				</a>
			</li>
		</ul>
	</nav>
	`

}

const Template: Story<MenuCountStory> = (args: MenuCountStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Count = Template.bind({});
Count.args = { noBorder: false, header: false, small: false, };
