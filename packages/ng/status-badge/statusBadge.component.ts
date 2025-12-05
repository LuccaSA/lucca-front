import { booleanAttribute, ChangeDetectionStrategy, Component, inject, input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@Component({
	selector: 'lu-status-badge',
	templateUrl: './statusBadge.component.html',
	styleUrl: './statusBadge.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [LuClass],
	imports: [LuTooltipModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'statusBadge',
	},
})
export class StatusBadgeComponent implements OnChanges {
	readonly #luClass = inject(LuClass);

	readonly withEllipsis = input(false, { transform: booleanAttribute });

	readonly label = input.required<string>();

	readonly size = input<'L' | 'M'>('M');

	readonly palette = input<Palette | null>(null);

	ngOnChanges(): void {
		this.#luClass.setState({ [`palette-${this.palette()}`]: !!this.palette(), [`mod-${this.size()}`]: true });
	}
}
