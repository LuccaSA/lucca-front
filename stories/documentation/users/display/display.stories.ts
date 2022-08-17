import { Component } from '@angular/core';
import { ILuUser, LuDisplayFullname, LuDisplayHybrid, LuDisplayInitials, LuUserDisplayModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { bob } from '../user.mocks';

@Component({
	selector: 'display-stories',
	template: `
		<table class="table">
			<thead class="table-head">
				<tr class="table-head-row">
					<th class="table-head-row-cell">Display format</th>
					<th class="table-head-row-cell u-textRight">Display</th>
				</tr>
			</thead>
			<tbody class="table-body">
				<tr class="table-body-row">
					<td class="table-body-row-cell">Default</td>
					<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay }}</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">LuDisplayFullname.firstlast ('fl')</td>
					<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:fullLastfirst }}</td>
				</tr>
				<tr class="table-body-row">
					<td class="table-body-row-cell">LuDisplayFullname.lastfirst ('lf')</td>
					<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:fullFirstlast }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayFullname.first ('f')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:fullFirst }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayFullname.last ('l')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:fullLast }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayInitials.firstlast ('FL')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:initialFirstlast }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayInitials.lastfirst ('LF')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:initialLastfirst }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayInitials.last ('L')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:initialLast }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayInitials.first ('F')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:initialfirst }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayHybrid.firstIlastFull ('Fl')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:firstIlastFull }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayHybrid.firstFulllastI ('fL')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:firstFulllastI }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayHybrid.lastIfirstFull ('Lf')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:lastIfirstFull }}</td>
				</tr>
				<tr class="table-body-row">
						<td class="table-body-row-cell">LuDisplayHybrid.lastFullfirstI ('lF')</td>
						<td class="table-body-row-cell u-textRight">{{ user | luUserDisplay:lastFullfirstI }}</td>
				</tr>
			</tbody>
		</table>
	`,
})
class DisplayStory {
	public user: ILuUser = bob;
	public fullFirstlast = LuDisplayFullname.firstlast;
	public fullLastfirst = LuDisplayFullname.lastfirst;
	public fullFirst = LuDisplayFullname.first;
	public fullLast = LuDisplayFullname.last;
	public initialFirstlast = LuDisplayInitials.firstlast;
	public initialLastfirst = LuDisplayInitials.lastfirst;
	public initialLast = LuDisplayInitials.last;
	public initialfirst = LuDisplayInitials.first;
	public firstIlastFull = LuDisplayHybrid.firstIlastFull;
	public firstFulllastI = LuDisplayHybrid.firstFulllastI;
	public lastIfirstFull = LuDisplayHybrid.lastIfirstFull;
	public lastFullfirstI = LuDisplayHybrid.lastFullfirstI;
}

export default {
	title: 'Documentation/Users/Display/Basic',
	component: DisplayStory,
	argTypes: {
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
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};