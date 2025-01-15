import { ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, model, untracked, ViewEncapsulation } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { DividerComponent } from '@lucca-front/ng/divider';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'lu-filter-pills-bar',
	imports: [IconComponent, LuTooltipTriggerDirective, PopoverDirective, DividerComponent, ScrollBoxComponent, PortalDirective, FormsModule],
	templateUrl: './filter-pills-bar.component.html',
	styleUrl: './filter-pills-bar.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'filterPillBar',
	},
})
export class FilterPillsBarComponent {
	addonBefore = input<PortalContent | null>(null);
	addonAfter = input<PortalContent | null>(null);

	pills = contentChildren(FilterPillComponent, { descendants: true });

	pillsState = model<Record<string, boolean>>({});

	pillsByName = computed<Record<string, FilterPillComponent>>(() =>
		this.pills().reduce(
			(acc, pill) => ({
				...acc,
				[pill.name()]: pill,
			}),
			{},
		),
	);

	constructor() {
		effect(() => {
			const state = untracked(this.pillsState);
			this.pills().forEach((pill) => {
				if (state[pill.name()] === undefined) {
					state[pill.name()] = true;
				}
			});
			this.pillsState.set(state);
		});

		effect(() => {
			const pillsByName = untracked(this.pillsByName);
			Object.entries(this.pillsState()).forEach(([name, enabled]) => {
				pillsByName[name].hidden = !enabled;
			});
		});
	}

	togglePill(name: string) {
		const state = this.pillsState();
		this.pillsState.set({
			...state,
			[name]: !state[name],
		});
	}
}
