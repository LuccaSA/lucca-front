import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnChanges, viewChild, ViewEncapsulation } from '@angular/core';
import { luBooleanAttribute, LuClass } from '@lucca-front/ng/core';
import { DividerSize } from './divider.type';

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

	readonly content = viewChild<ElementRef>('content');

	/**
	 * Adds `role="separator"` to the divider so it is announced as a separator by assistive technologies
	 */
	readonly separatorRole = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays the divider vertically.
	 */
	readonly vertical = input(false, { transform: luBooleanAttribute });

	/**
	 * Which size should the divider be? Defaults to the standard size (M)
	 */
	readonly size = input<DividerSize | null>(null);

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
