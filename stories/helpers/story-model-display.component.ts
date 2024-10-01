import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CalloutComponent } from '@lucca-front/ng/callout';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'pr-story-model-display',
	standalone: true,
	imports: [CalloutComponent],
	template: ` <lu-callout icon="settingsGear" size="S" heading="NgModel value">
		<div class="code">
			<ng-content></ng-content>
		</div>
	</lu-callout>`,
	styles: ``,
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoryModelDisplayComponent {}
