import { Meta, StoryFn } from '@storybook/angular';

interface HorizontalNavigationBasicStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
	disabled: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Basic',
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

function getTemplate(args: HorizontalNavigationBasicStory): string {
	const noBorder = args.noBorder ? ` mod-noBorder` : '';
	const header = args.header ? ` mod-header` : '';
	const s = args.s ? ` mod-S` : '';
	const vertical = args.vertical ? ` mod-vertical` : '';
	if (args.disabled)
		return `<div class="horizontalNavigation${s}${noBorder}${header}${vertical}">
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
			<a class="horizontalNavigation-list-item-action is-disabled">
				Page 3
			</a>
		</li>
	</ul>
</div>`;
	else
		return `<div class="horizontalNavigation${s}${noBorder}${header}${vertical}">
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
	</ul>
</div>`;
}

const Template: StoryFn<HorizontalNavigationBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { noBorder: false, header: false, s: false, disabled: false, vertical: false };
