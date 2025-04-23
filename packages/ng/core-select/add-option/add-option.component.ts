import { ChangeDetectionStrategy, Component, inject, input, output, signal, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PortalContent, PortalDirective } from '../../core/portal';
import { KeyManagerElement } from '../key-manager-element';
import { IconComponent } from '../../icon/icon.component';
import { LuMultiSelectInputComponent } from '../../multi-select/input';
import { MULTI_SELECT_INPUT } from '../../multi-select/select.model';

@Component({
	selector: 'lu-add-option',
	imports: [PortalDirective, IconComponent],
	templateUrl: './add-option.component.html',
	styleUrl: './add-option.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'lu-picker-content-add',
	},
})
export class AddOptionComponent implements KeyManagerElement<string>, OnDestroy {
	#selectInput = inject<LuMultiSelectInputComponent<unknown>>(MULTI_SELECT_INPUT);

	label = input<PortalContent>();

	addOption = output<void>();

	id = 'picker-content-add';

	option = 'ɵAddOption';

	highlighted = signal(false);

	toggleActive(): void {
		this.addOption.emit();
	}

	constructor() {
		this.#selectInput.additionalElementsAfter.set([...this.#selectInput.additionalElementsAfter(), this]);
	}

	ngOnDestroy(): void {
		this.#selectInput.additionalElementsAfter.set(this.#selectInput.additionalElementsAfter().filter((el) => el !== this));
	}

	setActiveStyles(): void {
		this.highlighted.set(true);
	}

	setInactiveStyles(): void {
		this.highlighted.set(false);
	}

	getLabel(): string {
		const label = this.label();
		if (typeof label === 'string') {
			return label;
		}
		return '';
	}
}
