import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, Signal, signal, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { ColorComponent } from '@lucca-front/ng/color';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LuCoreSelectNoClueDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { startWith } from 'rxjs';
import { injectNgControl } from '../inject-ng-control';
import { NoopValueAccessorDirective } from '../noop-value-accessor.directive';
import { ColorOption } from './color';
import { LU_COLOR_TRANSLATIONS } from './color.translate';

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
	readonly intl = input(...intlInputOptions(LU_COLOR_TRANSLATIONS));

	readonly mouseHighlighted = signal<string>('');
	readonly keyboardHighlighted = signal<string>('');
	readonly highlighted = computed(() => this.mouseHighlighted() || this.keyboardHighlighted());

	readonly clue = signal<string>('');
	readonly colors = input.required<ColorOption[]>();
	readonly clearable = input(false, { transform: booleanAttribute });
	readonly compact = input(false, { transform: booleanAttribute });

	ngControl = injectNgControl();

	readonly currentColorPresentation: Signal<ColorOption | null>;

	constructor() {
		if (this.ngControl && this.ngControl.valueChanges) {
			const controlValueSignal = toSignal(this.ngControl.valueChanges?.pipe(startWith(this.ngControl.value)));
			this.currentColorPresentation = computed(() => {
				return this.colors().find((c) => c.background === controlValueSignal()) || null;
			});
		}
	}

	readonly filteredColors = computed(() => {
		if (this.clue()) {
			return this.colors().filter((color) => color.name.toLowerCase().includes(this.clue().toLowerCase()));
		}
		return this.colors();
	});
}
