import { booleanAttribute, Component, ElementRef, inject, input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-divider',
	standalone: true,
	providers: [LuClass],
	template: '<ng-content />',
	styleUrl: './divider.component.scss',
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'divider',
		'[role]': 'separatorRole() || withRole() ? "separator" : null',
		'[class.mod-vertical]': 'vertical()',
	},
})
export class DividerComponent implements OnChanges {
	#luClass = inject(LuClass);

	@ViewChild('content') content: ElementRef;

	separatorRole = input(false, { transform: booleanAttribute });
	vertical = input(false, { transform: booleanAttribute });
	size = input<'M' | 'S' | null>(null);

	// deprecated
	withRole = input(false, { transform: booleanAttribute });

	ngOnChanges(): void {
		this.updateClasses();
	}

	updateClasses(): void {
		const classesConfig = {
			[`mod-${this.size()}`]: !!this.size(),
		};

		this.#luClass.setState(classesConfig);
	}
}
