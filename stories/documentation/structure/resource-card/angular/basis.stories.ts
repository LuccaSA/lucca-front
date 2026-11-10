import { setStoryOptions } from '@/helpers/stories';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import {
	RESOURCE_CARD_HEADING_LEVEL,
	RESOURCE_CARD_SIZE,
	ResourceCardButtonComponent,
	ResourceCardComponent,
	ResourceCardLinkComponent,
	ResourceCardWrapperComponent,
} from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface ResourceCardAngularBasicStory {
	wrapper: boolean;
	wrapperGrid: boolean;
	wrapperDraggable: boolean;
	wrapperSize: string;
	draggable: boolean;
	disabled: boolean;
	heading: string;
	actionType: string;
	content: boolean;
	contentTemplate: string;
	headingLevel: string;
	illustration: boolean;
	illustrationTemplate: string;
	illustrationTemplateDisabled: string;
	infos: boolean;
	infosTemplate: string;
	action: boolean;
	actionTemplate: string;
	actionTemplateDisabled: string;
	contentTemplateDisabled: string;
	size: string;
	addResource: boolean;
}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Basic',
	argTypes: {
		wrapper: {
			description: 'Affiche plusieurs cartes dans un `lu-resource-card-wrapper`.',
			table: { category: 'story' },
		},
		wrapperDraggable: {
			description: 'Rend les cartes du wrapper déplaçables.',
			if: { arg: 'wrapper', truthy: true },
			table: { category: 'inputs (resource-card-wrapper)', defaultValue: { summary: 'false' } },
		},
		wrapperGrid: {
			description: 'Affiche les cartes du wrapper en grille.',
			if: { arg: 'wrapper', truthy: true },
			table: { category: 'inputs (resource-card-wrapper)', defaultValue: { summary: 'false' } },
		},
		wrapperSize: {
			description: 'Modifie la taille des cartes du wrapper.',
			options: setStoryOptions(RESOURCE_CARD_SIZE),
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper', truthy: true },
			table: { category: 'inputs (resource-card-wrapper)', defaultValue: { summary: 'null' } },
		},
		addResource: {
			description: 'Ajoute un bouton à la fin du wrapper.',
			if: { arg: 'wrapper', truthy: true },
			table: { category: 'story' },
		},
		draggable: {
			description: 'Rend la carte déplaçable.',
			if: { arg: 'wrapper', truthy: false },
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		size: {
			description: 'Modifie la taille de la carte.',
			options: setStoryOptions(RESOURCE_CARD_SIZE),
			control: {
				type: 'select',
			},
			if: { arg: 'wrapper', truthy: false },
			table: { category: 'inputs', defaultValue: { summary: 'null' } },
		},
		headingLevel: {
			description: 'Niveau sémantique du titre de la carte.',
			options: RESOURCE_CARD_HEADING_LEVEL,
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: '3' } },
		},
		disabled: {
			description: 'Désactive l’action principale de la carte.',
			table: { category: 'inputs (resource-card-action)', defaultValue: { summary: 'false' } },
		},
		heading: {
			description: 'Titre de la carte.',
			table: { category: 'story' },
		},
		actionType: {
			description: 'Élément portant l’action principale : `a[luResourceCardAction]` ou `button[luResourceCardAction]`.',
			options: ['a', 'button'],
			control: {
				type: 'select',
			},
			table: { category: 'story' },
		},
		infos: {
			description: 'Affiche des informations complémentaires (`resourceCardInfos`).',
			table: { category: 'story' },
		},
		infosTemplate: {
			if: { arg: 'infos', truthy: true },
			table: { category: 'story' },
		},
		illustration: {
			description: 'Affiche une illustration (`resourceCardIllustration`).',
			table: { category: 'story' },
		},
		illustrationTemplate: {
			if: { arg: 'illustration', truthy: true },
			table: { category: 'story' },
		},
		illustrationTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
			table: { category: 'story' },
		},
		content: {
			description: 'Affiche un contenu (`resourceCardContent`).',
			table: { category: 'story' },
		},
		contentTemplate: {
			if: { arg: 'content', truthy: true },
			table: { category: 'story' },
		},
		contentTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
			table: { category: 'story' },
		},
		action: {
			description: 'Affiche une action secondaire (`resourceCardAction`).',
			table: { category: 'story' },
		},
		actionTemplate: {
			if: { arg: 'action', truthy: true },
			table: { category: 'story' },
		},
		actionTemplateDisabled: {
			if: { arg: 'disabled', truthy: true },
			table: { category: 'story' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				LuTooltipTriggerDirective,
				IconComponent,
				StatusBadgeComponent,
				ButtonComponent,
				LinkComponent,
				TagComponent,
				ResourceCardComponent,
				ResourceCardButtonComponent,
				ResourceCardLinkComponent,
				ResourceCardWrapperComponent,
				LuTooltipTriggerDirective,
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
		}),
	],
} as Meta;

