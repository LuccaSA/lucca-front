import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { LOCALE_ID } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import {
	LuReorderTranslations,
	luReorderTranslations,
	ReorderDirective,
	ReorderEvent,
	ReorderHandleComponent,
	ReorderItemLabelDirective,
	ReorderMenuEntry,
	ReorderOptionalAction,
} from '@lucca-front/ng/reorder';
import { applicationConfig, ArgTypes, moduleMetadata } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { intlArgType } from '@/helpers/stories';

/**
 * Shared by the connected lists stories, kept out of a `.stories.ts` file where every named export would be a story
 */

export interface ReorderConnectedListsStory {
	luReorderActionsExcluded: ReorderOptionalAction[];
	luReorderShortcutsHidden: ReorderMenuEntry[];
	luReorderIntl?: Partial<LuReorderTranslations>;
	luReorder?: (event: ReorderEvent<string[]>) => void;
}

export const STYLES = `
	.reorderDemo {
		display: grid;
		grid-auto-columns: minmax(0, 1fr);
		grid-auto-flow: column;
		gap: var(--pr-t-spacings-200);
	}

	.reorderDemo-column {
		display: flex;
		flex-direction: column;
		gap: var(--pr-t-spacings-100);
	}

	.reorderDemo-column-title {
		display: flex;
		align-items: center;
		gap: var(--pr-t-spacings-100);
		margin: 0;
		padding-inline: var(--pr-t-spacings-100);

		&.is-disabled {
			color: var(--pr-t-color-text-disabled);
		}
	}

	.reorderDemo-list {
		display: flex;
		flex-direction: column;
		gap: var(--pr-t-spacings-100);
		flex-grow: 1;
		min-block-size: 3rem;
		margin: 0;
		padding: var(--pr-t-spacings-100);
		list-style: none;
		background-color: var(--pr-t-elevation-surface-default);
		border-radius: var(--pr-t-border-radius-default);

		&.is-disabled {
			background-color: var(--pr-t-color-input-background-disabled);
		}
	}

	.reorderDemo-list-item {
		display: flex;
		align-items: center;
		gap: var(--pr-t-spacings-100);
		padding: var(--pr-t-spacings-50);
		border-radius: var(--pr-t-border-radius-default);

		// The drag preview and placeholder keep their global CDK styles
		&:not(.cdk-drag-preview, .cdk-drag-placeholder) {
			background-color: var(--pr-t-elevation-surface-raised);
		}
	}`;

/**
 * A closed column refuses every item, from its menu as when dragging it
 */
export const refuseAll = (): boolean => false;

export const acceptAll = (): boolean => true;

/**
 * Moves the item in its list or to another one, as the CDK documentation does
 */
export function reorder(event: ReorderEvent<string[]>): void {
	if (event.previousContainer === event.container) {
		moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
	} else {
		transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
	}
}

/**
 * `luReorderActionsExcluded` control: only the actions that can be left out
 */
export const ACTIONS_EXCLUDED_ARG_TYPE: ArgTypes[string] = {
	control: 'check',
	options: ['first', 'last'],
	description: 'Actions retirées des poignées, du menu comme du clavier : « Déplacer en premier / en dernier ».',
	table: { category: 'inputs', type: { summary: 'ReorderOptionalAction[]' }, defaultValue: { summary: '[]' } },
};

/**
 * Value of `luReorderActionsExcluded` in the template, or `null` when no action is excluded (its default value)
 */
export function actionsExcludedValue(excluded: ReorderOptionalAction[] = []): string | null {
	return excluded.length ? `[${excluded.map((action) => `'${action}'`).join(', ')}]` : null;
}

/**
 * `luReorderShortcutsHidden` control: the menu entries of a single list, or of connected lists
 */
export function shortcutsHiddenArgType(entries: ReorderMenuEntry[]): ArgTypes[string] {
	return {
		control: 'check',
		options: entries,
		description: 'Lignes du menu dont le raccourci clavier n’est pas affiché (`true` pour toutes). Les raccourcis restent actifs. Sans effet sur une action retirée par `luReorderActionsExcluded`.',
		table: { category: 'inputs', type: { summary: 'boolean | ReorderMenuEntry[]' }, defaultValue: { summary: '[]' } },
	};
}

/**
 * Value of `luReorderShortcutsHidden` in the template, or `null` when no entry is hidden (its default value).
 * The entries of the actions excluded by `luReorderActionsExcluded` are ignored, as they are not in the menu
 */
export function shortcutsHiddenValue(entries: ReorderMenuEntry[] = [], excluded: ReorderOptionalAction[] = []): string | null {
	const shown = entries.filter((entry) => !excluded.includes(entry as ReorderOptionalAction));
	return shown.length ? `[${shown.map((entry) => `'${entry}'`).join(', ')}]` : null;
}

/**
 * Displays a reorder event in `pr-story-model-display`: its lists are `CdkDropList` instances, replaced by their name
 * when the event comes from connected lists, and left out when the item stays in its list
 */
export function formatReorderEvent(event: ReorderEvent<string[]>, listName?: (data: string[]) => string): string {
	const { previousIndex, currentIndex } = event;
	if (!listName) {
		return JSON.stringify({ previousIndex, currentIndex }, null, 2);
	}
	return JSON.stringify({ previousIndex, currentIndex, previousContainer: listName(event.previousContainer.data), container: listName(event.container.data) }, null, 2);
}

export const CONNECTED_LISTS_DECORATORS = [
	moduleMetadata({
		imports: [CdkDropListGroup, CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent, IconComponent, StoryModelDisplayComponent],
	}),
	applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] }),
];

export const CONNECTED_LISTS_ARG_TYPES: ArgTypes<ReorderConnectedListsStory> = {
	luReorderActionsExcluded: ACTIONS_EXCLUDED_ARG_TYPE,
	luReorderShortcutsHidden: shortcutsHiddenArgType(['previous', 'next', 'first', 'last', 'lists']),
	luReorderIntl: { ...intlArgType(luReorderTranslations, 'LuReorderTranslations'), name: 'luReorderIntl' },
	luReorder: {
		description: 'Événement déclenché lorsqu’un élément est déplacé, dans sa liste ou vers une autre.',
		action: 'luReorder',
		control: false,
		table: { category: 'outputs', type: { summary: 'ReorderEvent' } },
	},
};
