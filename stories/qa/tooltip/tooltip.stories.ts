import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'tooltip-stories',
	standalone: true,
	imports: [LuTooltipModule, ButtonComponent],
	template: `
		<button luButton (click)="displayed = !displayed">Toggle dislay</button>

		@if (displayed) {
			@for (cell of cells; track $index) {
				<div class="ellipsis width200" luTooltip>{{ cell }}</div>
			}
		}
	`,
	styles: [
		`
			.ellipsis {
				text-overflow: ellipsis;
				display: block;
				overflow: hidden;
				white-space: nowrap;
			}

			.width200 {
				inline-size: 200px;
			}

			:host {
				display: block;
			}

			[tabindex='0'] {
				color: green;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipStory {
	displayed = false;
	cells = new Array(1_000).fill(0).map((_, i) => 'a'.repeat(i + 1));
}

export default {
	title: 'QA/Tooltip/Ellipsis tests',
	component: TooltipStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<TooltipStory> = (args) => ({
	props: args,
});

export const Basic = template.bind({});
