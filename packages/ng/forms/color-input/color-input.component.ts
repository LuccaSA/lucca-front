import { booleanAttribute, ChangeDetectionStrategy, Component, computed, HostListener, input, model, output, signal, ViewEncapsulation } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';
import { ColorComponent } from '@lucca-front/ng/color';
import { intlInputOptions } from '@lucca-front/ng/core';
import { LuCoreSelectNoClueDirective, LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { ColorOption } from './color';
import { LU_COLOR_TRANSLATIONS } from './color.translate';
import { ɵPresentationDisplayDefaultDirective } from '@lucca-front/ng/form-field';

@Component({
	selector: 'lu-color-input',
	imports: [LuSimpleSelectInputComponent, LuDisplayerDirective, LuOptionDirective, ColorComponent, LuCoreSelectNoClueDirective, ɵPresentationDisplayDefaultDirective],
	templateUrl: './color-input.component.html',
	styleUrl: './color-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorInputComponent implements FormValueControl<ColorOption | null> {
	intl = input(...intlInputOptions(LU_COLOR_TRANSLATIONS));

	pointerNavigation = signal(false);
	mouseHighlighted = signal<string>('');
	keyboardHighlighted = signal<string>('');
	highlighted = computed(() => {
		if (!this.pointerNavigation()) {
			return this.keyboardHighlighted();
		}

		return this.mouseHighlighted() || this.keyboardHighlighted();
	});

	clue = signal<string>('');
	colors = input.required<ColorOption[]>();
	clearable = input(false, { transform: booleanAttribute });
	compact = input(false, { transform: booleanAttribute });

	readonly value = model<ColorOption | null>(null);

	readonly disabled = input(false, { transform: booleanAttribute });

	readonly touch = output<void>();

	readonly currentColorPresentation = computed(() => this.colors().find((c) => c.background === this.value()?.background) || null);

	filteredColors = computed(() => {
		if (this.clue()) {
			return this.colors().filter((color) => color.name.toLowerCase().includes(this.clue().toLowerCase()));
		}
		return this.colors();
	});

	@HostListener('document:keydown')
	onKeydown(): void {
		this.pointerNavigation.set(false);
	}

	@HostListener('document:mousemove')
	onMousemove(): void {
		this.pointerNavigation.set(true);
	}
}
