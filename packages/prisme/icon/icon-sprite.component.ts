import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { LuSafeExternalSvgPipe } from '@lucca/prisme/safe-content';

// TODO: point back to the CDN once the sprite is generated and published there.
const ICON_SPRITE_URL = 'https://cdn.lucca.fr/transverse/prisme/icons/svg/sprite.svg';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'pr-icon-sprite',
	templateUrl: './icon-sprite.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [LuSafeExternalSvgPipe],
	host: {
		class: 'pr-u-mask',
		'aria-hidden': 'true',
	},
})
export class IconSpriteComponent {
	protected readonly spriteUrl = ICON_SPRITE_URL;
}
