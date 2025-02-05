import { Meta, StoryFn } from '@storybook/angular';

interface HorizontalNavigationScrollboxStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Scrollbox',
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

function getTemplate(args: HorizontalNavigationScrollboxStory): string {
	const noBorder = args.noBorder ? ` mod-noBorder` : '';
	const header = args.header ? ` mod-header` : '';
	const s = args.s ? ` mod-S` : '';
	return `<nav class="horizontalNavigation ${s}${noBorder}${header}">
	<div class="scrollBox">
		<div class="scrollBox-inner">
			<div class="scrollBox-inner-content">
				<ul class="horizontalNavigation-list">
					<li class="horizontalNavigation-list-item">
						<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">
							Page 1
						</a>
					</li>
					<li class="horizontalNavigation-list-item">
						<a href="#" class="horizontalNavigation-list-item-action">
							Page 2
						</a>
					</li>
					<li class="horizontalNavigation-list-item">
						<a href="#" class="horizontalNavigation-list-item-action">
							Page 3
						</a>
					</li>
					<li class="horizontalNavigation-list-item">
						<a href="#" class="horizontalNavigation-list-item-action">
							Page 4
						</a>
					</li>
					<li class="horizontalNavigation-list-item">
						<a href="#" class="horizontalNavigation-list-item-action">
							Page 5
						</a>
					</li>
					<li class="horizontalNavigation-list-item">
						<a href="#" class="horizontalNavigation-list-item-action">
							Page 6
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</nav>`;
}

const Template: StoryFn<HorizontalNavigationScrollboxStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
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
