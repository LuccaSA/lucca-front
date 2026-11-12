import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { RichTextInputComponent, RichTextInputToolbarComponent } from '@lucca-front/ng/forms/rich-text-input';
import { MarkdownFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { applicationConfig, Meta } from '@storybook/angular-vite';

// Repro for https://github.com/LuccaSA/lucca-front/issues/5633
@Component({
	selector: 'rich-text-input-leave-animation-stories',
	imports: [RichTextInputComponent, RichTextInputToolbarComponent, MarkdownFormatterDirective, ButtonComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: `
		.repro-fadeOut {
			animation: repro-fadeOut 2s forwards;
		}
		@keyframes repro-fadeOut {
			to {
				opacity: 0;
			}
		}
	`,
	template: `
		<button luButton type="button" (click)="shown.set(!shown())">{{ shown() ? 'Remove' : 'Show' }}</button>
		<div class="pr-u-marginBlockStart200" style="display: grid; gap: 2rem; grid-template-columns: 1fr 1fr">
			<div>
				<p><code>[hideToolbar]="true"</code></p>
				@if (shown()) {
					<div animate.leave="repro-fadeOut">
						<lu-rich-text-input luWithMarkdownFormatter [(ngModel)]="value" [hideToolbar]="true">
							<lu-rich-text-input-toolbar />
						</lu-rich-text-input>
					</div>
				}
			</div>
			<div>
				<p><code>[hideToolbar]="false"</code></p>
				@if (shown()) {
					<div animate.leave="repro-fadeOut">
						<lu-rich-text-input luWithMarkdownFormatter [(ngModel)]="value">
							<lu-rich-text-input-toolbar />
						</lu-rich-text-input>
					</div>
				}
			</div>
		</div>
	`,
})
class RichTextInputLeaveAnimationStory {
	protected readonly shown = signal(true);
	protected value = 'Lorem **ipsum** dolor *sit amet*.';
}

export default {
	title: 'QA/RichTextInputLeaveAnimation',
	component: RichTextInputLeaveAnimationStory,
	decorators: [applicationConfig({ providers: [provideRouter([])] })],
} as Meta;

export const Basic = {};
