import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from '@lucca-front/ng/color';
import { getIntl } from '@lucca-front/ng/core';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { ColorOption } from './color';
import { LU_COLOR_TRANSLATIONS } from './color.translate';

@Component({
	selector: 'lu-color-input',
	imports: [ReactiveFormsModule, LuSimpleSelectInputComponent, LuDisplayerDirective, LuOptionDirective, ColorComponent],
	hostDirectives: [NoopValueAccessorDirective],
	templateUrl: './color-input.component.html',
	styleUrl: './color-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputComponent {
	intl = getIntl(LU_COLOR_TRANSLATIONS);

	mouseHighlighted = signal<string>('');
	keyboardHighlighted = signal<string>('');
	highlighted = computed(() => this.mouseHighlighted() || this.keyboardHighlighted());

	clue = signal<string>('');
	colors = input.required<ColorOption[]>();
	clearable = input(false, { transform: booleanAttribute });
	noSearch = input(false, { transform: booleanAttribute });

	ngControl = injectNgControl();

	filteredColors = computed(() => {
		if (this.clue()) {
			return this.colors().filter((color) => color.name.toLowerCase().includes(this.clue().toLowerCase()));
		}
		return this.colors();
	});
}
