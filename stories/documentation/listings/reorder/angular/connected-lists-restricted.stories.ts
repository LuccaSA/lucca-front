import { signal } from '@angular/core';
import { ReorderEvent } from '@lucca-front/ng/reorder';
import { Meta, StoryObj } from '@storybook/angular-vite';
import {
	acceptAll,
	CONNECTED_LISTS_ARG_TYPES,
	CONNECTED_LISTS_DECORATORS,
	refuseAll,
	formatReorderEvent,
	reorder,
	shortcutsHiddenValue,
	actionsExcludedValue,
	ReorderConnectedListsStory,
	STYLES,
} from './connected-lists.helpers';

/**
 * The lists offered in the move menu follow the CDK connections: here, a one-way workflow where an item only moves to the next step,
 * nothing leaves "Récolte", and "Serre" is skipped as it is closed
 */
export default {
	title: 'Documentation/Listings/Reorder/Angular/Connected lists restricted',
	decorators: CONNECTED_LISTS_DECORATORS,
	argTypes: CONNECTED_LISTS_ARG_TYPES,
	render: ({ luReorder, luReorderActionsExcluded, luReorderShortcutsHidden }: ReorderConnectedListsStory) => {
		const excluded = actionsExcludedValue(luReorderActionsExcluded);
		const hidden = shortcutsHiddenValue(luReorderShortcutsHidden, luReorderActionsExcluded);
		// Written on their own line in the template, so their indentation is displayed like the other attributes
		const actions = excluded
			? `
				[luReorderActionsExcluded]="${excluded}"`
			: '';
		const shortcutsHidden = hidden
			? `
				[luReorderShortcutsHidden]="${hidden}"`
			: '';
		const columns = [
			{ id: 'semis', label: 'Semis', items: ['Carotte', 'Poireau', 'Navet'], connectedTo: ['serre', 'en-pousse'], closed: false },
			{ id: 'serre', label: 'Serre', items: ['Tomate'], connectedTo: ['en-pousse'], closed: true },
			{ id: 'en-pousse', label: 'En pousse', items: ['Courgette', 'Potiron'], connectedTo: ['recolte'], closed: false },
			{ id: 'recolte', label: 'Récolte', items: ['Radis'], connectedTo: [] as string[], closed: false },
		];

		const lastEvent = signal('');
		const listName = (data: string[]) => columns.find((column) => column.items === data)?.label ?? '';

		return {
			props: {
				columns,
				lastEvent,
				acceptAll,
				refuseAll,
				onReorder: (event: ReorderEvent<string[]>) => {
					reorder(event);
					lastEvent.set(formatReorderEvent(event, listName));
					luReorder?.(event);
				},
			},
			template: `<div class="reorderDemo">
	@for (column of columns; track column.id) {
		<section class="reorderDemo-column">
			<h3 class="reorderDemo-column-title" [class.is-disabled]="column.closed">
				{{ column.label }}
				@if (column.closed) {
					<span class="tag mod-disabled">Fermée</span>
				}
			</h3>
			<ul
				class="reorderDemo-list"
				[class.is-disabled]="column.closed"
				cdkDropList
				[id]="column.id"
				[cdkDropListData]="column.items"
				[cdkDropListConnectedTo]="column.connectedTo"
				[cdkDropListEnterPredicate]="column.closed ? refuseAll : acceptAll"
				luReorder
				[luReorderLabel]="column.label"${actions}${shortcutsHidden}
				(luReorder)="onReorder($event)"
			>
				@for (item of column.items; track item) {
					<li class="reorderDemo-list-item" cdkDrag [luReorderItemLabel]="item">
						<button type="button" lu-reorder-handle class="button mod-ghost mod-onlyIcon mod-S">
							<lu-icon icon="dotsDrag" />
						</button>
						{{ item }}
					</li>
				}
			</ul>
		</section>
	}
</div>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>`,
			styles: [STYLES],
		};
	},
} as Meta<ReorderConnectedListsStory>;

export const ConnectedListsRestricted: StoryObj<ReorderConnectedListsStory> = {
	args: {
		luReorderActionsExcluded: [],
		luReorderShortcutsHidden: [],
	},
};
