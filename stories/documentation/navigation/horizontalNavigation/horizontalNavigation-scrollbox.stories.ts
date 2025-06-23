import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface HorizontalNavigationScrollboxStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/Scrollbox',
	decorators: [
		moduleMetadata({
			imports: [ScrollBoxComponent],
		}),
	],
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
	const noBorder = args.noBorder ? ` mod-noBorder` : ``;
	const header = args.header ? ` mod-header` : ``;
	const s = args.s ? ` mod-S` : ``;
	return `<lu-scroll-box [attr.style]="'--components-scrollBox-gap: 0px; --components-scrollBox-paddingInline: 0px; --components-scrollBox-marginInline: calc(var(--pr-t-spacings-200) * -1)'">
	<div></div>
	<div class="horizontalNavigation${s}${noBorder}${header}">
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
	<div style="margin-left: -1px"></div>
</lu-scroll-box>`;
}

const Template: StoryFn<HorizontalNavigationScrollboxStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
		}
	`,
	],
});

export const Scrollbox = Template.bind({});
Scrollbox.args = { noBorder: false, header: false, s: false };
