import { Meta, Story } from '@storybook/angular';

interface MenuBasicStory {
	noBorder: boolean;
	header: boolean;
	palette: string;
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
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
	},
} as Meta;

function getTemplate(args: MenuBasicStory): string {
	const classes = [args.palette].filter(Boolean).join(' ');
	const noBorder = args.noBorder ? `mod-noBorder` : '';
	const header = args.header ? `mod-header` : '';
	return `
	<nav class="menu ${classes} ${noBorder} ${header}">
		<ul class="menu-list">
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action" aria-current="page">
					Menu 1
					<span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Menu 1"></span>
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 2
					<span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Menu 2"></span>
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 3
					<span class="menu-list-item-action-placeholder" aria-hidden="true" data-content-after="Menu 3"></span>
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
Basic.args = { noBorder: false, header: false, palette: '', };
