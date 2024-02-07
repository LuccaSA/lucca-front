import { provideHttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser, LuUserSelectModule } from '@lucca-front/ng/user';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'user-select-stories',
	templateUrl: './user-select.stories.html',
	imports: [LuUserSelectModule, FormsModule],
})
class UserSelectStory {
	model: ILuUser;
	@Input() disablePrincipal = false;
}

export default {
	title: 'Documentation/Users/Select/Basique',
	component: UserSelectStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

const template: StoryFn<UserSelectStory> = (args: UserSelectStory) => ({
	props: args,
});

const code = `
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
<label class="textfield pr-u-marginTopL">
  <lu-user-select class="textfield-input" [ngModel]="model" [enableFormerEmployees]="true"></lu-user-select>
  <span class="textfield-label">Utilisateurs avec <code class="code">enableFormerEmployees</code></span>
</label>

/* 4. (Exemple n° 3) Utiliser le lu-user-select avec filtre sur son appInstanceId et ses opérations */
<label class="textfield pr-u-marginTopL">
  <lu-user-select class="textfield-input" [ngModel]="model" appInstanceId="6" [operations]="[1]">
  </lu-user-select>
  <span class="textfield-label">Utilisateurs filtrés par operations/appInstanceId</span>
</label>
`;

export const basic = template.bind({});
basic.args = {};

basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
