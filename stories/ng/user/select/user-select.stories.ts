import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { ALuUserService, LuUserModule } from '@lucca-front/ng/user';
import { FormsModule } from '@angular/forms';
import { bob } from '../user.mocks';

@Component({
	selector: 'user-select-stories',
	template: `
<label class="textfield">
	<lu-user-select class="textfield-input" [ngModel]="model" [filters]="['id=notequal,6,7,8,9']"></lu-user-select>
</label>
`,
}) class UserSelectStory {
	@Input() model: string;
}

export default {
	title: 'NG/User/select',
	component: UserSelectStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UserSelectStory],
			imports: [
				LuUserModule,
				BrowserAnimationsModule,
				FormsModule,
			],
		})
	]
} as Meta;

const template: Story<UserSelectStory> = (args: UserSelectStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	model: bob,
}
