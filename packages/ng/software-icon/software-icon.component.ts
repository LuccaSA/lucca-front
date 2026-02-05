import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
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
	readonly domain = 'https://tmp.vincent-valentin.name';
	readonly path = '/lucca/software-icon/';
	readonly extension = '.svg';

	readonly icon = input.required<SoftwareIcon>();

	readonly palette = input<'neutral' | ''>('');
	readonly size = input<'XXS' | 'XS' | 'S' | 'L' | ''>('');

	readonly iconUrl = computed(() => `${this.domain}${this.path}${this.icon()}${this.extension}`);

	readonly paletteClass = computed(() => ({ [`palette-${this.palette()}`]: !!this.palette() }));
}
