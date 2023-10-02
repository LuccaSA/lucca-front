import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, OnInit } from '@angular/core';
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
export class IconComponent implements OnChanges, OnInit {
	#ngClass = inject(NgClass);

	@Input({ required: true })
	icon: LuccaIcon;

	ngOnChanges(): void {
		this.#ngClass.ngClass = {
			[`icon-${this.icon}`]: true,
		};
	}

	ngOnInit(): void {
		this.#ngClass.klass = 'lucca-icon';
	}
}
