import { ChangeDetectionStrategy, Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { PortalContent, PortalDirective } from '../../core/portal';
import { IconComponent } from '../../icon/icon.component';
import { CoreSelectPanelElement } from '../panel/selectable-item';
import { outputToObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
	selector: 'lu-add-option',
	imports: [PortalDirective, IconComponent, CoreSelectPanelElement],
	templateUrl: './add-option.component.html',
	styleUrl: './add-option.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'lu-picker-content-add',
	},
})
export class AddOptionComponent {
	readonly #selectableItem = inject(CoreSelectPanelElement);
	label = input<PortalContent>();

	addOption = output<void>();

	id = 'picker-content-add';

	option = 'ɵAddOption';

	constructor() {
		outputToObservable(this.#selectableItem.selected)
			.pipe(takeUntilDestroyed())
			.subscribe(() => {
				this.addOption.emit();
			});
	}
}
