import { LOCALE_ID } from '@angular/core';
import { CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ReorderDirective, ReorderEvent, ReorderItemLabelDirective } from '@lucca-front/ng/reorder';
import { RESOURCE_CARD_SIZE, ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { setStoryOptions } from '@/helpers/stories';

interface ResourceCardAngularBasicStory {
	wrapperDraggable: boolean;
	wrapperSize: string;
	draggable: boolean;
	actionType: string;
	content: boolean;
	illustration: boolean;
	infos: boolean;
	action: boolean;
	luReorder?: (event: ReorderEvent) => void;
}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Drag and drop',
	argTypes: {
		wrapperSize: {
			options: setStoryOptions(RESOURCE_CARD_SIZE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs' },
		},
		luReorder: {
			description: 'Événement déclenché lorsqu’une carte est déplacée, à la souris, depuis le menu de sa poignée ou au clavier.',
			action: 'luReorder',
			control: false,
			table: { category: 'outputs', type: { summary: 'ReorderEvent' } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				LuTooltipModule,
				IconComponent,
				StatusBadgeComponent,
				ButtonComponent,
				LinkComponent,
				TagComponent,
				ResourceCardComponent,
				ResourceCardButtonComponent,
				ResourceCardLinkComponent,
				ResourceCardWrapperComponent,
				CdkDropList,
				CdkDrag,
				ReorderDirective,
				ReorderItemLabelDirective,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }]), { provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

function getTemplate(args: ResourceCardAngularBasicStory) {
	const sizeWrapperAttr = args.wrapperSize === 'S' ? ` size="S"` : ``;
	const headingInfosTpl = args.infos
		? `
			<ng-container resourceCardInfos>
				<lu-status-badge label="Status" />
				<lu-status-badge label="Status" />
			</ng-container>`
		: ``;
	const descriptionTpl = args.content
		? `
			<ng-container resourceCardContent>
				Lorem <a href="#" luLink>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do.
			</ng-container>`
		: ``;
	const beforeTpl = args.illustration
		? `
			<ng-container resourceCardIllustration>
				<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100)"></div>
			</ng-container>`
		: ``;
	const afterTpl = args.action
		? `
			<ng-container resourceCardAction>
				<button type="button" luButton>Lorem ipsum</button>
			</ng-container>`
		: ``;
	const cards = `
		@for (card of cards; track card) {
			<lu-resource-card cdkDrag [luReorderItemLabel]="card">
				<a href="#" luResourceCardAction>{{ card }}</a>${headingInfosTpl}${beforeTpl}${afterTpl}${descriptionTpl}
			</lu-resource-card>
		}`;

	return `<lu-resource-card-wrapper cdkDropList luReorder (luReorder)="onReorder($event)" draggable${sizeWrapperAttr}>${cards}
</lu-resource-card-wrapper>`;
}

const Template = (args: ResourceCardAngularBasicStory) => {
	const cards = ['Lorem ipsum dolor 1', 'Lorem ipsum dolor 2', 'Lorem ipsum dolor 3'];

	return {
		props: {
			...args,
			cards,
			onReorder: (event: ReorderEvent) => {
				moveItemInArray(cards, event.previousIndex, event.currentIndex);
				args.luReorder?.(event);
			},
		},
		template: getTemplate(args),
	};
};

export const Basic: StoryObj<ResourceCardAngularBasicStory> = {
	name: 'Reorder',
	args: {
		wrapperSize: '',
		infos: true,
		content: true,
		illustration: true,
		action: true,
	},
	render: Template,
};
