import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuDropdownModule, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { Meta, StoryFn } from '@storybook/angular';

export default {
	title: 'Documentation/Overlays/Dropdown/Directive',
	component: LuDropdownTriggerDirective,
} as Meta;

const Template: StoryFn = (args) => ({
	props: args,
	moduleMetadata: {
		imports: [BrowserAnimationsModule, LuDropdownModule],
	},
	template: `
	<button type="button" class="button" [luDropdown]="dropdown">Dropdown with options</button>
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
