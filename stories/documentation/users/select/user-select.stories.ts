import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Story, Meta, moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { LuUserModule, LuUserSelectInputComponent } from '@lucca-front/ng/user';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'user-select-stories',
	template: `
<label class="textfield">
	<lu-user-select class="textfield-input" [ngModel]="model" [filters]="['id=notequal,6,7,8,9']"></lu-user-select>
	<span class="textfield-label">Utilisateurs</span>
</label>
`,
}) class UserSelectStory {
	@Input() model;
}

export default {
	title: 'Documentation/Users/select',
	component: LuUserSelectInputComponent,
	decorators: [
		componentWrapperDecorator(UserSelectStory),
		moduleMetadata({
			declarations: [UserSelectStory],
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

const code = `
<label class="textfield">
  <lu-user-select class="textfield-input" [ngModel]="model"></lu-user-select>
  <span class="textfield-label">Utilisateurs</span>
</label>
`

export const basic = template.bind({});
basic.args = {
}

basic.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code,
		}
	}
}
