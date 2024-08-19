import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

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
}
