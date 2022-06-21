import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuDropdownModule, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'dropdown-directive-stories',
	templateUrl: './dropdown-basic.stories.html',
}) class DropdownDirectiveStories {
	constructor() { }
}

export default {
	title: 'Documentation/Overlays/Dropdown/Directive',
	component: LuDropdownTriggerDirective,
	decorators: [
		componentWrapperDecorator(DropdownDirectiveStories),
		moduleMetadata({
			declarations: [DropdownDirectiveStories],
			imports: [
				BrowserAnimationsModule,
				LuDropdownModule,
			]
		})
	],
} as Meta;

const Template: Story<DropdownDirectiveStories> = (args: DropdownDirectiveStories) => ({
	props: args,
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
`

export const Directive = Template.bind({});
Directive.args = {}
Directive.parameters = {
	docs: {
		source: {
			language: 'ts',
			code,
		}
	},
	controls: { include: [] },
};
