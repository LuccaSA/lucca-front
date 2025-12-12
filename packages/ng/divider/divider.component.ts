import { booleanAttribute, ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

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

	@ViewChild('content') content: ElementRef;

	readonly separatorRole = input(false, { transform: booleanAttribute });
	readonly vertical = input(false, { transform: booleanAttribute });
	readonly size = input<'M' | 'S' | null>(null);

	// deprecated
	readonly withRole = input(false, { transform: booleanAttribute });

	readonly classesConfig = computed(() => ({ [`mod-${this.size()}`]: !!this.size() }));

	ngOnChanges(): void {
		this.updateClasses();
	}

	updateClasses(): void {
		this.#luClass.setState(this.classesConfig());
	}
}
