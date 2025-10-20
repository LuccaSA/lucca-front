import { booleanAttribute, Component, inject, input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-status-badge',
	templateUrl: './statusBadge.component.html',
	styleUrl: './statusBadge.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	imports: [LuTooltipModule],
	host: {
		class: 'statusBadge',
	},
})
export class StatusBadgeComponent implements OnChanges {
	#luClass = inject(LuClass);

	withEllipsis = input(false, { transform: booleanAttribute });

	label = input.required<string>();

	size = input<'L' | 'M'>('M');

	palette = input<Palette | null>(null);

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette(), [`mod-${this.size()}`]: true });
	}
}
