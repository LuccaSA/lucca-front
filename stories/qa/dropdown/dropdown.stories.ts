import { Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'dropdown-stories',
	templateUrl: './dropdown.stories.html',
	imports: [IconComponent, ButtonComponent, DividerComponent],
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
