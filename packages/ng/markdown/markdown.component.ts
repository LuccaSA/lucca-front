import { ChangeDetectionStrategy, Component, computed, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
import { renderMarkdown } from './render-markdown';

@Component({
	selector: 'lu-markdown',
	template: '<lu-text-flow [innerHTML]="html()" />',
	imports: [TextFlowComponent],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarkdownComponent {
	readonly content = input.required<string>();

	readonly headingLevel = input(1, { transform: numberAttribute });

	protected html = computed(() => renderMarkdown(this.content(), { headingLevel: this.headingLevel() }));
}
