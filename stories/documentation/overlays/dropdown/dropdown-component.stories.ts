import { Component as AngularComponent } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@AngularComponent({
	selector: 'dropdown-component-stories',
	templateUrl: './dropdown-basic.stories.html',
	standalone: true,
	imports: [LuDropdownModule],
})
class DropdownComponentStories {
	constructor() {}
}

export default {
	title: 'Documentation/Overlays/Dropdown/Component',
	component: DropdownComponentStories,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const Template: StoryFn<DropdownComponentStories> = (args) => ({
	props: args,
});

const code = `
<lu-dropdown #dropdown>

  /* Ajouter la directive luDropdownItem pour lier le parent luDropdown à ses enfants */
  <li class="dropdown-list-option">
    <a luDropdownItem routerLink="." fragment="link2" class="dropdown-list-option-action">Link 2</a>
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

export const Component = Template.bind({});
Component.args = {};
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
