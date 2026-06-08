import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ILuUser, LuUserSelectModule } from '@lucca-front/ng/user';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { createTestStory } from 'stories/helpers/stories';
import { waitForAngular } from 'stories/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

@Component({
	selector: 'user-select-stories',
	templateUrl: './user-select.stories.html',
	imports: [LuUserSelectModule, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class UserSelectStory {
	model: ILuUser;
	disablePrincipal = input<boolean>(false);
}

export default {
	title: 'Documentation/Users/Select/Basique',
	component: UserSelectStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

const code = `
/* 1. Importer le LuUserModule */
import { LuUserModule } from '@lucca-front/ng/user';

@NgModule({
  imports: [LuUserModule]
})
class UserSelectStoriesModule {}


/* 2. (Exemple n° 1) Utiliser le lu-user-select */
<label class="textfield">
  <lu-user-select class="textfield-input" [ngModel]="model" />
  <span class="textfield-label">Utilisateurs</span>
</label>

/* 3. (Exemple n° 2) Utiliser le lu-user-select avec <code class="code">enableFormerEmployees</code> */
<label class="textfield pr-u-marginBlockStart300">
  <lu-user-select class="textfield-input" [ngModel]="model" [enableFormerEmployees]="true" />
  <span class="textfield-label">Utilisateurs avec <code class="code">enableFormerEmployees</code></span>
</label>

/* 4. (Exemple n° 3) Utiliser le lu-user-select avec filtre sur son appInstanceId et ses opérations */
<label class="textfield pr-u-marginBlockStart300">
  <lu-user-select class="textfield-input" [ngModel]="model" appInstanceId="6" [operations]="[1]">
  </lu-user-select>
  <span class="textfield-label">Utilisateurs filtrés par operations/appInstanceId</span>
</label>
`;

export const Basic: StoryObj<UserSelectStory> = {
	args: {
		disablePrincipal: false,
	},
};

Basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	await waitForAngular();
	const canvas = within(canvasElement);

	await step('Vérifie le rendu initial', async () => {
		const combobox = canvas.getByRole('combobox');
		await expect(combobox).toBeVisible();
	});

	await step('Interaction clavier', async () => {
		const combobox = canvas.getByRole('combobox');
		combobox.focus();
		await expect(combobox).toHaveFocus();
		await userEvent.keyboard('{ArrowDown}');
		await waitForAngular();
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(combobox).toBeVisible();
	});
});
