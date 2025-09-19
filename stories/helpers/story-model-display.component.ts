import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CalloutComponent } from '@lucca-front/ng/callout';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'pr-story-model-display',
	standalone: true,
	imports: [CalloutComponent],
	template: ` <lu-callout icon="settingsGear" size="S" heading="NgModel value">
		<pre class="code" data-testid="pr-ng-model"><ng-content /></pre>
	</lu-callout>`,
	styles: `
		pr-story-model-display {
			margin-block-start: var(--pr-t-spacings-400);
			display: block;
		}

		pr-story-model-display .callout-content {
			min-inline-size: 0;
		}

		pr-story-model-display pre {
			overflow: auto;
		}

		pr-story-model-display pre:focus-visible {
			outline: 2px solid var(--palettes-brand-700);
			outline-offset: 2px;
		}

		pr-story-model-display:has(.code:empty) {
			.callout-content-description {
				display: none;
			}
		}
	`,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryModelDisplayComponent {}
