import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Story, Meta, moduleMetadata, componentWrapperDecorator } from '@storybook/angular';
import { LuUserModule, LuUserSelectInputComponent } from '@lucca-front/ng/user';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'user-select-stories',
	templateUrl: './user-select.stories.html',
}) class UserSelectStory {
	@Input() public model;
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

const code =
`
/* 1. Importer le LuUserModule */
import { LuUserModule } from '@lucca-front/ng/user';

@NgModule({
  imports: [LuUserModule]
})
class UserSelectStoriesModule {}


/* 2. (Exemple n° 1) Utiliser le lu-user-select */
<label class="textfield">
  <lu-user-select class="textfield-input" [ngModel]="model"></lu-user-select>
  <span class="textfield-label">Utilisateurs</span>
</label>

/* 3. (Exemple n° 2) Utiliser le lu-user-select avec <code class="code">enableFormerEmployees</code> */
<label class="textfield u-marginTopStandard">
  <lu-user-select class="textfield-input" [ngModel]="model" [enableFormerEmployees]="true"></lu-user-select>
  <span class="textfield-label">Utilisateurs avec <code class="code">enableFormerEmployees</code></span>
</label>

/* 4. (Exemple n° 3) Utiliser le lu-user-select avec filtre sur son appInstanceId et ses opérations */
<label class="textfield u-marginTopStandard">
  <lu-user-select class="textfield-input" [ngModel]="model" appInstanceId="6" [operations]="[1]">
  </lu-user-select>
  <span class="textfield-label">Utilisateurs filtrés par operations/appInstanceId</span>
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
			type: 'code',
			code,
		}
	}
}
