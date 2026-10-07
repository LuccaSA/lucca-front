import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { intlInputOptions, luBooleanAttribute } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_BOX_TRANSLATIONS } from './box.translate';

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
	readonly intl = input(...intlInputOptions(LU_BOX_TRANSLATIONS));

	/**
	 * Applies the toggle style (`mod-toggle`, deprecated in the SCSS framework), prefer `withArrow`
	 */
	readonly toggle = input(false, { transform: luBooleanAttribute });

	/**
	 * Applies a neutral (grey) background
	 */
	readonly neutral = input(false, { transform: luBooleanAttribute });

	/**
	 * Adds a close button
	 */
	readonly killable = input(false, { transform: luBooleanAttribute });

	/**
	 * Adds an arrow pointing to the field placed above the box
	 */
	readonly withArrow = input(false, { transform: luBooleanAttribute });

	readonly killed = output();
}
