import { booleanAttribute, ChangeDetectionStrategy, Component, input, model, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_PLG_PUSH_TRANSLATIONS } from './plg-push.translate';

@Component({
	selector: 'lu-plg-push',
	imports: [IconComponent, ButtonComponent],
	templateUrl: './plg-push.component.html',
	styleUrl: './plg-push.component.scss',
	host: {
		'[attr.hidden]': 'removed() ? "hidden" : null',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PLGPushComponent {
	protected intl = getIntl(LU_PLG_PUSH_TRANSLATIONS);

	readonly heading = input<string>('');

	readonly removable = input(false, { transform: booleanAttribute });

	/**
	 * Is the callout removed? Works with two way binding too.
	 */
	readonly removed = model(false);
}
