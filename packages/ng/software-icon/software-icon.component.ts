import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SoftwareIcon } from './software-icon';

@Component({
	selector: 'lu-software-icon',
	templateUrl: './software-icon.component.html',
	styleUrl: './software-icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
})
export class SoftwareIconComponent {
	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/software-icon/';
	readonly extension = '.svg';

	readonly icon = input.required<SoftwareIcon>();

	readonly disabled = input(false, { transform: booleanAttribute });
	readonly size = input<'XXS' | 'XS' | 'S' | 'L' | ''>('');

	readonly iconUrl = computed(() => `${this.domain}${this.path}${this.icon()}${this.extension}`);
}
