import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
import { ErrorPageIllustration } from './error-page.model';

@Component({
	selector: 'lu-error-page',
	templateUrl: './error-page.component.html',
	styleUrl: './error-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [TextFlowComponent],
	host: {
		class: 'errorPage',
	},
})
export class ErrorPageComponent {
	readonly heading = input.required<string>();
	readonly illustration = input.required<ErrorPageIllustration>();

	readonly illustrationSrc = computed(() => {
		return `https://cdn.lucca.fr/assets/lucca/errors/${this.illustration()}.svg`;
	});
}
