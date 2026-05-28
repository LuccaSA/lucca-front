import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { luBooleanAttribute } from '@lucca-front/ng/core';
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
	readonly toggle = input(false, { transform: luBooleanAttribute });

	readonly neutral = input(false, { transform: luBooleanAttribute });

	readonly killable = input(false, { transform: luBooleanAttribute });

	readonly withArrow = input(false, { transform: luBooleanAttribute });

	readonly killed = output();
}
