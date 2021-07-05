import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuApiModule } from '@lucca-front/ng/api';
import { LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectModule } from '@lucca-front/ng/select';
import { LuUserHomonymsModule, LuUserModule } from '@lucca-front/ng/user';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'user-select-stories',
	template: `
		<section class="section">
			<label class="textfield mod-block">
				<lu-select class="textfield-input">
					<span *luDisplayer="let user">{{ user | luUserDisplay }}</span>

					<lu-option-picker-advanced>
						<lu-api-paged-searcher
							[api]="'/timmi-project/api/projectusers/search'"
							[filters]="[
								'currentOrganizationId=1',
								'fields=id,firstName,lastName',
								'orderBy=lastname,asc,firstname,asc'
							]"
							standard="v3">
						</lu-api-paged-searcher>

						<lu-option *luForOptions="let user" [value]="user">
							{{ user | luUserDisplay }}
						</lu-option>
					</lu-option-picker-advanced>
				</lu-select>
				<span class="textfield-label">Pas de gestion des homonymes :</span>
			</label>

			<label class="textfield mod-block u-marginTopBig">
				<lu-select class="textfield-input">
					<span *luDisplayer="let user">{{ user | luUserDisplay }}</span>

					<lu-option-picker-advanced>
						<lu-api-paged-searcher
							[api]="'/timmi-project/api/projectusers/search'"
							[filters]="[
								'currentOrganizationId=1',
								'fields=id,firstName,lastName',
								'orderBy=lastname,asc,firstname,asc'
							]"
							standard="v3">
						</lu-api-paged-searcher>

						<!-- Il suffit d'ajouter cette ligne qui va ajouter une propriété additionalInformation aux homonymes -->
						<lu-user-homonyms></lu-user-homonyms>

						<lu-option *luForOptions="let user" [value]="user">
							{{ user | luUserDisplay }}

							<!-- On peut maintenant afficher cette information -->
							<div *ngIf="user.additionalInformation" class="u-fontStyleItalic u-textSmall">
								({{user.additionalInformation}})
							</div>
						</lu-option>
					</lu-option-picker-advanced>
				</lu-select>
				<span class="textfield-label">Avec gestion des homonymes :</span>
			</label>
		</section>

	`,
})
class UserHomonymsStory {}

export default {
	title: 'NG/User/homonyms',
	component: UserHomonymsStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UserHomonymsStory],
			imports: [
				LuUserModule,
				LuSelectModule,
				LuApiModule,
				LuOptionModule,
				LuUserHomonymsModule,
				LuInputDisplayerModule,
				BrowserAnimationsModule,
				FormsModule,
			],
		})
	]
} as Meta;

const template: Story<UserHomonymsStory> = (args: UserHomonymsStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {}
