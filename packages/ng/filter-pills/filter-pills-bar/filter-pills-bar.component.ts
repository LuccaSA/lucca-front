import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChildren, effect, input, model, untracked, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PortalContent, PortalDirective } from '@lucca-front/ng/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { FilterPillComponent } from '../filter-pill/filter-pill.component';

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

	toggleButton = input<boolean, boolean>(false, { transform: booleanAttribute });

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

	pillsState = model<Record<string, boolean>>({});

	pillsByName = computed<Record<string, FilterPillComponent>>(() =>
		this.optionalPills().reduce((acc, pill) => {
			if (!pill.name()) {
				throw new Error(`Optional FilterPillComponent must have a name but component with label "${pill.label()}" does not have one.`);
			}
			return {
				...acc,
				[pill.name()]: pill,
			};
		}, {}),
	);

	constructor() {
		effect(() => {
			const state = untracked(this.pillsState);
			this.optionalPills().forEach((pill) => {
				if (state[pill.name()] === undefined) {
					state[pill.name()] = false;
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
