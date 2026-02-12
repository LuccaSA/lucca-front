import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, Signal, signal, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from '@lucca-front/ng/color';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LuCoreSelectNoClueDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { ColorOption } from './color';
import { LU_COLOR_TRANSLATIONS } from './color.translate';
import { ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { toSignal } from '@angular/core/rxjs-interop';
import { startWith } from 'rxjs';

@Component({
	selector: 'lu-color-input',
	imports: [ReactiveFormsModule, LuSimpleSelectInputComponent, LuDisplayerDirective, LuOptionDirective, ColorComponent, LuCoreSelectNoClueDirective, ɵPresentationDisplayDefaultDirective],
	hostDirectives: [NoopValueAccessorDirective],
	templateUrl: './color-input.component.html',
	styleUrl: './color-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputComponent {
	intl = input(...intlInputOptions(LU_COLOR_TRANSLATIONS));

	mouseHighlighted = signal<string>('');
	keyboardHighlighted = signal<string>('');
	highlighted = computed(() => this.mouseHighlighted() || this.keyboardHighlighted());

	clue = signal<string>('');
	colors = input.required<ColorOption[]>();
	clearable = input(false, { transform: booleanAttribute });
	compact = input(false, { transform: booleanAttribute });

	ngControl = injectNgControl();

	currentColorPresentation: Signal<ColorOption | null>;

	constructor() {
		if (this.ngControl) {
			const controlValueSignal = toSignal(this.ngControl.valueChanges?.pipe(startWith(this.ngControl.value)));
			this.currentColorPresentation = computed(() => {
				return this.colors().find((c) => c.background === controlValueSignal()) || null;
			});
		}
	}

	filteredColors = computed(() => {
		if (this.clue()) {
			return this.colors().filter((color) => color.name.toLowerCase().includes(this.clue().toLowerCase()));
		}
		return this.colors();
	});
}
