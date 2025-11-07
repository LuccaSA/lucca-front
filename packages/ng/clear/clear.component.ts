import { booleanAttribute, ChangeDetectionStrategy, Component, contentChildren, ElementRef, EventEmitter, forwardRef, input, Output, ViewEncapsulation } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { ALuClear, ILuClear } from './clear.model';
import { LU_CLEAR_TRANSLATIONS } from './clear.translate';

@Component({
	selector: 'lu-clear',
	standalone: true,
	styleUrl: './clear.component.scss',
	templateUrl: './clear.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	exportAs: 'luClearer',
	host: {
		role: 'button',
		class: 'clear',
		'[attr.tabindex]': 'disabled() ? null : "0"',
		'[attr.disabled]': 'disabled() ? "disabled" : null',
		'[class.mod-S]': 'size() === "S"',
		'[class.palette-product]': 'product()',
		'[class.mod-inverted]': 'inverted()',
		'(click)': 'clear($event)',
		'(keyup.space)': 'clear($event)',
		'(keydown.enter)': '$event.preventDefault(); $event.stopPropagation(); clear($event)',
		'(keydown.space)': '$event.preventDefault(); $event.stopPropagation()',
	},
	providers: [
		{
			provide: ALuClear,
			useExisting: forwardRef(() => ClearComponent),
		},
	],
})
export class ClearComponent<T> extends ALuClear<T> implements ILuClear<T> {
	intl = getIntl(LU_CLEAR_TRANSLATIONS);

	size = input<'S' | null>(null);
	disabled = input(false, { transform: booleanAttribute });
	product = input(false, { transform: booleanAttribute });
	inverted = input(false, { transform: booleanAttribute });

	// eslint-disable-next-line @angular-eslint/no-output-on-prefix
	@Output() override onClear = new EventEmitter<T>();

	contentRef = contentChildren<ElementRef>('content');

	clear($event: Event) {
		$event.preventDefault();
		$event.stopPropagation();

		this.onClear.emit();
	}
}
