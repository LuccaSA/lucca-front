import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDropdownModule, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

export default {
	title: 'Documentation/Overlays/Dropdown/Angular/Directive',
	component: LuDropdownTriggerDirective,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const Template: StoryFn = (args) => ({
	props: args,
	moduleMetadata: {
		imports: [LuDropdownModule, IconComponent],
	},
	template: `
	<button type="button" class="button" [luDropdown]="dropdown">Dropdown with options</button>
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

const code = `
  <button type="button"
		class="button"
    [luDropdown]="dropdown"
    luDropdownAlignment="top" /* top | bottom | left | right | center */
    luDropdownPosition="before" /* above | below | before | after */
    (luDropdownOnClose)="close()"
    (luDropdownOnOpen)='open()'
    [luDropdownDisabled]="true"
    luDropdownOverlap>
    Open dropdown
  </button>
`;

export const Directive = Template.bind({});
Directive.args = {};
Directive.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
	controls: { include: [] },
};
