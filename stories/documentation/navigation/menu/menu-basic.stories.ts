import { Meta, StoryFn } from '@storybook/angular';

interface MenuBasicStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
	disabled: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu/Basic',
	argTypes: {
		noBorder: {
			control: {
				type: 'boolean',
			},
		},
		header: {
			control: {
				type: 'boolean',
			},
		},
		s: {
			control: {
				type: 'boolean',
			},
		},
		disabled: {
			control: {
				type: 'boolean',
			},
		},
		vertical: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: MenuBasicStory): string {
	const noBorder = args.noBorder ? `mod-noBorder` : '';
	const header = args.header ? `mod-header` : '';
	const s = args.s ? `mod-S` : '';
	const vertical = args.vertical ? `mod-vertical` : '';
	if (args.disabled)
		return `
	<nav class="menu ${s} ${noBorder} ${header} ${vertical}">
		<ul class="menu-list">
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" aria-current="page">
					Menu 1
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 2
				</a>
			</li>
			<li class="menu-list-item">
				<span class="menu-list-item-action is-disabled">
					Menu 3
				</span>
			</li>
		</ul>	
	</nav>
	`;
	else
		return `
	<nav class="menu ${s} ${noBorder} ${header} ${vertical}">
		<ul class="menu-list">
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" aria-current="page">
					Menu 1
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 2
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 3
				</a>
			</li>
		</ul>
	</nav>
	`;
}

const Template: StoryFn<MenuBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { noBorder: false, header: false, s: false, disabled: false, vertical: false };
