import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_PLG_PUSH_TRANSLATIONS } from './plg-push.translate';

@Component({
	selector: 'lu-plg-push',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './plg-push.component.html',
	styleUrls: ['./plg-push.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PLGPushComponent {
	@Input() public heading = '';

	public intl = getIntl(LU_PLG_PUSH_TRANSLATIONS);
}