function getTemplate(args: ResourceCardAngularBasicStory) {
	const sizeWrapperAttr = args.wrapperSize === 'S' ? ` size="S"` : ``;
	const draggableWrapperAttr = args.wrapperDraggable ? ` draggable` : ``;
	const draggableAttr = args.draggable ? ` draggable` : ``;
	const gridAttr = args.wrapperGrid ? ` grid` : ``;
	const disabledAttr = args.disabled ? ` disabled` : ``;
	const addResourceTpl = args.addResource
		? `
		<button luButton>Button</button>`
		: ``;
	const actionTpl =
		args.actionType === 'a'
			? `<a href="#" luResourceCardAction luTooltip luTooltipWhenEllipsis${disabledAttr}>${args.heading}</a>`
			: `<button type="button" luResourceCardAction luTooltip luTooltipWhenEllipsis${disabledAttr}>${args.heading}</button>`;
	const headingLevelAttr = args.headingLevel !== '3' ? ` headingLevel="${args.headingLevel}"` : ``;
	const headingInfosTpl = args.infos
		? `
			<ng-container resourceCardInfos>
				${args.infosTemplate}
			</ng-container>`
		: ``;
	const descriptionTpl = args.content
		? args.disabled
			? `
			<ng-container resourceCardContent>
				${args.contentTemplateDisabled}
			</ng-container>`
			: `
			<ng-container resourceCardContent>
				${args.contentTemplate}
			</ng-container>`
		: ``;
	const beforeTpl = args.illustration
		? args.disabled
			? `<ng-container resourceCardIllustration>
				${args.illustrationTemplateDisabled}
			</ng-container>`
			: `
			<ng-container resourceCardIllustration>
				${args.illustrationTemplate}
			</ng-container>`
		: ``;
	const afterTpl = args.action
		? args.disabled
			? `
			<ng-container resourceCardAction>
				${args.actionTemplateDisabled}
			</ng-container>`
			: `
			<ng-container resourceCardAction>
				${args.actionTemplate}
			</ng-container>`
		: ``;
	const card = `
		<lu-resource-card>
			<a href="#" luResourceCardAction>Sit amet</a>
			<ng-container resourceCardContent>
				Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit. Consectetur adipiscing elit.
			</ng-container>
		</lu-resource-card>`;
	const sizeAttr = args.size ? ` size="S"` : ``;
	const cards = `
		<lu-resource-card${draggableAttr}${headingLevelAttr}${sizeAttr}>
			${actionTpl}${headingInfosTpl}${beforeTpl}${afterTpl}${descriptionTpl}
		</lu-resource-card>${card.repeat(args.wrapper ? 3 : 0)}`;
	if (args.wrapper) {
		return `<lu-resource-card-wrapper${sizeWrapperAttr}${gridAttr}${draggableWrapperAttr}>${cards}${addResourceTpl}</lu-resource-card-wrapper>`;
	} else {
		return `${cards}`;
	}
}

const Template = (args: ResourceCardAngularBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ResourceCardAngularBasicStory> = {
	args: {
		wrapper: false,
		wrapperDraggable: false,
		wrapperGrid: false,
		wrapperSize: '',
		addResource: false,
		draggable: false,
		disabled: false,
		heading: 'Lorem ipsum dolor ',
		headingLevel: '3',
		size: '',
		actionType: 'a',
		infos: false,
		infosTemplate: `<lu-status-badge label="Status" />
				<lu-status-badge label="Status" />`,
		content: false,
		contentTemplate: `Lorem <a href="#" luLink>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do. `,
		contentTemplateDisabled: `Lorem <a href="#" luLink disabled>ipsum</a> dolor sit amet, consectetur adipiscing elit, sed do. `,
		illustration: false,
		illustrationTemplate: `<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-lavender-100)"></div>`,
		illustrationTemplateDisabled: `<div class="pr-u-inlineSize100% pr-u-blockSize100% pr-u-borderRadiusDefault" style="background-color: var(--palettes-neutral-100)"></div>`,
		action: false,
		actionTemplate: `<button type="button" luButton>Lorem ipsum</button>`,
		actionTemplateDisabled: `<button type="button" luButton disabled>Lorem ipsum</button>`,
	},
	render: Template,
};
