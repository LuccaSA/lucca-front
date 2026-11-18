import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LOCALE_ID, signal } from '@angular/core';
import { LuReorderTranslations, luReorderTranslations, ReorderDirective, ReorderEvent, ReorderHandleComponent, ReorderItemLabelDirective, ReorderOptionalAction } from '@lucca-front/ng/reorder';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';
import { ACTIONS_EXCLUDED_ARG_TYPE, actionsExcludedValue, formatReorderEvent } from './connected-lists.helpers';
import { intlArgType } from '@/helpers/stories';

interface ReorderBasicStory {
	luReorderActionsExcluded: ReorderOptionalAction[];
	luReorderIntl?: Partial<LuReorderTranslations>;
	luReorder?: (event: ReorderEvent<string[]>) => void;
}

export default {
	title: 'Documentation/Listings/Reorder/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [CdkDropList, CdkDrag, ReorderDirective, ReorderItemLabelDirective, ReorderHandleComponent, StoryModelDisplayComponent],
		}),
		applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] }),
	],
	argTypes: {
		luReorderActionsExcluded: ACTIONS_EXCLUDED_ARG_TYPE,
		luReorderIntl: { ...intlArgType(luReorderTranslations, 'LuReorderTranslations'), name: 'luReorderIntl' },
		luReorder: {
			description: 'Événement déclenché lorsqu’un élément est déplacé, à la souris, depuis le menu de sa poignée ou au clavier.',
			action: 'luReorder',
			control: false,
			table: { category: 'outputs', type: { summary: 'ReorderEvent' } },
		},
	},
	render: ({ luReorder, luReorderActionsExcluded }: ReorderBasicStory) => {
		const excluded = actionsExcludedValue(luReorderActionsExcluded);
		const items = ['Carotte', 'Poireau', 'Navet', 'Courgette'];

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
			template: `<ul class="reorderDemo" cdkDropList luReorder${excluded ? ` [luReorderActionsExcluded]="${excluded}"` : ''} (luReorder)="onReorder($event)">
	@for (item of items; track item) {
		<li class="reorderDemo-item" cdkDrag [luReorderItemLabel]="item">
			<lu-reorder-handle />
			{{ item }}
		</li>
	}
</ul>
<pr-story-model-display heading="(luReorder)">{{ lastEvent() }}</pr-story-model-display>`,
			styles: [
				`
	.reorderDemo {
		display: flex;
		flex-direction: column;
		gap: var(--pr-t-spacings-100);
		margin: 0;
		padding: 0;
		list-style: none;
		max-inline-size: 20rem;
	}

	.reorderDemo-item {
		display: flex;
		align-items: center;
		gap: var(--pr-t-spacings-100);
		padding: var(--pr-t-spacings-50);
		border-radius: var(--pr-t-border-radius-default);

		// The drag preview and placeholder keep their global CDK styles
		&:not(.cdk-drag-preview, .cdk-drag-placeholder) {
			background-color: var(--pr-t-elevation-surface-raised);
		}
	}`,
			],
		};
	},
} as Meta<ReorderBasicStory>;

export const Basic: StoryObj<ReorderBasicStory> = {
	args: {
		luReorderActionsExcluded: [],
	},
};
