import { ChangeDetectionStrategy, Component, computed, forwardRef, input, numberAttribute, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute } from '@lucca-front/ng/core';
import { Palette } from '@lucca/prisme/core';
import { LU_MAIN_LAYOUT_INSTANCE } from './main-layout.token';
import { MainLayoutIllustrationEndStart, MainLayoutIllustrationStartEnd } from './main-layout.type';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

function bubblesCountAttribute(value: unknown): 1 | 2 | 3 | null {
	const n = numberAttribute(value);
	return n === 1 || n === 2 || n === 3 ? n : 1;
}

@Component({
	selector: 'lu-main-layout',
	styleUrl: './main-layout.component.scss',
	templateUrl: './main-layout.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'mainLayout',
		role: 'main',
		id: 'main-content',
		tabindex: '-1',
		'[class]': 'hostClass()',
	},
	providers: [
		{
			provide: LU_MAIN_LAYOUT_INSTANCE,
			useExisting: forwardRef(() => MainLayoutComponent),
		},
	],
})
export class MainLayoutComponent {
	readonly domain = 'https://cdn.lucca.fr';
	readonly path = '/transverse/prisme/visuals/main-layout/';
	readonly extension = '.svg';

	// https://cdn.lucca.fr/transverse/prisme/visuals/main-layout/bubbles/endStart-1.svg

	/**
	 * Sticks header on the screen
	 */
	readonly headerSticky = input(false, { transform: luBooleanAttribute });

	/**
	 * Sticks footer on the screen
	 */
	readonly footerSticky = input(false, { transform: luBooleanAttribute });

	readonly bubblesStartEnd = input<1 | 2 | 3 | null>(null, { transform: bubblesCountAttribute });
	readonly bubblesEndStart = input<1 | 2 | 3 | null>(null, { transform: bubblesCountAttribute });

	readonly illustrationStartEnd = input<MainLayoutIllustrationStartEnd | null>(null);

	readonly illustrationEndStart = input<MainLayoutIllustrationEndStart | null>(null);

	readonly palette = input<Palette>('none');
	readonly responsive = input<'wideM' | null>(null);

	readonly hostClass = computed(() => ({
		[`palette-${this.palette()}`]: !!this.palette(),
		[`mod-${this.responsive()}`]: !!this.responsive(),
	}));

	readonly illustrationStartEndUrl = computed(() => {
		if (!this.illustrationStartEnd()) {
			return null;
		}
		if (this.illustrationStartEnd()?.startsWith('https://') || this.illustrationStartEnd()?.startsWith('/')) {
			return this.illustrationStartEnd();
		}
		return `${this.domain}${this.path}illustrations/startEnd/${this.illustrationStartEnd()}${this.extension}`;
	});

	readonly illustrationEndStartUrl = computed(() => {
		if (!this.illustrationEndStart()) {
			return null;
		}
		if (this.illustrationEndStart()?.startsWith('https://') || this.illustrationEndStart()?.startsWith('/')) {
			return this.illustrationEndStart();
		}
		return `${this.domain}${this.path}illustrations/endStart/${this.illustrationEndStart()}${this.extension}`;
	});

	readonly bubblesIllustrationStartEnd = computed(() => {
		return !this.bubblesStartEnd() && this.illustrationStartEnd() ? 1 : this.bubblesStartEnd();
	});

	readonly bubblesIllustrationEndStart = computed(() => {
		return !this.bubblesEndStart() && this.illustrationEndStart() ? 1 : this.bubblesEndStart();
	});
}
