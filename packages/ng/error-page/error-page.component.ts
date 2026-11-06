import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { CDN_URL } from '@lucca-front/ng/core';
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
import { ErrorPageIllustration } from './error-page.model';

@Component({
	selector: 'lu-error-page',
	templateUrl: './error-page.component.html',
	styleUrl: './error-page.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [TextFlowComponent],
	host: {
		class: 'errorPage',
	},
})
export class ErrorPageComponent {
	readonly heading = input.required<string>();
	readonly illustration = input.required<ErrorPageIllustration>();

	readonly illustrationSrc = computed(() => {
		return `${CDN_URL}/assets/lucca/errors/${this.illustration()}.svg`;
	});
}
