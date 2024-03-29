import { Component as AngularComponent } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule } from '@lucca-front/ng/dropdown';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

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

  /* Ajouter la directive luDropdownItem pour lié le parent luDropdown à ses enfants */
  <li class="lu-dropdown-options-item">
    <a luDropdownItem routerLink="." fragment="link2" class="lu-dropdown-options-item-action">Link 2</a>
  </li>

  /* Vous pouvez disable un enfant avec 'is-disabled' */
  <li class="lu-dropdown-options-item">
    <a luDropdownItem routerLink="." fragment="link1" class="lu-dropdown-options-item-action is-disabled">Link 1</a>
  </li>

  /* Vous pouvez également utiliser un <button></button> au lieu d'un <a></a>. */
  <li class="lu-dropdown-options-item">
    <button type="button" luDropdownItem class="lu-dropdown-options-item-action">Button 4</button>
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
