import { Component, Input } from '@angular/core';
import { ILuUser, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, LuUserDisplayModule } from '@lucca-front/ng/user';
import { Meta, StoryFn } from '@storybook/angular';
import { bob, patrick, squidwards } from '../user.mocks';

@Component({
	selector: 'display-stories',
	standalone: true,
	imports: [LuUserDisplayModule],
	templateUrl: './display.stories.html',
})
class DisplayStory {
	@Input() users: ILuUser[] = [bob, patrick, squidwards];
	@Input() displayFormat: LuDisplayFormat = LuDisplayFullname.lastfirst;
	@Input() separator = ', ';
}

export default {
	title: 'Documentation/Users/Display/Basic',
	component: DisplayStory,
	argTypes: {
		displayFormat: {
			options: [...Object.values(LuDisplayFullname), ...Object.values(LuDisplayInitials), ...Object.values(LuDisplayHybrid)],
			control: {
				type: 'select',
				labels: {
					...Object.entries(LuDisplayFullname).reduce((acc, [value, key]) => ({ ...acc, [key]: `LuDisplayFullname.${value}` }), {}),
					...Object.entries(LuDisplayInitials).reduce((acc, [value, key]) => ({ ...acc, [key]: `LuDisplayInitials.${value}` }), {}),
					...Object.entries(LuDisplayHybrid).reduce((acc, [value, key]) => ({ ...acc, [key]: `LuDisplayHybrid.${value}` }), {}),
				},
			},
		},
		separator: { control: 'text' },
	},
} as Meta;

const template: StoryFn<DisplayStory> = (args: DisplayStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	displayFormat: LuDisplayFullname.lastfirst,
	separator: ', ',
};

const code = `
/* 1. Importer LuUserDisplayModule */
import { LuUserDisplayModule } from '@lucca-front/ng/user';

@NgModule({
	imports: [LuUserDisplayModule]
})
class StoriesModule {}

/* 2. Utiliser le pipe luUserDisplay avec le format par défaut*/
{{ user | luUserDisplay }}
/* Ou utiliser le pipe luUserDisplay avec un format particulier*/
{{ user | luUserDisplay:'lf' }}

/* On peut également l'utiliser pour afficher un tableau d'utilisateurs*/
{{ users | luUserDisplay }}
/* Egalement utilisable avec un format et un séparateur personnalisé */
{{ users | luUserDisplay: { format: 'Fl', separator: ' ; ' } }}
`;

Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: ['displayFormat', 'separator'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
