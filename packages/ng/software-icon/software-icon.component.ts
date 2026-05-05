import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { SoftwareIcon } from './software-icon';
import { SOFTWARE_ICON_WRAPPER, SoftwareIconWrapperContext } from './software-icon-wrapper.context';

@Component({
	selector: 'lu-software-icon',
	templateUrl: './software-icon.component.html',
	styleUrl: './software-icon.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	host: {
		'[class.softwareIconWrapper-item]': 'parent',
		'[attr.role]': 'parent ? "listitem" : null',
	},
})
export class SoftwareIconComponent {
	readonly parent: SoftwareIconWrapperContext | null | undefined = inject(SOFTWARE_ICON_WRAPPER, { optional: true });

	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/software-icon/';
	readonly extension = '.svg';

	readonly icon = input.required<SoftwareIcon>();

	readonly disabled = input(false, { transform: booleanAttribute });
	readonly size = input<'XXS' | 'XS' | 'S' | 'L' | ''>('');

	readonly hidden = signal(false);
	readonly iconUrl = computed(() => `${this.domain}${this.path}${this.icon()}${this.extension}`);

	protected readonly _size = computed(() => (this.size() !== '' ? this.size() : (this.parent?.size?.() ?? '')));
}
