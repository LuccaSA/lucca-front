import { booleanAttribute, ChangeDetectionStrategy, Component, HostBinding, Input, model, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_PLG_PUSH_TRANSLATIONS } from './plg-push.translate';

@Component({
	selector: 'lu-plg-push',
	imports: [IconComponent, ButtonComponent],
	templateUrl: './plg-push.component.html',
	styleUrl: './plg-push.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PLGPushComponent {
	protected intl = getIntl(LU_PLG_PUSH_TRANSLATIONS);

	@Input() public heading = '';

	@Input({ transform: booleanAttribute })
	removable = false;

	/**
	 * Is the callout removed? Works with two way binding too.
	 */
	removed = model(false);

	@HostBinding('attr.hidden')
	get hiddenAttr(): 'hidden' | null {
		return this.removed() ? 'hidden' : null;
	}
}
