import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, ContentChild, ElementRef, HostBinding, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass } from '@lucca-front/ng/core';

@Component({
	selector: 'lu-divider',
	standalone: true,
	providers: [LuClass],
	templateUrl: './divider.component.html',
	styleUrls: ['./divider.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
})
export class DividerComponent implements OnChanges {
	#luClass = inject(LuClass);

	@ContentChild('content')
	test: ElementRef;

	@HostBinding('class.divider')
	divider = true;

	@Input({ transform: booleanAttribute })
	public withRole = false;

	// TODO : fix me + add test if content is empty
	@HostBinding('attr.role')
	public role = this.withRole ? 'separator' : null;

	@Input()
	public size: 'M' | 'S';

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
