import { ChangeDetectionStrategy, Component, DOCUMENT, inject, OnDestroy, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective, CalloutFeedbackListComponent, CalloutPopoverComponent } from '@lucca-front/ng/callout';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';

const PUSH_PANEL_SIZE = '300px';

@Component({
	selector: 'callout-popover-touch-stories',
	imports: [ButtonComponent, PopoverDirective, CalloutPopoverComponent, CalloutFeedbackListComponent, CalloutFeedbackItemComponent, CalloutFeedbackItemDescriptionDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<p class="pr-u-marginBlockEnd100">
			Touch: DevTools device mode (<code>hover: none</code>) — the close button must be visible. Mouse: it stays masked until keyboard focus. Every popover must keep a 12px gap
			with the viewport edges.
		</p>
		<label class="demo-pushPanel">
			<input type="checkbox" [checked]="pushPanel()" (change)="togglePushPanel()" />
			Simulate a {{ pushPanelSize }} push panel (<code>--commons-pushPanel-inlineSize</code>)
		</label>

		<div class="demo-grid">
			@for (cell of cells; track cell.label) {
				<div class="demo-cell" [style.place-self]="cell.place">
					<lu-callout-popover [buttonLabel]="cell.label" icon="signWarning" state="warning" heading="Warnings">
						<ul lu-callout-feedback-list palette="neutral">
							@for (item of items; track $index) {
								<li lu-callout-feedback-item>
									<lu-feedback-item-description>{{ longText }}</lu-feedback-item-description>
									<button lu-feedback-item-action luButton="outlined">Action</button>
								</li>
							}
						</ul>
					</lu-callout-popover>

					<button luButton="outlined" type="button" [luPopover2]="popoverContent">Popover2 {{ cell.label }}</button>
				</div>
			}
		</div>

		<ng-template #popoverContent>
			<p>{{ longText }}</p>
			<p>{{ longText }}</p>
		</ng-template>
	`,
	styles: [
		`
			.demo-pushPanel {
				display: block;
				margin-block-end: var(--pr-t-spacings-200);
			}

			.demo-grid {
				display: grid;
				grid-template-columns: 1fr 1fr 1fr;
				grid-template-rows: auto auto auto;
				gap: var(--pr-t-spacings-200);
				min-block-size: 80dvb;
			}

			.demo-cell {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-100);
				align-items: flex-start;
			}
		`,
	],
})
class CalloutPopoverTouchStory implements OnDestroy {
	readonly #root = inject(DOCUMENT).documentElement;

	readonly pushPanelSize = PUSH_PANEL_SIZE;
	readonly pushPanel = signal(false);

	readonly items = [1, 2, 3];
	readonly longText =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus, posuere velit aliquet. Donec ullamcorper nulla non metus auctor fringilla.';

	readonly cells = [
		{ label: 'top start', place: 'start start' },
		{ label: 'top center', place: 'start center' },
		{ label: 'top end', place: 'start end' },
		{ label: 'middle start', place: 'center start' },
		{ label: 'center', place: 'center center' },
		{ label: 'middle end', place: 'center end' },
		{ label: 'bottom start', place: 'end start' },
		{ label: 'bottom center', place: 'end center' },
		{ label: 'bottom end', place: 'end end' },
	];

	togglePushPanel(): void {
		this.pushPanel.update((value) => !value);
		if (this.pushPanel()) {
			this.#root.style.setProperty('--commons-pushPanel-inlineSize', PUSH_PANEL_SIZE);
		} else {
			this.#root.style.removeProperty('--commons-pushPanel-inlineSize');
		}
	}

	ngOnDestroy(): void {
		this.#root.style.removeProperty('--commons-pushPanel-inlineSize');
	}
}

export default {
	title: 'QA/Callout Popover/Touch',
	component: CalloutPopoverTouchStory,
	decorators: [applicationConfig({ providers: [configureLuPopover()] })],
	parameters: { layout: 'fullscreen' },
} as Meta;

export const Basic: StoryObj = {};
