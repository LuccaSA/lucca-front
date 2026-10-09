import { signal } from '@angular/core';
import { ReorderEvent } from '@lucca-front/ng/reorder';
import { Meta, StoryObj } from '@storybook/angular-vite';
import {
	CONNECTED_LISTS_ARG_TYPES,
	CONNECTED_LISTS_DECORATORS,
	formatReorderEvent,
	reorder,
	shortcutsHiddenValue,
	actionsExcludedValue,
	ReorderConnectedListsStory,
	STYLES,
} from './connected-lists.helpers';

export default {
	title: 'Documentation/Listings/Reorder/Angular/Connected lists',
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
			{ label: 'Semis', items: ['Carotte', 'Poireau', 'Navet'] },
			{ label: 'Serre', items: ['Tomate'] },
			{ label: 'En pousse', items: ['Courgette', 'Potiron'] },
			{ label: 'Récolte', items: ['Radis'] },
		];

		const lastEvent = signal('');
		const listName = (data: string[]) => columns.find((column) => column.items === data)?.label ?? '';

		return {
			props: {
				columns,
				lastEvent,
				onReorder: (event: ReorderEvent<string[]>) => {
					reorder(event);
					lastEvent.set(formatReorderEvent(event, listName));
					luReorder?.(event);
				},
			},
			template: `<div class="reorderDemo" cdkDropListGroup>
	@for (column of columns; track column.label) {
		<section class="reorderDemo-column">
			<h3 class="reorderDemo-column-title">{{ column.label }}</h3>
			<ul
				class="reorderDemo-list"
				cdkDropList
				[cdkDropListData]="column.items"
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

export const ConnectedLists: StoryObj<ReorderConnectedListsStory> = {
	args: {
		luReorderActionsExcluded: [],
		luReorderShortcutsHidden: [],
	},
};
