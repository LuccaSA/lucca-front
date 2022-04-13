import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import {
	LuDropdownModule,
	LuDropdownPanelComponent,
	LuDropdownTriggerDirective,
} from '../../../../packages/ng/dropdown/src';


@Component({
	selector: 'dropdown-mock-stories',
	templateUrl: './dropdown.stories.html',
}) class DropdownMockStories extends LuDropdownTriggerDirective {
}



@Component({
	selector: 'dropdown-stories',
	templateUrl: './dropdown.stories.html',
}) class DropdownStories {
	constructor() { }
}

export default {
	title: 'Documentation/Overlays/Dropdown',
	component: DropdownMockStories,
	decorators: [
		componentWrapperDecorator(DropdownStories),
		moduleMetadata({
			declarations: [DropdownStories],
			imports: [
				BrowserAnimationsModule,
				LuDropdownModule,
			]
		})
	],
} as Meta;

const Template: Story<DropdownStories> = (args: DropdownStories) => ({
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {}
Basic.parameters = {
	controls: [],
	docs: {
		source: {
			language: 'ts',
			code:
`
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
\t<li class="lu-dropdown-options-item">
\t\t<a routerLink="." fragment="link1" class="lu-dropdown-options-item-action is-disabled" luDropdownItem>Link 1</a>
\t</li>
\t<li class="lu-dropdown-options-item">
\t\t<a routerLink="." fragment="link2" class="lu-dropdown-options-item-action" luDropdownItem>Link 2</a>
\t</li>
\t<li class="lu-dropdown-options-item">
\t\t<a routerLink="." fragment="link3" class="lu-dropdown-options-item-action" luDropdownItem>Link 3</a>
\t</li>
\t<li class="lu-dropdown-options-item">
\t\t<button class="lu-dropdown-options-item-action" luDropdownItem>Button 4</button>
\t</li>
</lu-dropdown>
`
		}
	}
};
