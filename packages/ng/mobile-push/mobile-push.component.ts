import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LU_MOBILE_PUSH_TRANSLATIONS } from './mobile-push.translate';

@Component({
	selector: 'lu-mobile-push',
	standalone: true,
	imports: [IconComponent, LuTooltipModule],
	templateUrl: './mobile-push.component.html',
	styleUrl: './mobile-push.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class MobilePushComponent {
	intl = input(...intlInputOptions(LU_MOBILE_PUSH_TRANSLATIONS));

	/**
	 * Emit event when appStoreLink is clicked
	 */
	appStoreLinkClicked = output<void>();

	/**
	 * Emit event when googlePlayLink is clicked
	 */
	googlePlayLinkClicked = output<void>();
}
