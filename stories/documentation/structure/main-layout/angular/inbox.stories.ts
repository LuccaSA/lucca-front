import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, moduleMetadata } from '@storybook/angular';

interface MainLayoutAngularInAppLayoutStory {}

export default {
	title: 'Documentation/Structure/Main Layout/Angular/Inbox',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [MainLayoutComponent, AppLayoutComponent, MainLayoutBlockComponent, ContainerComponent],
		}),
	],
	render: (args: MainLayoutAngularInAppLayoutStory) => {
		const template = `
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent">content</div>
			</lu-container>
		</lu-main-layout-block>`;

		return {
			styles: [
				`
@layer components {
	:host ::ng-deep {
		.appLayout {
			--components-appLayout-blockSize: 100%;
			--components-appLayout-inlineSize: 100%;
			resize: both;
			overflow: hidden;
			min-block-size: 394px;
			max-block-size: 90dvh;
			border-radius: var(--pr-t-border-radius-100);
			border: 1px solid var(--palettes-neutral-200);

			> * {
				font-family: monospace;

				&:not(.appLayout-main) {
					display: grid;
					place-items: center;
				}

				&.appLayout-banner {
					padding-block: 0;
				}

				&.appLayout-navSide {
					padding: var(--pr-t-spacings-150) var(--pr-t-spacings-400);
				}
			}
		}

		.appLayout-banner {
			background-color: var(--pr-t-elevation-surface-raised);
			box-shadow: var(--pr-t-elevation-shadow-overflow);
			position: relative;
			z-index: 2;

			&::before {
				content: '';
				position: absolute;
				inset-inline-start: var(--pr-t-spacings-100);
				width: 122px;
				height: 32px;
				background-color: var(--palettes-neutral-50);
				border-radius: var(--pr-t-border-radius-50);
			}

			&::after {
				content: '';
				position: absolute;
				inset-inline-end: var(--pr-t-spacings-100);
				width: 32px;
				height: 32px;
				background-color: var(--palettes-neutral-200);
				border-radius: var(--pr-t-border-radius-full);
			}
		}

		.appLayout-navSide {
			background-color: var(--palettes-neutral-500);
		}

		.container {
			--commons-container-maxWidth: 50rem;
		}

		.mainLayout.mod-inbox {
			background-image: url('https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/lucca/bubbles-top-right-02.svg');
			background-repeat: no-repeat;
			background-position: top left min(calc(100% + 5rem), calc(var(--commons-container-maxWidth) - 8.5rem));

			.mainLayout-sidebar {
				--components-mainLayout-sidebar-inlineSize: 25rem
			}
		}



		.mainLayout-sidebar-content {
			margin: var(--pr-t-spacings-300);
			// margin-bottom: 0;

			padding: var(--pr-t-spacings-200);
			border-radius: var(--pr-t-border-radius-structure);
			background-color: var(--palettes-neutral-50);
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-300);

			overflow: auto;

			block-size: calc(100% - var(--pr-t-spacings-300) * 2);

			&:focus-visible {
				outline: 2px solid var(--palettes-product-700);
				outline-offset: -2px;
			}
		}

		.test {
			padding: var(--pr-t-spacings-200);
			border-radius: var(--pr-t-border-radius-structure);
			background-color: var(--palettes-neutral-100);
			gap: var(--pr-t-spacings-200);
			display: flex;
			flex-direction: column;
			margin-top: calc(var(--pr-t-spacings-200) * -1);
		}

		.fakeContent {
			background-color: var(--pr-t-elevation-surface-raised);
			border: 1px solid var(--palettes-neutral-50);
			padding: var(--pr-t-spacings-150);
			align-items: center;
			justify-content: center;
			display: flex;
			flex-direction: column;
			color: var(--palettes-brand-700);
			font-family: monospace;
			white-space: nowrap;

			&:is(a) {
				border-radius: var(--pr-t-border-radius-structure);
				min-height: 5rem;
				box-shadow: var(--pr-t-elevation-shadow-raised);
			}
		}

		.block2 {
			overflow: auto;

			margin: calc(var(--pr-t-spacings-100) * -1) calc(var(--pr-t-spacings-200) * -1) calc(var(--pr-t-spacings-200) * -1);
			padding: calc(var(--pr-t-spacings-100) * 1) calc(var(--pr-t-spacings-200) * 1) calc(var(--pr-t-spacings-200) * 1);
			gap: var(--pr-t-spacings-100);
			display: flex;
			flex-direction: column;

			&:focus-visible {
				outline: 2px solid var(--palettes-product-700);
				outline-offset: -2px;
				border-radius: var(--pr-t-border-radius-structure);
			}
		}

		.block-inside {
			gap: var(--pr-t-spacings-100);
			display: flex;
			flex-direction: column;
		}

		.sticky {
			// position: sticky;
			top: 0;
			padding: var(--pr-t-spacings-200);
			border-radius: var(--pr-t-border-radius-structure) var(--pr-t-border-radius-structure) 0 0;
			background-color: var(--palettes-neutral-100);

			&.is-stuck {
				background-color: var(--palettes-neutral-25);
				border-radius: 0;
			}
		}
	}
}
				`,
			],
			template: `<lu-app-layout>
	<ng-container appLayoutBanner>banner</ng-container>
	<ng-container appLayoutNavSide>
		navSide
	</ng-container>
	<lu-main-layout class="mod-inbox">
		<ng-container mainLayoutSidebar>
			<div class="mainLayout-sidebar-content">
				<div class="block1">
					<h2 class="pr-u-marginBlockEnd200">Objets à approuver</h2>
					<ul class="segmentedControl mod-S" role="presentation">
						<li class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
								<label for="tab1" class="segmentedControl-item-action">
										Pour vous <span class="numericBadge">8</span>
								</label>
						</li>
						<li class="segmentedControl-item">
								<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
								<label for="tab2" class="segmentedControl-item-action">
										Par d’autres <span class="numericBadge">8</span>
								</label>
						</li>
				</ul>
				</div>
				<div class="block2">
					<button class="button mod-withIcon mod-iconOnLeft mod-ghost pr-u-inlineSizeFitContent" aria-expanded="true">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
						Marie Bragoulet
					</button>
					<div class="block-inside">
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
					</div>
					<button class="button mod-withIcon mod-iconOnLeft mod-ghost pr-u-inlineSizeFitContent" aria-expanded="true">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
						Marie Bragoulet
					</button>
					<div class="block-inside">
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
					</div>
					<button class="button mod-withIcon mod-iconOnLeft mod-ghost pr-u-inlineSizeFitContent" aria-expanded="true">
						<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
						Marie Bragoulet
					</button>
					<div class="block-inside">
						<a href="#" class="fakeContent">Card</a>
						<a href="#" class="fakeContent">Card</a>
					</div>
				</div>

			</div>
		</ng-container>
		<lu-main-layout-block>
			<lu-container>
				<div class="fakeContent">test</div>
				<div class="fakeContent">test</div>
				<div class="fakeContent">test</div>
				<div class="fakeContent">test</div>
				<div class="fakeContent">test</div>

			</lu-container>
		</lu-main-layout-block>
	</lu-main-layout>
</lu-app-layout>



`,
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
