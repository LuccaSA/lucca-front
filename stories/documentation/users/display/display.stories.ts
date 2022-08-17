import { Component, Input } from '@angular/core';
import { ILuUser, LuDisplayFormat, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, LuUserDisplayModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata } from '@storybook/angular';
import { bob } from '../user.mocks';

@Component({
	selector: 'display-stories',
	template: `{{ user | luUserDisplay: displayFormat }}`,
})
class DisplayStory {
	@Input() user: ILuUser = bob;
	@Input() displayFormat: LuDisplayFormat = LuDisplayFullname.lastfirst;
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
	},
	decorators: [
		moduleMetadata({
			imports: [LuUserDisplayModule],
			declarations: [DisplayStory],
		}),
	],
} as Meta;

const template: Story<DisplayStory> = (args: DisplayStory) => ({
	props: args,
});

export const Basic = template.bind({});
Basic.args = {
	displayFormat: LuDisplayFullname.lastfirst,
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
`;

Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: ['displayFormat'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
