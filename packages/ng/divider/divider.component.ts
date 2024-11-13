import { booleanAttribute, Component, computed, contentChild, ElementRef, HostBinding, inject, input, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-divider',
	standalone: true,
	providers: [LuClass],
	templateUrl: './divider.component.html',
	styleUrls: ['./divider.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class DividerComponent implements OnChanges {
	#luClass = inject(LuClass);

	content = contentChild<ElementRef<HTMLElement>>('contentRef');

	@HostBinding('class.divider')
	divider = true;

	withRole = input<boolean, boolean>(false, { transform: booleanAttribute });

	role = computed(() => {
		return this.withRole() && this.content()?.nativeElement.innerHTML.trim().length === 0 ? 'separator' : null;
	});

	@HostBinding('attr.role')
	get attrRole() {
		return this.role();
	}

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
