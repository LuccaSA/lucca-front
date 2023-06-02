import { NgPlural, NgPluralCase } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'select-advanced-stories',
	standalone: true,
	imports: [LuSelectInputComponent, LuOptionModule, LuInputModule, NgPlural, NgPluralCase, FormsModule],
	template: `
		<label class="textfield">
			<lu-select class="textfield-input" placeholder="Select advanced" [(ngModel)]="model" multiple>
				<ng-template luDisplayer let-colors [luDisplayerMultiple]="true">
					<ng-container [ngPlural]="colors.length">
						<ng-template ngPluralCase="0"></ng-template>
						<ng-template ngPluralCase="one">{{ colors[0].name }}</ng-template>
						<ng-template ngPluralCase="other">
							<span class="chip mod-unkillable">{{ colors.length }}</span>
							couleurs
						</ng-template>
					</ng-container>
				</ng-template>
				<lu-option-picker-advanced>
					<header class="lu-picker-header">
						<lu-option-feeder [options]="options"></lu-option-feeder>
						<lu-option-searcher [searchFn]="searchFn"></lu-option-searcher>
						<lu-option-select-all class="u-displayBlock u-marginXS"></lu-option-select-all>
						<lu-option-pager></lu-option-pager>
					</header>
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
		{ id: 8, name: 'grey' },
	];

	model = [this.options[0]];

	public searchFn({ name }: { name: string }, clue: string): boolean {
		return name.toLocaleLowerCase().includes(clue.toLocaleLowerCase());
	}
}

export default {
	title: 'Documentation/Forms/SelectAdvanced',
	component: SelectAdvancedStory,
	argTypes: {},
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<SelectAdvancedStory> = (args: SelectAdvancedStory) => ({
	props: args,
});

const code = `
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';

@Component({
	selector: 'select-advanced-story',
	standalone: true,
	imports: [LuSelectInputComponent, LuOptionModule, LuInputModule, NgPlural, NgPluralCase, FormsModule],
	template: \`
	<label class="textfield">
		<lu-select
			class="textfield-input"
			placeholder="Select advanced"
			[(ngModel)]="model"
			multiple
		>
			<ng-template luDisplayer let-colors [luDisplayerMultiple]="true">
				<ng-container [ngPlural]="colors.length">
					<ng-template ngPluralCase="0"></ng-template>
					<ng-template ngPluralCase="one">{{ colors[0].name }}</ng-template>
					<ng-template ngPluralCase="other">
						<span class="chip mod-unkillable">{{colors.length}}</span>
						couleurs
					</ng-template>
				</ng-container>
			</ng-template>
			<lu-option-picker-advanced>
				<header class="lu-picker-header">
					<lu-option-feeder [options]="options"></lu-option-feeder>
					<lu-option-searcher [searchFn]="searchFn"></lu-option-searcher>
					<lu-option-select-all></lu-option-select-all>
					<lu-option-pager></lu-option-pager>
				</header>
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
