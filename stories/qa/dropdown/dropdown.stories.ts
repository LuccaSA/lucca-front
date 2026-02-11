import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { DropdownActionComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	selector: 'dropdown-stories',
	templateUrl: './dropdown.stories.html',
	imports: [IconComponent, ButtonComponent, DividerComponent, DropdownMenuComponent, DropdownItemComponent, DropdownActionComponent, DropdownGroupComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DropdownStory {}

export default {
	title: 'QA/Dropdown',
	component: DropdownStory,
	decorators: [
		moduleMetadata({
			entryComponents: [DropdownStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<DropdownStory> = {
	args: {},
	render: template,
};
