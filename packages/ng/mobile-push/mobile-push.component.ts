import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_MOBILE_PUSH_TRANSLATIONS } from './mobile-push.translate';

@Component({
	selector: 'lu-mobile-push',
	imports: [IconComponent],
	templateUrl: './mobile-push.component.html',
	styleUrl: './mobile-push.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class MobilePushComponent {
	intl = input(...intlInputOptions(LU_MOBILE_PUSH_TRANSLATIONS));

	appStoreLinkClicked = output<void>();
	googlePlayLinkClicked = output<void>();
}
