import { Highlightable } from '@angular/cdk/a11y';
import { Directive, input, output, signal } from '@angular/core';

@Directive({
	standalone: true,
	selector: '[luCoreSelectPanelElement]',
	host: {
		'[attr.id]': 'id',
		'[attr.aria-selected]': 'isSelected()',
		'[class.is-highlighted]': 'isHighlighted()',
		role: 'option',
	},
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class CoreSelectPanelElement<T> implements Highlightable {
	id: string;

	isSelected = input(false);

	option = input<T>();

	isHighlighted = signal(false);

	selected = output<void>();

	setActiveStyles(): void {
		this.isHighlighted.set(true);
	}

	setInactiveStyles(): void {
		this.isHighlighted.set(false);
	}
}
