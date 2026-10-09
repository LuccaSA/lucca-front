import { CdkDrag, CdkDropList, DropListOrientation, moveItemInArray } from '@angular/cdk/drag-drop';
import { LOCALE_ID, signal } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { ReorderDirective, ReorderEvent, ReorderFlow, ReorderHandleComponent, ReorderItemLabelDirective, ReorderMenuEntry, ReorderOptionalAction } from '@lucca-front/ng/reorder';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { ACTIONS_EXCLUDED_ARG_TYPE, actionsExcludedValue, formatReorderEvent, shortcutsHiddenArgType, shortcutsHiddenValue } from './connected-lists.helpers';

interface ReorderOrientationStory {
	cdkDropListOrientation: DropListOrientation;
	luReorderFlow: ReorderFlow;
	luReorderActionsExcluded: ReorderOptionalAction[];
	luReorderShortcutsHidden: ReorderMenuEntry[];
	luReorder?: (event: ReorderEvent<string[]>) => void;
}

export default {
	title: 'Documentation/Listings/Reorder/Angular/Orientation',
	decorators: [
		moduleMetadata({
			imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent, IconComponent, StoryModelDisplayComponent],
		}),
		applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	argTypes: {
		cdkDropListOrientation: {
			control: 'inline-radio',
			options: ['vertical', 'horizontal', 'mixed'],
			description: 'Orientation de la liste : `mixed` pour une liste qui passe à la ligne.',
			table: { category: 'inputs', type: { summary: 'DropListOrientation' }, defaultValue: { summary: 'vertical' } },
		},
		luReorderFlow: {
			name: '↳ luReorderFlow',
			if: { arg: 'cdkDropListOrientation', eq: 'mixed' },
			control: 'inline-radio',
			options: ['row', 'column'],
			description: 'Sens d’écoulement d’une liste `mixed` : en lignes (Alt + ← / →) ou en colonnes (Alt + ↑ / ↓).',
			table: { category: 'inputs', type: { summary: 'ReorderFlow' }, defaultValue: { summary: 'row' } },
		},
		luReorderActionsExcluded: ACTIONS_EXCLUDED_ARG_TYPE,
		luReorderShortcutsHidden: shortcutsHiddenArgType(['previous', 'next', 'first', 'last']),
		luReorder: {
			description: 'Événement déclenché lorsqu’un élément est déplacé, à la souris, depuis le menu de sa poignée ou au clavier.',
			action: 'luReorder',
			control: false,
			table: { category: 'outputs', type: { summary: 'ReorderEvent' } },
		},
	},
	render: ({ cdkDropListOrientation, luReorderFlow, luReorderActionsExcluded, luReorderShortcutsHidden, luReorder }: ReorderOrientationStory) => {
		const excluded = actionsExcludedValue(luReorderActionsExcluded);
		const hidden = shortcutsHiddenValue(luReorderShortcutsHidden, luReorderActionsExcluded);
		const items = ['Carotte', 'Poireau', 'Navet', 'Courgette', 'Potiron', 'Radis'];
		const mixed = cdkDropListOrientation === 'mixed';
		const column = cdkDropListOrientation === 'vertical' || (mixed && luReorderFlow === 'column');
		// Optional attributes are written on their own line in the template, so their indentation is displayed like the other attributes
		const orientation =
			cdkDropListOrientation !== 'vertical'
				? `
	cdkDropListOrientation="${cdkDropListOrientation}"`
				: '';
		const actions = excluded
			? `
	[luReorderActionsExcluded]="${excluded}"`
			: '';
		const shortcutsHidden = hidden
			? `
	[luReorderShortcutsHidden]="${hidden}"`
			: '';
		const flow =
			mixed && luReorderFlow !== 'row'
				? `
	luReorderFlow="${luReorderFlow}"`
				: '';

		const lastEvent = signal('');

		return {
			props: {
				items,
				lastEvent,
				onReorder: (event: ReorderEvent<string[]>) => {
					moveItemInArray(items, event.previousIndex, event.currentIndex);
					lastEvent.set(formatReorderEvent(event));
					luReorder?.(event);
				},
			},
			template: `<ul
	class="reorderDemo${column ? ' mod-column' : ''}${mixed ? ' mod-wrap' : ''}"
	cdkDropList${orientation}
	luReorder${flow}${actions}${shortcutsHidden}
	(luReorder)="onReorder($event)"
>
	@for (item of items; track item) {
		<li class="reorderDemo-item" cdkDrag [luReorderItemLabel]="item">
			<button type="button" lu-reorder-handle class="button mod-ghost mod-onlyIcon mod-S">
				<lu-icon icon="dotsDrag" />
			</button>
			{{ item }}
		</li>
	}
</ul>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>`,
			styles: [
				`
	.reorderDemo {
		display: flex;
		align-content: flex-start;
		gap: var(--pr-t-spacings-100);
		margin: 0;
		padding: 0;
		list-style: none;

		&.mod-wrap {
			flex-wrap: wrap;
			max-inline-size: 32rem;
		}

		&.mod-column {
			flex-direction: column;

			.reorderDemo-item {
				inline-size: 10rem;
			}

			&.mod-wrap {
				max-block-size: 9rem;
				max-inline-size: none;
			}
		}
	}

	.reorderDemo-item {
		display: flex;
		align-items: center;
		gap: var(--pr-t-spacings-50);
		padding: var(--pr-t-spacings-50);
		padding-inline-end: var(--pr-t-spacings-100);
		border-radius: var(--pr-t-border-radius-default);

		// The drag preview and placeholder keep their global CDK styles
		&:not(.cdk-drag-preview, .cdk-drag-placeholder) {
			background-color: var(--pr-t-elevation-surface-raised);
		}
	}`,
			],
		};
	},
} as Meta<ReorderOrientationStory>;

export const Orientation: StoryObj<ReorderOrientationStory> = {
	args: {
		cdkDropListOrientation: 'horizontal',
		luReorderFlow: 'row',
		luReorderActionsExcluded: [],
		luReorderShortcutsHidden: [],
	},
};
