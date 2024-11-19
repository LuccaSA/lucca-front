import { ChangeDetectionStrategy, Component, computed, contentChild, effect, HostBinding, input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuccaIcon } from '@lucca-front/icons';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { IconComponent } from '../../icon/icon.component';
import { FILTER_PILL_INPUT_COMPONENT } from '../core/filter-pill-input-component';

@Component({
	selector: 'lu-filter-pill',
	standalone: true,
	imports: [PopoverDirective, FormsModule, IconComponent],
	templateUrl: './filter-pill.component.html',
	styleUrl: './filter-pill.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'filterPill',
	},
})
export class FilterPillComponent {
	inputComponentRef = contentChild(FILTER_PILL_INPUT_COMPONENT);
	// Avoir un CVA sur la barre de filtres

	// TODO Selects: Fournir une couche autour d'overlayRef qui décide d'attacher le panel sur un overlay ou un ng-container dans le cas d'un pill

	/**
	 * lu-multi-select
	 * 		// injection du parent pour lui set le portalContent
	 * 		ng-container *luPillDisplayer="let label=label; let placeholder=placeholder; let isEmpty=isEmpty"
	 *
	 */

	// Un input "genre" placeholder pour aller dans le bouton, avec valeur par défaut
	placeholder = input<string>('TODO i18n placeholder');

	icon = input<LuccaIcon>('arrowChevronBottom');

	// DefaultIcon set par l'enfant pour combiner into une icône

	label = input.required<string>();

	#inputIsEmpty = computed(() => this.inputComponentRef()?.isFilterPillEmpty());

	@HostBinding('class.is-empty')
	get isEmpty() {
		return this.#inputIsEmpty();
	}

	constructor() {
		effect(() => {
			this.inputComponentRef()?.enableFilterPillMode();
		});
	}

	// Toujours un clear, button.filterPill-clear CSS gère sa visibilité via is-empty

	// à l'ouverture du popover, son premier champ prends le focus

	// Garder en tête le cas de la checkbox pill

	clear(): void {
		//TODO
	}
}
