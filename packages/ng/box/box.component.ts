import { booleanAttribute, ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'lu-box',
	templateUrl: './box.component.html',
	styleUrl: './box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, ButtonComponent],
	host: {
		class: 'box',
		'[class.mod-toggle]': 'toggle()',
		'[class.mod-neutral]': 'neutral()',
		'[class.mod-withArrow]': 'withArrow()',
	},
})
export class BoxComponent {
	readonly toggle = input(false, { transform: booleanAttribute });

	readonly neutral = input(false, { transform: booleanAttribute });

	readonly killable = input(false, { transform: booleanAttribute });

	readonly withArrow = input(false, { transform: booleanAttribute });
}
