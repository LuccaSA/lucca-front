import { Component, Input } from '@angular/core';
import { Meta, moduleMetadata } from '@storybook/angular';
import { PageHeaderComponent } from '../../../../packages/ng/page-header/src/lib';
import { StoryFn } from '@storybook/angular/dist/client/public-types';

@Component({
	selector: 'page-header-basic-stories',
	standalone: true,
	templateUrl: './page-header-basic.stories.html',
	imports: [
		PageHeaderComponent,
	],
})
class PageHeaderBasicStory {
	@Input() pageHeaderTitle: string = '';
	@Input() pageHeaderDescription: string = '';
	@Input() withoutShadow: boolean = false;
	@Input() sticky: boolean = false;
}

export default {
	title: 'Documentation/Structure/Page Header',
	component: PageHeaderComponent,
	argTypes: {
		noShadow: {
			control: {
				type: 'boolean',
			},
		},
		sticky: {
			control: {
				type: 'boolean',
			},
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [PageHeaderComponent]
		})
	],
} as Meta;

const template: StoryFn<PageHeaderComponent> = (args: PageHeaderComponent) => ({
	props: args,
	parameters: {
		docs: {
			source: {
				code: 'aaaa'
			}
		}
	},
	template: `
	<lu-page-header
		[sticky]="sticky"
		[noShadow]="withoutShadow"
		[title]="title"
		[description]="description"
		[actions]="actions"
		[extra]="extra"
	>
		<ng-template #actions>
			<button type="button" class="actionIcon" luTooltip="Modifier">
				<span aria-hidden="true" class="lucca-icon icon-edit"></span>
				<span class="u-mask">Modifier</span>
			</button>
			<button type="button" class="actionIcon" luTooltip="Copier">
				<span aria-hidden="true" class="lucca-icon icon-copy"></span>
				<span class="u-mask">Copier</span>
			</button>
			<button type="button" class="actionIcon" luTooltip="Supprimer">
				<span aria-hidden="true" class="lucca-icon icon-trash"></span>
				<span class="u-mask">Supprimer</span>
			</button>
		</ng-template>
		<ng-template #extra>
			<label class="textfield mod-search">
				<input class="textfield-input" type="text" placeholder="ex : Mon précieux">
				<span class="textfield-label u-mask">Rechercher</span>
			</label>
			<button type="button" class="button">Button</button>
			<button type="button" class="button mod-outline">Button</button>
			<button type="button" class="button mod-outline mod-icon">
				<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
				<span class="u-mask">voir plus</span>
			</button>
		</ng-template>
	</lu-page-header>
	`
});

export const basic = template.bind({});
basic.args = {
	title: 'H1. Page title',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac justo scelerisque, blandit nibh quis, imperdiet justo. Nullam condimentum nulla et neque ultricies bibendum',
	noShadow: false,
	sticky: false,
};
