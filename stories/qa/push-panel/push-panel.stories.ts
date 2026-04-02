import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
import { ButtonComponent } from '@lucca-front/ng/button';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, DialogOpenDirective } from '@lucca-front/ng/dialog';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { SwitchInputComponent } from '@lucca-front/ng/forms';
import { MainLayoutBlockComponent, MainLayoutComponent } from '@lucca-front/ng/main-layout';
import { LuToastsComponent, LuToastsService } from '@lucca-front/ng/toast';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'push-panel-stories',
	templateUrl: './push-panel.stories.html',
	imports: [
		AppLayoutComponent,
		MainLayoutComponent,
		MainLayoutBlockComponent,
		ButtonComponent,
		DialogComponent,
		DialogHeaderComponent,
		DialogContentComponent,
		DialogFooterComponent,
		DialogOpenDirective,
		LuToastsComponent,
		ContainerComponent,
		FormFieldComponent,
		SwitchInputComponent,
		FormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			@layer components {
				:host ::ng-deep {
					.appLayout {
						--components-appLayout-blockSize: 100%;
						resize: vertical;
						overflow: hidden;
						min-block-size: 394px;
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
		`,
	],
})
class PushPanelStory {
	private toasts = inject(LuToastsService);

	showPushPanel = false;

	showToast() {
		this.toasts.addToast({
			message: 'This is a basic toast notification!',
			type: 'Info',
			duration: null,
		});
	}

	togglePushPanel() {
		if (this.showPushPanel) {
			document.documentElement.style.setProperty('--commons-pushPanel-inlineSize', '348px');
		} else {
			document.documentElement.style.removeProperty('--commons-pushPanel-inlineSize');
		}
	}
}

export default {
	title: 'QA/Push Panel',
	component: PushPanelStory,
} as Meta;

export const Basic = {};
