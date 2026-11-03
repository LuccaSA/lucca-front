import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { luOptionalNumberAttribute } from '@lucca-front/ng/core';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { OrnamentBubble, OrnamentIllustration } from './ornament.type';

const ORNAMENT_CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/ornament';

@Component({
	selector: 'lu-ornament',
	templateUrl: './ornament.component.html',
	styleUrl: './ornament.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'ornament',
	},
})
export class OrnamentComponent {
	/**
	 * Decorative bubble displayed behind the illustration, based on the CDN image bubble number.
	 */
	readonly bubble = input<OrnamentBubble | number>(undefined, { transform: luOptionalNumberAttribute });

	/**
	 * Decorative illustration displayed in front of the bubble.
	 * An URL can be applied for custom images
	 */
	readonly illustration = input<OrnamentIllustration | string>();

	readonly bubbleSrc = computed(() => {
		const bubble = this.bubble();
		return bubble ? `${ORNAMENT_CDN_PATH}/bubbles/${bubble}.svg` : null;
	});

	readonly illustrationSrc = computed(() => {
		const illustration = this.illustration();
		if (!illustration) {
			return null;
		}
		return illustration.includes('/') ? illustration : `${ORNAMENT_CDN_PATH}/generic/${illustration}.svg`;
	});
}
