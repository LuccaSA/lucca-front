import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuOptionGroupDirective, SelectDataSource, SelectDataSourceParams } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { Meta, StoryObj } from '@storybook/angular-vite';
import { delay, Observable, of } from 'rxjs';
import { allLegumes, colorNameByColor, ILegume, LegumeColor } from '../../documentation/forms/select/select.utils';

const PAGE_SIZE = 20;
const LOAD_DELAY_MS = 1000;

function buildDataSource(): SelectDataSource<ILegume, LegumeColor> {
	return {
		getOptions({ clue, page }: SelectDataSourceParams): Observable<readonly ILegume[]> {
			const filtered = allLegumes.sort((a, b) => (a.color < b.color ? 1 : -1)).filter((l) => !clue || l.name.toLowerCase().includes(clue.toLowerCase()));
			const start = page * PAGE_SIZE;
			console.log({ clue, page, options: filtered.slice(start, start + PAGE_SIZE) });
			return of(filtered.slice(start, start + PAGE_SIZE)).pipe(delay(LOAD_DELAY_MS));
		},
		getGroupOptions(color: LegumeColor): Observable<ILegume[]> {
			return of(allLegumes.filter((l) => l.color === color)).pipe(delay(LOAD_DELAY_MS));
		},
	};
}

@Component({
	selector: 'multi-select-group-datasource-story',
	imports: [JsonPipe, FormsModule, LuMultiSelectInputComponent, FormFieldComponent, LuOptionGroupDirective],
	template: `
		<lu-form-field label="Légumes par couleur">
			<lu-multi-select #selectRef placeholder="Choisir des légumes" clearable [(ngModel)]="selectedLegumes" [dataSource]="dataSource">
				<ng-container *luOptionGroup="let group; by: legumeColor; select: selectRef">
					{{ colorNameByColor[group.key] }}
				</ng-container>
			</lu-multi-select>
		</lu-form-field>

		<p style="margin-top: 1rem; font-size: 0.875rem; color: var(--colors-neutral-700)">
			Options paginées par {{ pageSize }} avec un délai de {{ delayMs }}ms.<br />
			"Tout sélectionner" charge <strong>toutes</strong> les options du groupe via <code>getGroupOptions</code> (délai {{ delayMs }}ms).
		</p>

		<pre>{{ selectedLegumes | json }}</pre>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class MultiSelectGroupDataSourceStory {
	readonly pageSize = PAGE_SIZE;
	readonly delayMs = LOAD_DELAY_MS;
	readonly colorNameByColor = colorNameByColor;
	readonly legumeColor = (legume: ILegume): LegumeColor => legume.color;

	selectedLegumes: ILegume[] = [];

	readonly dataSource = buildDataSource();
}

export default {
	title: 'QA/MultiSelect/GroupDataSource',
	component: MultiSelectGroupDataSourceStory,
} as Meta;

export const GroupWithDataSource: StoryObj<MultiSelectGroupDataSourceStory> = {
	args: {},
	render: (args) => ({ props: args }),
	parameters: {
		controls: { include: [] },
	},
};
