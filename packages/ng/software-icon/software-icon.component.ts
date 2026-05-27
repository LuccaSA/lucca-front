import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { LU_SOFTWARE_ICON_WRAPPER } from './software-icon-wrapper.token';
import { SoftwareIcon, SoftwareIconSize } from './software-icon.type';

@Component({
	selector: 'lu-software-icon',
	templateUrl: './software-icon.component.html',
	styleUrl: './software-icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe, LuTooltipTriggerDirective],
})
export class SoftwareIconComponent {
	readonly wrapper = inject(LU_SOFTWARE_ICON_WRAPPER, { optional: true });

	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/software-icon/';
	readonly extension = '.svg';

	readonly icon = input.required<SoftwareIcon>();

	readonly disabled = input(false, { transform: luBooleanAttribute });
	readonly withTooltip = input(false, { transform: luBooleanAttribute });
	readonly iconAlt = input<string>('');
	readonly size = input<SoftwareIconSize | ''>('');
	readonly iconUrl = computed(() => `${this.domain}${this.path}${this.icon()}${this.extension}`);
}
