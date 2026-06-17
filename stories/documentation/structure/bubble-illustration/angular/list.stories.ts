import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BUBBLE_ILLUSTRATION, BubbleIllustrationComponent } from '@lucca-front/ng/bubble-illustration';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'bubble-illustration-all-stories',
	template: `
		<div class="demo-list">
			@for (illustration of illustrations; track illustration) {
				<div class="demo-list-item">
					<lu-bubble-illustration [illustration]="illustration" />
					<code class="code">{{ illustration }}</code>
				</div>
			}
		</div>
	`,
	styles: [
		`
			.demo-list {
				display: flex;
				flex-wrap: wrap;
				gap: var(--pr-t-spacings-200) var(--pr-t-spacings-50);
			}

			.demo-list-item {
				display: flex;
				flex-direction: column;
				align-items: center;
				gap: var(--pr-t-spacings-50);
				width: 6.5rem;
			}
		`,
	],
	imports: [BubbleIllustrationComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class BubbleIllustrationAllStory {
	illustrations = BUBBLE_ILLUSTRATION;
}

export default {
	title: 'Documentation/Structure/Bubble illustration/Angular/List',
	component: BubbleIllustrationAllStory,
} as Meta;

export const List: StoryObj<BubbleIllustrationAllStory> = {
	args: {},
};
