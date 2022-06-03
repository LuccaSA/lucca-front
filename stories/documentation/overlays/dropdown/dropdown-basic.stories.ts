import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'dropdown-stories',
	templateUrl: './dropdown-basic.stories.html',
})
class DropdownBasicStories {
	constructor() {}
}

export default {
	title: 'Documentation/Overlays/Dropdown/Basic',
	component: DropdownBasicStories,
	decorators: [
		moduleMetadata({
			declarations: [DropdownBasicStories],
			imports: [BrowserAnimationsModule, LuDropdownModule],
		}),
	],
} as Meta;

const Template: Story<DropdownBasicStories> = (args: DropdownBasicStories) => ({
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
<button class="button" [luDropdown]="dropdown">Open dropdown</button>

/* 3. Ajouter le composant <lu-dropdown #dropdown></lu-dropdown> avec la référence de la directive */
<lu-dropdown #dropdown>
	<li class="lu-dropdown-options-item">
		<a routerLink="." fragment="link1" class="lu-dropdown-options-item-action is-disabled" luDropdownItem>Link 1</a>
	</li>
	<li class="lu-dropdown-options-item">
		<a routerLink="." fragment="link2" class="lu-dropdown-options-item-action" luDropdownItem>Link 2</a>
	</li>
	<li class="lu-dropdown-options-item">
		<a routerLink="." fragment="link3" class="lu-dropdown-options-item-action" luDropdownItem>Link 3</a>
	</li>
	<li class="lu-dropdown-options-item">
		<button class="lu-dropdown-options-item-action" luDropdownItem>Button 4</button>
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
			code,
		},
	},
};
