import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-empty-state-page-illustration',
	templateUrl: './empty-state-page-illustration.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class EmptyStatePageIllustration {
	readonly src = input<string | null>(null);
	readonly alt = input<string | null>(null);
}
