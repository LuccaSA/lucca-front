import { Meta, Story } from '@storybook/angular';

interface MenuCountStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
	disabled: boolean;
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
		s: {
			control: {
				type: 'boolean',
			}
		},
		disabled: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: MenuCountStory): string {
	const noBorder = args.noBorder ? `mod-noBorder` : '';
	const header = args.header ? `mod-header` : '';
	const s = args.s ? `mod-S` : '';
	const disabled = args.disabled ? `disabled` : '';
	return `
	<nav class="menu ${s} ${noBorder} ${header}">
		<ul class="menu-list">
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" ${disabled} aria-current="page">
					Menu
					<span class="label mod-number">2</span>
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" ${disabled}>
					Menu
					<span class="label mod-number">2</span>
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" ${disabled}>
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
Count.args = { noBorder: false, header: false, s: false, disabled: false };
