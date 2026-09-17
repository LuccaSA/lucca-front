import { ChangeDetectionStrategy, Component, computed, input, model, output, signal, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { ColorComponent } from '@lucca-front/ng/color';
import { intlInputOptions, luBooleanAttribute } from '@lucca-front/ng/core';
import { LuCoreSelectNoClueDirective, LuDisplayerDirective, LuOptionDirective, ɵinjectPointerNavigation } from '@lucca-front/ng/core-select';
import { ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { ColorOption } from './color';
import { LU_COLOR_TRANSLATIONS } from './color.translate';

@Component({
	selector: 'lu-color-input',
	imports: [LuSimpleSelectInputComponent, LuDisplayerDirective, LuOptionDirective, ColorComponent, LuCoreSelectNoClueDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './color-input.component.html',
	styleUrl: './color-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputComponent implements FormValueControl<ColorOption | null> {
	readonly intl = input(...intlInputOptions(LU_COLOR_TRANSLATIONS));

	readonly pointerNavigation = ɵinjectPointerNavigation();
	readonly mouseHighlighted = signal<string>('');
	readonly keyboardHighlighted = signal<string>('');
	readonly highlighted = computed(() => {
		if (!this.pointerNavigation()) {
			return this.keyboardHighlighted();
		}

		return this.mouseHighlighted() || this.keyboardHighlighted();
	});

	readonly clue = signal<string>('');
	readonly colors = input.required<ColorOption[]>();
	readonly clearable = input(false, { transform: luBooleanAttribute });
	readonly compact = input(false, { transform: luBooleanAttribute });

	readonly value = model<ColorOption | null>(null);

	readonly disabled = input(false, { transform: luBooleanAttribute });

	readonly touch = output<void>();

	readonly currentColorPresentation = computed(() => this.colors().find((c) => c.background === this.value()?.background) || null);

	readonly filteredColors = computed(() => {
		if (this.clue()) {
			return this.colors().filter((color) => color.name.toLowerCase().includes(this.clue().toLowerCase()));
		}
		return this.colors();
	});
}
