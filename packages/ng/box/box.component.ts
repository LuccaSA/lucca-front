import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { IconComponent } from '../icon/icon.component';

@Component({
	selector: 'lu-box',
	standalone: true,
	templateUrl: './box.component.html',
	styleUrls: ['./box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, ButtonComponent],
	host: {
		class: 'box',
		'[class.mod-toggle]': 'toggle()',
		'[class.mod-neutral]': 'neutral()',
	},
})
export class BoxComponent {
	toggle = input(false, { transform: booleanAttribute });
	neutral = input(false, { transform: booleanAttribute });
	killable = input(false, { transform: booleanAttribute });
}
