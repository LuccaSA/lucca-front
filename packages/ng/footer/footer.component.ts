import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { FooterContainerMax, FooterNarrowAtMediaMax } from './footer.type';

@Component({
	selector: 'lu-footer',
	styleUrl: './footer.component.scss',
	templateUrl: './footer.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet, ContainerComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	readonly sticky = input(false, { transform: booleanAttribute });

	/**
	 * Applies a container around the Page Header content
	 */
	readonly container = input(false, { transform: booleanAttribute });

	readonly containerMax = input<FooterContainerMax | null>();

	readonly forceNarrow = input(false, { transform: booleanAttribute });

	readonly dialog = input(false, { transform: booleanAttribute });

	readonly narrowAtMediaMax = input<FooterNarrowAtMediaMax>('XXS');

	readonly breakpointClass = computed(() => (this.forceNarrow() ? 'mod-narrow' : { [`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax() }));
}
