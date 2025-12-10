import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, computed, input, numberAttribute } from '@angular/core';
import { Palette, PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Hx } from '../empty-state.model';

@Component({
	selector: 'lu-empty-state-section',
	imports: [LuSafeExternalSvgPipe, PortalDirective],
	templateUrl: './empty-state-section.component.html',
	styleUrl: './empty-state-section.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class EmptyStateSectionComponent {
	/**
	 * Icon URL
	 */
	readonly icon = input<string>('https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknote.svg');

	readonly palette = input<Palette>('none');

	readonly center = input(false, { transform: booleanAttribute });

	readonly heading = input<string>();

	readonly description = input<PortalContent>();

	readonly hx = input(3, { transform: numberAttribute as (value: Hx | `${Hx}`) => Hx });

	readonly emptyStateClasses = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
