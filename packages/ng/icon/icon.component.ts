import { ChangeDetectionStrategy, Component, HostBinding, inject, Input, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-icon',
	standalone: true,
	imports: [CommonModule],
	hostDirectives: [NgClass],
	template: '',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
	#ngClass = inject(NgClass);

	@HostBinding('attr.aria-hidden')
	readonly ariaHidden = true;

	@Input({ required: true })
	set icon(icon: LuccaIcon) {
		this.#ngClass.ngClass = {
			[`icon-${icon}`]: true,
		};
	}

	ngOnInit(): void {
		this.#ngClass.klass = 'lucca-icon';
	}
}
