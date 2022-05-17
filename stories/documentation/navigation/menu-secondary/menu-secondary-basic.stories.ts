import { Meta, Story } from '@storybook/angular';

interface MenuSecondaryBasicStory {
	compact: boolean;
}

export default {
	title: 'Documentation/Navigation/Menu Secondary/Basic',
	argTypes: {
		compact: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: MenuSecondaryBasicStory): string {
	const compact = args.compact ? `mod-compact` : '';
	return `
	<div class="navSide ${compact}">
		<nav role="navigation" aria-label="Nom application" class="navSide-wrapper">
			<div class="navSide-mainSection">
				<div class="navSide-item mod-mobileToggle">
					<button type="button" class="navSide-item-link">
						<span class="navSide-item-link-title">Menu</span>
						<span aria-hidden="true" class="navSide-item-arrow lucca-icon icon-arrowEast"></span>
					</button>
				</div>
				<ul class="navSide-scrollWrapper">
					<li class="navSide-item">
						<button type="button" class="navSide-item-link">
							<span aria-hidden="true" class="lucca-icon icon-heart"></span>
							<span class="navSide-item-link-title">Section 1</span>
							<span aria-hidden="true" class="navSide-item-arrow lucca-icon icon-arrowEast"></span>
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
					<li class="navSide-item is-open">
						<button type="button" class="navSide-item-link" aria-expanded="true">
							<span aria-hidden="true" class="lucca-icon icon-user"></span>
							<span class="navSide-item-link-title">Section#2 with a larger name</span>
							<span aria-hidden="true" class="navSide-item-arrow lucca-icon icon-arrowEast"></span>
						</button>
						<ul class="navSide-item-subMenu">
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link">Section 2.1</a>
							</li>
							<li class="navSide-item-subMenu-item">
								<a href="#" class="navSide-item-subMenu-link is-active">
									Section 2.3
									<span class="navSide-item-alert"><span class="u-mask">, </span>3</span>
								</a>
							</li>
						</ul>
					</li>
					<li class="navSide-item">
						<a href="#" class="navSide-item-link">
							<span aria-hidden="true" class="lucca-icon icon-analytics"></span>
							<span class="navSide-item-link-title">Section 3</span>
						</a>
					</li>
					<li class="navSide-item">
						<a href="#" class="navSide-item-link">
							<span aria-hidden="true" class="lucca-icon icon-sliders"></span>
							<span class="navSide-item-link-title">Section 4</span>
							<span class="navSide-item-alert"><span class="u-mask">, </span>7</span>
						</a>
					</li>
				</ul>
			</div>
			<div class="navSide-bottomSection">
				<div class="navSide-item">
					<button type="button" class="navSide-item-link">
						<span aria-hidden="true" class="lucca-icon icon-help"></span>
						<span class="navSide-item-link-title">Help</span>
					</button>
				</div>
			</div>
		</nav>
	</div>
	`;
}

const Template: Story<MenuSecondaryBasicStory> = (args: MenuSecondaryBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.navSide {
			position: relative;
			max-height: 30rem;
			padding-top: 0;
		}
		.navSide-item.mod-mobileToggle {
			position: relative;
		}`,
	],
});

export const Basic = Template.bind({});
Basic.args = { compact: false };
