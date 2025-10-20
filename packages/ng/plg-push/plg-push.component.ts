import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-plg-push',
	imports: [IconComponent],
	templateUrl: './plg-push.component.html',
	styleUrl: './plg-push.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PLGPushComponent {
	@Input() public heading = '';
}
