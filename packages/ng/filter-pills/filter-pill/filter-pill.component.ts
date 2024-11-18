import { ChangeDetectionStrategy, Component, computed, HostBinding, input, model, Signal, signal, ViewEncapsulation, WritableSignal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { DateInputComponent } from '../../date2/date-input/date-input.component';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '../../icon/icon.component';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-filter-pill',
	standalone: true,
	imports: [ButtonComponent, PopoverDirective, DateInputComponent, FormsModule, IconComponent],
	templateUrl: './filter-pill.component.html',
	styleUrl: './filter-pill.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterPillComponent {
	// Un input "genre" placeholder pour aller dans le bouton, avec valeur par défaut
	placeholder = input<string>('TODO i18n placeholder');

	icon = input<LuccaIcon>('arrowChevronBottom');

	label = input.required<string>();

	value = model<unknown>(null);

	// Si on a une valeur, on le vire et on met l'affichage de la valeur
	valueDisplay: Signal<string> = computed(() => (this.value() == null ? '' : this.value().toString()));

	@HostBinding('class.is-empty')
	get isEmpty() {
		return this.valueDisplay()?.length === 0;
	}

	// Toujours un clear, button.filterPill-clear CSS gère sa visibilité via is-empty

	// à l'ouverture du popover, son premier champ prends le focus

	// Garder en tête le cas de la checkbox pill

	clear(): void {
		//TODO
		this.value.set(null);
	}
}
