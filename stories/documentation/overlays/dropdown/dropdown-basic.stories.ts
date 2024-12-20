import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

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
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const Template: StoryFn<DropdownBasicStory> = (args) => ({
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
	<li class="dropdown-option">
		<span class="dropdown-option-action is-disabled" luDropdownItem>
			<span aria-hidden="true" class="lucca-icon icon-eye"></span>
			Prévisualiser
		</a>
	</li>
	<li class="dropdown-option">
		<a routerLink="." fragment="link2" class="dropdown-option-action" luDropdownItem>
			<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
			Editer
		</a>
	</li>
	<li class="dropdown-option">
		<button type="button" class="dropdown-option-action mod-delete" luDropdownItem>
			<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
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
