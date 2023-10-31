import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';

@Component({
	selector: 'lu-new-badge',
	standalone: true,
	templateUrl: './new-badge.component.html',
	styleUrls: ['./new-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewBadgeComponent {
	@Input({ required: true })
	label: string;

	@HostBinding('class.newBadge')
	newBadge = true;
}
