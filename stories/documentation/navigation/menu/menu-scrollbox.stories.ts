import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

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
	decorators: [
		moduleMetadata({
			imports: [ScrollBoxComponent],
		}),
	],
} as Meta;

function getTemplate(args: MenuScrollboxStory): string {
	const noBorder = args.noBorder ? ` mod-noBorder` : '';
	const header = args.header ? ` mod-header` : '';
	const s = args.s ? ` mod-S` : '';
	return `<lu-scroll-box [attr.style]="'--components-scrollBox-marginInline: 0'">
	<div class="menu_firstChild"></div>
	<nav class="menu${s}${noBorder}${header}">
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
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 7
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 8
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 9
				</a>
			</li>
			<li class="menu-list-item">
				<a href="#" class="menu-list-item-action">
					Menu 10
				</a>
			</li>
		</ul>
	</nav>
	<div class="menu_lastChild"></div>
</lu-scroll-box>`;
}

const Template: StoryFn<MenuScrollboxStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
			/* to fix a weird bug in mod-S */
			.menu_lastChild {
				margin-right: 1px;
			}

			:host {
				display: block;
				max-inline-size: 100%;
				inline-size: 25rem;
				min-inline-size: 20rem;
				overflow: hidden;
				resize: inline;
				padding-block-end: 4rem;
			}
		`,
	],
});

export const Scrollbox = Template.bind({});
Scrollbox.args = { noBorder: false, header: false, s: false };
