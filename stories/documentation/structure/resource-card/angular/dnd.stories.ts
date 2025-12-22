import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { provideRouter } from '@angular/router';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent } from '@lucca-front/ng/link';
import { ResourceCardButtonComponent, ResourceCardComponent, ResourceCardLinkComponent, ResourceCardWrapperComponent } from '@lucca-front/ng/resource-card';
import { StatusBadgeComponent } from '@lucca-front/ng/status-badge';
import { TagComponent } from '@lucca-front/ng/tag';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ResourceCardAngularBasicStory {
	wrapperDraggable: boolean;
	wrapperSize: string;
	draggable: boolean;
	actionType: string;
	content: boolean;
	illustration: boolean;
	infos: boolean;
	action: boolean;
}

export default {
	title: 'Documentation/Structure/Resource Card/Angular/Drag and drop',
	argTypes: {
		wrapperSize: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
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
			],
		}),
		applicationConfig({
			providers: [provideRouter([{ path: 'iframe.html', redirectTo: '', pathMatch: 'full' }])],
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
		<lu-resource-card cdkDrag>
			<a href="#" luResourceCardAction>Lorem ipsum dolor</a>${headingInfosTpl}${beforeTpl}${afterTpl}${descriptionTpl}
		</lu-resource-card>`.repeat(3);

	return `<lu-resource-card-wrapper cdkDropList draggable${sizeWrapperAttr}>${cards}</lu-resource-card-wrapper>`;
}

const Template = (args: ResourceCardAngularBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<ResourceCardAngularBasicStory> = {
	args: {
		wrapperSize: '',
		infos: true,
		content: true,
		illustration: true,
		action: true,
	},
	render: Template,
};
