import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { getIntl } from '../core/translate';
import { IconComponent } from '../icon/icon.component';
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
	@Input() public pushTitle = '';
	@Input() public linkLabel = '';
	@Input() public linkURL: SafeUrl | null = null;

	public intl = getIntl(LU_PLG_PUSH_TRANSLATIONS);
}
