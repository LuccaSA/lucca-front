import { ChangeDetectionStrategy, Component, forwardRef, input, ViewEncapsulation } from '@angular/core';
import { LU_DATA_PRESENTATION_LIST_INSTANCE } from './data-presentation-list.token';

@Component({
	selector: 'lu-data-presentation-list',
	template: `<dl class="presentationWrapper" [class.mod-S]="size() === 'S'">
		<ng-content />
	</dl>`,
	styleUrl: './data-presentation-list.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: LU_DATA_PRESENTATION_LIST_INSTANCE,
			useExisting: forwardRef(() => DataPresentationListComponent),
		},
	],
})
export class DataPresentationListComponent {
	/**
	 * Taille appliquée à la liste et héritée par ses items.
	 */
	readonly size = input<'S' | null>(null);
}
