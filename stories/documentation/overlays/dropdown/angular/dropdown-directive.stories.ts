import { LuDropdownModule, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryFn } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';

export default {
	title: 'Documentation/Overlays/Dropdown/Angular/Directive',
	component: LuDropdownTriggerDirective,
	decorators: [],
} as Meta;

const Template: StoryFn = (args) => ({
	props: args,
	moduleMetadata: {
		imports: [LuDropdownModule, IconComponent, ButtonComponent],
	},
	template: `
	<button type="button" luButton [luDropdown]="dropdown">Dropdown with options and a longer text</button>
<lu-dropdown #dropdown>
	<li class="dropdown-list-option">
		<span class="dropdown-list-option-action is-disabled" luDropdownItem>
			<lu-icon icon="eye" />
			Prévisualiser
		</span>
	</li>
	<li class="dropdown-list-option">
		<a routerLink="." fragment="link2" class="dropdown-list-option-action" luDropdownItem>
			<lu-icon icon="officePen" />
			Éditer
		</a>
	</li>
	<li class="dropdown-list-option">
		<button type="button" class="dropdown-list-option-action mod-critical" luDropdownItem>
			<lu-icon icon="trashDelete" />
			Supprimer
		</button>
	</li>
</lu-dropdown>
`,
});

export const Directive = Template.bind({});
Directive.args = {};
Directive.parameters = {
	controls: { include: [] },
};
