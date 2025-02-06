import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, contentChildren, signal, TemplateRef, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getIntl } from '@lucca-front/ng/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';
import { LU_FILTER_PILLS_TRANSLATIONS } from '../filter-pills.translate';

@Component({
	selector: 'lu-filter-pills-bar',
	imports: [IconComponent, LuTooltipTriggerDirective, PopoverDirective, DividerComponent, ScrollBoxComponent, FormsModule, NgTemplateOutlet],
	templateUrl: './filter-pills-bar.component.html',
	styleUrl: './filter-pills-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'filterPillBar',
	},
})
export class FilterPillsBarComponent {
	intl = getIntl(LU_FILTER_PILLS_TRANSLATIONS);

	addonBefore = signal<TemplateRef<unknown> | null>(null);
	addonAfter = signal<TemplateRef<unknown> | null>(null);

	popoverPositions: ConnectionPositionPair[] = [
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'bottom' },
			{
				overlayX: 'start',
				overlayY: 'top',
			},
			-4,
			0,
		),
		new ConnectionPositionPair(
			{ originX: 'start', originY: 'top' },
			{
				overlayX: 'start',
				overlayY: 'bottom',
			},
			-4,
			0,
		),
	];

	pills = contentChildren(FilterPillComponent, { descendants: true });

	optionalPills = computed(() => this.pills().filter((pill) => pill.optional()));
}
