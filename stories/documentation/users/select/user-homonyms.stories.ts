import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuApiPagedSearcherComponent } from '@lucca-front/ng/api';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuForOptionsDirective, LuOptionItemComponent, LuOptionPickerAdvancedComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuUserDisplayPipe, LuUserHomonymsComponent, LuUserMeOptionDirective } from '@lucca-front/ng/user';
import { Meta, StoryFn, applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

@Component({
	standalone: true,
	selector: 'user-select-stories',
	templateUrl: './user-homonyms.stories.html',
	imports: [
		NgIf,
		LuUserHomonymsComponent,
		LuSelectInputComponent,
		LuOptionPickerComponent,
		LuApiPagedSearcherComponent,
		LuInputDisplayerDirective,
		LuOptionPickerAdvancedComponent,
		LuOptionItemComponent,
		LuUserDisplayPipe,
		LuUserMeOptionDirective,
		FormsModule,
		LuForOptionsDirective,
	],
})
class UserHomonymsStory {}

export default {
	title: 'Documentation/Users/Select/Homonymes',
	component: LuUserHomonymsComponent,
	decorators: [
		componentWrapperDecorator(UserHomonymsStory),
		moduleMetadata({
			imports: [UserHomonymsStory, HttpClientModule],
		}),
		applicationConfig({ providers: [provideAnimations()] }),
	],
} as Meta;

const template: StoryFn<UserHomonymsStory> = (args: UserHomonymsStory) => ({
	props: args,
});

const code = `
/* Afin de créer une sélection d'utilisateur custom avec gestion des homonymes */
/* Ajouter un lu-select ainsi qu'un lu-option-picker-advanced */
<label class="textfield mod-block u-marginTopL">
  <lu-select class="textfield-input">
    <span *luDisplayer="let user">{{ user | luUserDisplay }}</span>

    <lu-option-picker-advanced>
      <lu-api-paged-searcher
        api="/timmi-project/api/projectusers/search"
        fields="id,firstName,lastName" orderBy="lastname,asc,firstname,asc"
        [filters]="['currentOrganizationId=1']" standard="v3">
      </lu-api-paged-searcher>

      /* Ajouter cette ligne dans un lu-option-picker-advanced afin de gérer les homonymes entre utilisateurs*/
      /* Cette ligne permet d'ajouter la propriété 'additionalInformation' aux utilisateurs comportant un homonyme */
      <lu-user-homonyms></lu-user-homonyms>

      <lu-option *luForOptions="let user" [value]="user">
        {{ user | luUserDisplay }}

        /* Ajouter une information additionnelle en pilotant la propriété ajoutée précedemment */
        /* Par défault, additionalInformation équivaut au nom du département de l'utilisateur */
        <div *ngIf="user.additionalInformation" class="u-fontStyleItalic u-textS">
          ({{ user.additionalInformation }})
        </div>
      </lu-option>
    </lu-option-picker-advanced>
  </lu-select>
  <span class="textfield-label">Avec gestion des homonymes :</span>
</label>
`;

export const homonyms = template.bind({});
homonyms.args = {};

homonyms.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
