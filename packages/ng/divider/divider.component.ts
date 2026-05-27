import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-divider',
	providers: [LuClass],
	template: '<ng-content />',
	styleUrl: './divider.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'divider',
		'[attr.role]': 'separatorRole() || withRole() ? "separator" : null',
		'[class.mod-vertical]': 'vertical()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent implements OnChanges {
	#luClass = inject(LuClass);

	@ViewChild('content') readonly content: ElementRef;

	/**
	 * Allows rendering the Divider as a native separator
	 * (Any text content it may have will no longer be rendered)
	 */
	readonly separatorRole = input(false, { transform: luBooleanAttribute });

	readonly vertical = input(false, { transform: luBooleanAttribute });

	/**
	 * Which size should the chip be? Defaults or small
	 */
	readonly size = input<'M' | 'S' | null>(null);

	/**
	 * @deprecated
	 */
	readonly withRole = input(false, { transform: luBooleanAttribute });

	readonly classesConfig = computed(() => ({ [`mod-${this.size()}`]: !!this.size() }));

	ngOnChanges(): void {
		this.updateClasses();
	}

	updateClasses(): void {
		this.#luClass.setState(this.classesConfig());
	}
}
