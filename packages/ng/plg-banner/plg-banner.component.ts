import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { getIntl } from '../core/translate';
import { IconComponent } from '../icon/icon.component';
import { LU_PLG_BANNER_TRANSLATIONS } from './plg-banner.translate';

@Component({
	selector: 'lu-plg-banner',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './plg-banner.component.html',
	styleUrls: ['./plg-banner.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PLGBannerComponent {
	@Input() public bannerTitle = '';
	@Input() public linkLabel = '';
	@Input() public linkURL: SafeUrl | null = null;

	public intl = getIntl(LU_PLG_BANNER_TRANSLATIONS);
}
