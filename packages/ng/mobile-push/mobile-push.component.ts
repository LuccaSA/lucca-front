import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-mobile-push',
	standalone: true,
	imports: [IconComponent],
	templateUrl: './mobile-push.component.html',
	styleUrls: ['./mobile-push.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class MobilePushComponent {}
