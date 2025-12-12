import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-new-badge',
	templateUrl: './new-badge.component.html',
	styleUrl: './new-badge.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class NewBadgeComponent {
	@Input({ required: true })
	label: string;

	@HostBinding('class.newBadge')
	newBadge = true;
}
