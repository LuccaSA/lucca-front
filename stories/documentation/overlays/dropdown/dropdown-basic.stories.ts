import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';

@Component({
	selector: 'dropdown-stories',
	standalone: true,
	imports: [LuDropdownModule],
	templateUrl: './dropdown-basic.stories.html',
})
class DropdownBasicStory {
	constructor() {}
}

export default {
	title: 'Documentation/Overlays/Dropdown/Basic',
	component: DropdownBasicStory,
	decorators: [
		moduleMetadata({
			imports: [BrowserAnimationsModule],
		}),
	],
} as Meta;

const Template: StoryFn<DropdownBasicStory> = (args: DropdownBasicStory) => ({
	props: args,
});

const code = `
/* 1. Importer LuDropdownModule */
import { LuDropdownModule } from '@lucca-front/ng/dropdown';

@NgModule({
	imports: [LuDropdownModule]
})
class DropdownStoriesModule {}

/* 2. Ajouter un bouton détenant la directive [luDropdown]="dropdown" */
<button type="button" class="button" [luDropdown]="dropdown">Open dropdown</button>

/* 3. Ajouter le composant <lu-dropdown #dropdown></lu-dropdown> avec la référence de la directive */
<lu-dropdown #dropdown>
	<li class="lu-dropdown-options-item">
		<a routerLink="." fragment="link1" class="lu-dropdown-options-item-action is-disabled" luDropdownItem>
			<span aria-hidden="true" class="lucca-icon icon-watch"></span>
			Prévisualiser
		</a>
	</li>
	<li class="lu-dropdown-options-item">
		<a routerLink="." fragment="link2" class="lu-dropdown-options-item-action" luDropdownItem>
			<span aria-hidden="true" class="lucca-icon icon-edit"></span>
			Editer
		</a>
	</li>
	<li class="lu-dropdown-options-item">
		<button type="button" class="lu-dropdown-options-item-action mod-delete" luDropdownItem>
			<span aria-hidden="true" class="lucca-icon icon-trash"></span>
			Supprimer
		</button>
	</li>
</lu-dropdown>
`;

export const Basic = Template.bind({});
Basic.args = {};
Basic.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
