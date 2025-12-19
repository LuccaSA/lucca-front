import { Component as AngularComponent } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@AngularComponent({
	selector: 'dropdown-component-stories',
	templateUrl: './dropdown-basic.stories.html',
	imports: [LuDropdownModule],
})
class DropdownComponentStories {
	constructor() {}
}

export default {
	title: 'Documentation/Overlays/Dropdown/Angular/Component',
	component: DropdownComponentStories,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const Template = (args: DropdownComponentStories) => ({
	props: args,
});

const code = `
<lu-dropdown #dropdown>

  /* Ajouter la directive luDropdownItem pour lier le parent luDropdown à ses enfants */
  <li class="dropdown-list-option">
		/* Mettre un relativeTo afin de conserver la navigation relative au chemin courant */
    <a luDropdownItem routerLink="." [relativeTo]="activatedRoute" fragment="link2" class="dropdown-list-option-action">Link 2</a>
  </li>

  /* Vous pouvez disable un enfant avec 'is-disabled' */
  <li class="dropdown-list-option">
    <span class="dropdown-list-option-action is-disabled">Link 1</a>
  </li>

  /* Vous pouvez également utiliser un <button></button> au lieu d'un <a></a>. */
  <li class="dropdown-list-option">
    <button type="button" luDropdownItem class="dropdown-list-option-action">Button 4</button>
  </li>

</lu-dropdown>
`;

export const Component: StoryObj<DropdownComponentStories> = {
	args: {},
	render: Template,
};

Component.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
