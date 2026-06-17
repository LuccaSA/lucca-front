import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LuSkipLinksComponent, SkipLinkDirective } from '@lucca-front/ng/a11y';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ContainerComponent } from '@lucca-front/ng/container';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { Meta, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, within } from 'storybook/test';

@Component({
	selector: 'skip-links-story',
	imports: [LuSkipLinksComponent, SkipLinkDirective, AppLayoutComponent, MainLayoutComponent, MainLayoutBlockComponent, ContainerComponent],
	template: `
		<lu-skip-links />
		<lu-app-layout>
			<ng-container appLayoutBanner>
				<div id="lucca-banner-solutions-container" tabindex="-1">
					<a href="#">banner</a>
				</div>
			</ng-container>
			<ng-container appLayoutNavSide>
				<div id="navSide" tabindex="-1">
					<a href="#">navside</a>
					<a href="#">navside</a>
					<a href="#">navside</a>
					<a href="#">navside</a>
					<a href="#">navside</a>
				</div>
			</ng-container>
			<lu-main-layout>
				<lu-main-layout-block>
					<lu-container>
						<div class="fakeContent"><a href="#">content</a></div>
					</lu-container>
				</lu-main-layout-block>
				<lu-main-layout-block>
					<lu-container>
						<div class="fakeContent"><a href="#">content</a></div>
					</lu-container>
				</lu-main-layout-block>
				<lu-main-layout-block>
					<lu-container>
						<div class="fakeContent"><a href="#">content</a></div>
					</lu-container>
				</lu-main-layout-block>
				@if (showCustomSkipLinkTarget) {
					<lu-main-layout-block>
						<lu-container>
							<div luSkipLinkTarget luSkipLinkLabel="Go to custom skip link target" class="fakeContent"><a href="#">custom skip link target</a></div>
						</lu-container>
					</lu-main-layout-block>
				}
				<lu-main-layout-block>
					<lu-container>
						<div class="fakeContent"><a href="#">content</a></div>
					</lu-container>
				</lu-main-layout-block>
			</lu-main-layout>
		</lu-app-layout>
	`,
	styles: [
		`
			@layer components {
				:host ::ng-deep {
					.appLayout {
						--components-appLayout-blockSize: 100%;
						--components-appLayout-inlineSize: 100%;
						overflow: hidden;
						min-block-size: 394px;
						border-radius: var(--pr-t-border-radius-100);
						border: 1px solid var(--palettes-neutral-200);

						> * {
							font-family: monospace;

							&.appLayout-banner {
								padding-block: 0;
							}
						}
					}

					#lucca-banner-solutions-container {
						background-color: var(--pr-t-elevation-surface-raised);
						box-shadow: var(--pr-t-elevation-shadow-overflow);
						position: relative;
						z-index: 2;
						block-size: 50px;
						display: grid;
						place-items: center;

						&:focus-visible {
							outline: 2px solid var(--palettes-700, var(--palettes-product-700));
							outline-offset: -4px;
							border-radius: var(--pr-t-border-radius-default);
						}

						&::before {
							content: '';
							position: absolute;
							inset-block-start: var(--pr-t-spacings-100);
							inset-inline-start: var(--pr-t-spacings-100);
							inline-size: 122px;
							block-size: 32px;
							background-color: var(--palettes-neutral-50);
							border-radius: var(--pr-t-border-radius-50);
						}

						&::after {
							content: '';
							position: absolute;
							inset-inline-end: var(--pr-t-spacings-100);
							inset-block-start: var(--pr-t-spacings-100);
							inline-size: 32px;
							block-size: 32px;
							background-color: var(--palettes-neutral-200);
							border-radius: var(--pr-t-border-radius-full);
						}
					}

					#navSide {
						background-color: var(--palettes-neutral-500);
						padding: var(--pr-t-spacings-150) var(--pr-t-spacings-400);
						block-size: 100%;
						display: grid;
						place-items: center;

						&:focus-visible {
							outline: 2px solid var(--palettes-700, var(--palettes-product-700));
							outline-offset: -4px;
							border-radius: var(--pr-t-border-radius-default);
						}

						a {
							color: var(--pr-t-color-text);
						}
					}

					.mainLayout-sidebar {
						background-color: var(--palettes-neutral-50);
						align-items: center;
						justify-content: center;
						display: flex;
						flex-direction: column;
						color: var(--palettes-brand-700);
						font-family: monospace;

						&:not(:empty) {
							padding: var(--pr-t-spacings-150);
						}
					}

					.mainLayout-content-inside {
						gap: var(--pr-t-spacings-100);
					}

					.container {
						--commons-container-maxWidth: 50rem;
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
					}
				}
			}

			:host ::ng-deep .skipLinks {
				inset-block-start: 1.75rem;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkipLinksStory {
	@Input() showCustomSkipLinkTarget = false;
}

export default {
	title: 'Documentation/Navigation/SkipLinks/Basic',
	component: SkipLinksStory,
} as Meta;

const Template = (props: SkipLinksStory) => ({ props });

const code = `
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
@Component({
	imports: [LuSkipLinksComponent],
	selector: 'app-component',
	template: \`<lu-skip-links />

<div luSkipLinkTarget luSkipLinkLabel="Go to custom skip link target">custom skip link target</div>\`,
})
class AppComponent {
}`;

export const Basic: StoryObj<SkipLinksStory> = {
	args: {
		showCustomSkipLinkTarget: false,
	},
	argTypes: {
		showCustomSkipLinkTarget: {
			control: { type: 'boolean' },
		},
	},
	render: Template,
};
Basic.parameters = {
	controls: { include: ['showCustomSkipLinkTarget'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial du composant', async () => {
		const skipLink = canvas.getByRole('link', { name: /contenu/i });
		await expect(skipLink).toBeInTheDocument();
	});
});
