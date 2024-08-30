import { Meta, StoryFn } from '@storybook/angular';

interface MenuSecondaryBasicStory {
	compact: boolean;
	banner: boolean;
	open: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu Secondary/Basic',
	argTypes: {
		compact: {
			control: {
				type: 'boolean',
			},
		},
		banner: {
			control: {
				type: 'boolean',
			},
		},
		open: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: MenuSecondaryBasicStory): string {
	const compact = args.compact ? `mod-compact` : '';
	const banner = args.banner ? `mod-withBanner` : '';
	const open = args.open ? `is-open` : '';
	return `
	<div class="navSide ${compact} ${banner}">
		<nav role="navigation" aria-label="Nom application" class="navSide-wrapper">
			<div class="navSide-mainSection">
				<div class="navSide-item mod-mobileToggle">
					<button type="button" class="navSide-item-link" [attr.aria-expanded]="open">
						<span class="navSide-item-link-title">Menu</span>
						<span aria-hidden="true" class="navSide-item-arrow lucca-icon icon-arrowChevronRight"></span>
					</button>
				</div>
				<ul class="navSide-scrollWrapper">
					<li class="navSide-item">
						<button type="button" class="navSide-item-link">
							<span aria-hidden="true" class="lucca-icon icon-heart"></span>
							<span class="navSide-item-link-title">Section 1</span>
							<span aria-hidden="true" class="navSide-item-arrow lucca-icon icon-arrowChevronRight"></span>
						</button>
						<ul class="navSide-item-subMenu">
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">Subsection 1.1</a>
							</li>
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">
									Subsection 1.2
								</a>
							</li>
						</ul>
					</li>
					<li class="navSide-item ${open}">
						<button type="button" class="navSide-item-link" aria-expanded="true">
							<span aria-hidden="true" class="lucca-icon icon-peoplePerson"></span>
							<span class="navSide-item-link-title">Section#2 with a larger name</span>
							<span aria-hidden="true" class="navSide-item-arrow lucca-icon icon-arrowChevronRight"></span>
						</button>
						<ul class="navSide-item-subMenu">
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">Section 2.1</a>
							</li>
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">
									Section 2.2
								</a>
							</li>
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link is-active">
									Section 2.3
									<span class="numericBadge"><span class="u-mask">, </span>9</span>
								</a>
							</li>
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">
									Section 2.4
								</a>
							</li>
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">
									Section 2.5
								</a>
							</li>
						</ul>
					</li>
					<li class="navSide-item">
						<a href="#" class="navSide-item-link">
							<span aria-hidden="true" class="lucca-icon icon-chartVerticalBar"></span>
							<span class="navSide-item-link-title">Section 3</span>
							<span class="newBadge">New</span>
						</a>
					</li>
					<li class="navSide-item">
						<a href="#" class="navSide-item-link">
							<span aria-hidden="true" class="lucca-icon icon-settingsEqualizer"></span>
							<span class="navSide-item-link-title">Section 4</span>
							<div class="navSide-item-link-badgesOptional">
								<span class="newBadge">New</span>
								<span class="numericBadge"><span class="u-mask">, </span>9</span>
							</div>
						</a>
					</li>
				</ul>
			</div>
			<div class="navSide-bottomSection">
				<div class="navSide-item">
					<button type="button" class="navSide-item-link">
						<span aria-hidden="true" class="lucca-icon icon-signHelp"></span>
						<span class="navSide-item-link-title">Help</span>
					</button>
				</div>
			</div>
		</nav>
	</div>
	`;
}

const Template: StoryFn<MenuSecondaryBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.navSide {
			position: relative;
		}
	`,
	],
});

export const Basic = Template.bind({});
Basic.args = { compact: false, banner: false, open: false };
