import { Meta, StoryFn } from '@storybook/angular';

interface MenuScrollboxStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu/Scrollbox',
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
	},
} as Meta;

function getTemplate(args: MenuScrollboxStory): string {
	const noBorder = args.noBorder ? ` mod-noBorder` : '';
	const header = args.header ? ` mod-header` : '';
	const s = args.s ? ` mod-S` : '';
	return `<nav class="menu${s}${noBorder}${header}">
	<div class="scrollBox">
		<div class="scrollBox-inner">
			<div class="scrollBox-inner-content">
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
					<li class="menu-list-item">
						<a href="#" class="menu-list-item-action">
							Menu 4
						</a>
					</li>
					<li class="menu-list-item">
						<a href="#" class="menu-list-item-action">
							Menu 5
						</a>
					</li>
					<li class="menu-list-item">
						<a href="#" class="menu-list-item-action">
							Menu 6
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>`;
}

const Template: StoryFn<MenuScrollboxStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			:host {
				display: block;
				max-width: 100%;
				width: 25rem;
				min-width: 20rem;
				overflow: hidden;
				resize: horizontal;
				padding-bottom: 4rem;
			}
		`,
	],
});

export const Scrollbox = Template.bind({});
Scrollbox.args = { noBorder: false, header: false, s: false };
