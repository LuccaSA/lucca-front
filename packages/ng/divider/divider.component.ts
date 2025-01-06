import { booleanAttribute, Component, computed, ElementRef, HostBinding, inject, input, Input, OnChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-divider',
	standalone: true,
	providers: [LuClass],
	template: '<ng-content></ng-content>',
	styleUrls: ['./divider.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DividerComponent implements OnChanges {
	#luClass = inject(LuClass);

	@ViewChild('content') content: ElementRef;

	@HostBinding('class.divider')
	divider = true;

	withRole = input<boolean, boolean>(false, { transform: booleanAttribute });

	role = computed(() => {
		return this.withRole() ? 'separator' : null;
	});

	@HostBinding('attr.role')
	get attrRole() {
		return this.role();
	}

	@Input({ transform: booleanAttribute })
	@HostBinding('class.mod-vertical')
	vertical: false;

	@Input()
	size: 'M' | 'S';

	ngOnChanges(): void {
		this.updateClasses();
	}

	updateClasses(): void {
		const ngClassConfig = {
			[`mod-${this.size}`]: !!this.size,
		};

		this.#luClass.setState(ngClassConfig);
	}
}
