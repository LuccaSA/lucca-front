import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuInputDisplayerModule, LuInputModule } from '@lucca-front/ng/input';
import { LuOptionFeederModule, LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent, LuSelectModule } from '@lucca-front/ng/select';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'select-advanced-stories',
	template: `
	<label class="textfield">
		<lu-select
			class="textfield-input"
			placeholder="Select advanced"
			[(ngModel)]="model"
		>
			<ng-container *luDisplayer="let value">
				{{ value.name }}
			</ng-container>
			<lu-option-picker-advanced>
				<lu-option-feeder [options]="options"></lu-option-feeder>
				<lu-option-searcher [searchFn]="searchFn"></lu-option-searcher>
				<lu-option-select-all></lu-option-select-all>
				<lu-option-pager></lu-option-pager>
				<lu-option *luForOptions="let option" [value]="option">{{ option.name }}</lu-option>
			</lu-option-picker-advanced>
			<lu-input-clearer></lu-input-clearer>
		</lu-select>
		<span class="textfield-label">Choisissez une couleur</span>
	</label>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectAdvancedStory {
	options = [
		{ id: 1, name: 'Green' },
		{ id: 2, name: 'Red' },
		{ id: 3, name: 'Yellow' },
		{ id: 4, name: 'Blue' },
		{ id: 5, name: 'purple' },
		{ id: 6, name: 'orange' },
		{ id: 7, name: 'cyan' },
		{ id: 8, name: 'grey' }
	];

	model = this.options[0];

	public searchFn({ name }: { name: string }, clue: string): boolean {
    return this.localeContains(name, clue);
  }

	private localeContains(needle: string, haystack: string): boolean {
		return haystack.split('').reduce((acc, _, i) => {
			return acc || haystack.substr(i, needle.length).localeCompare(needle, undefined, { sensitivity: 'base' }) === 0;
		}, false);
	}
}

export default {
	title: 'Documentation/Forms/SelectAdvanced',
	component: LuSelectInputComponent,
	argTypes: {},
	decorators: [
		componentWrapperDecorator(SelectAdvancedStory),
		moduleMetadata({
			imports: [FormsModule, LuSelectModule, LuOptionModule, LuInputModule, BrowserAnimationsModule, LuOptionFeederModule, LuInputDisplayerModule],
			declarations: [SelectAdvancedStory],
		}),
	],
} as Meta;

const template: Story<SelectAdvancedStory> = (args: SelectAdvancedStory) => ({
	props: args,
});

const code = `
/* 1. Importer les modules */
import { LuInputDisplayerModule, LuInputModule } from '@lucca-front/ng/input';
import { LuOptionFeederModule, LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent, LuSelectModule } from '@lucca-front/ng/select';

@NgModule({
	imports: [
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
		LuOptionFeederModule,
		LuInputDisplayerModule
	]
})
class SelectAdvancedStoriesModule {}

/* 2. Utiliser lu-select avec lu-option-picker-advanced */
@Component({
	selector: 'select-advanced-story',
	template: \`
	<label class="textfield">
		<lu-select
			class="textfield-input"
			placeholder="Select advanced"
			[(ngModel)]="model"
		>
			<ng-container *luDisplayer="let value">
				{{ value.name }}
			</ng-container>
			<lu-option-picker-advanced>
				<lu-option-feeder [options]="options"></lu-option-feeder>
				<lu-option-searcher [searchFn]="searchFn"></lu-option-searcher>
				<lu-option-select-all></lu-option-select-all>
				<lu-option-pager></lu-option-pager>
				<lu-option *luForOptions="let option" [value]="option">{{ option.name }}</lu-option>
			</lu-option-picker-advanced>
			<lu-input-clearer></lu-input-clearer>
		</lu-select>
		<span class="textfield-label">Choisissez une couleur</span>
	</label>
	\`
})
class SelectAdvancedStory { }`;

export const Basic = template.bind({});
Basic.args = {};
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
