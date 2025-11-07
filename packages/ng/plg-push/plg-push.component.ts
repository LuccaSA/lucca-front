import { booleanAttribute, ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ButtonComponent } from '../button/button.component';

@Component({
	selector: 'lu-plg-push',
	standalone: true,
	imports: [IconComponent, ButtonComponent],
	templateUrl: './plg-push.component.html',
	styleUrl: './plg-push.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class PLGPushComponent {
	@Input() public heading = '';

	@Input({ transform: booleanAttribute })
	removable = false;

	@Input({ transform: booleanAttribute })
	/**
	 * Is the callout removed? Works with two way binding too.
	 */
	removed = false;

	@HostBinding('attr.hidden')
	get hiddenAttr(): 'hidden' | null {
		return this.removed ? 'hidden' : null;
	}

	@Output()
	removedChange: EventEmitter<boolean> = new EventEmitter<boolean>();
}
