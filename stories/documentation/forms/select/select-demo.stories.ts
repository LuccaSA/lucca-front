import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuInputDisplayerDirective } from '@lucca-front/ng/input';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';
import { LuOptionItemComponent, LuOptionPickerComponent } from '@lucca-front/ng/option';
import { LuSelectInputComponent } from '@lucca-front/ng/select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

@Component({
	selector: 'select-demo-stories',
	standalone: true,
	imports: [
		LuSelectInputComponent,
		LuOptionItemComponent,
		LuOptionPickerComponent,
		LuInputDisplayerDirective,
		FormsModule,
		FormFieldComponent,
		LuSimpleSelectInputComponent,
		LuMultiSelectInputComponent,
		LuOptionDirective,
		LuMultiSelectWithSelectAllDirective,
		LuDisplayerDirective,
	],
	template: `
		<div lang="fr" class="u-displayFlex pr-u-gap200">
			<div>
				<label class="textfield">
					<lu-select class="textfield-input">
						<ng-container *luDisplayer="let value">{{ value }}</ng-container>
						<lu-option-picker>
							<lu-option [value]="'Zone A'">
								<strong>Zone A</strong><br />
								Bordeaux, Lyon…
							</lu-option>
							<lu-option [value]="'Zone B'">
								<strong>Zone B</strong><br />
								Marseille, Lille…
							</lu-option>
							<lu-option [value]="'Zone C'">
								<strong>Zone C</strong><br />
								Paris, Toulouse…
							</lu-option>
						</lu-option-picker>
					</lu-select>
					<span class="textfield-label">Zone de vacances scolaires</span>
				</label>
			</div>
			<div>
				<lu-form-field [label]="'Zone de vacances scolaires'">
					<lu-simple-select #selectRef1 [options]="['Zone A', 'Zone B', 'Zone C']" [(ngModel)]="example2">
						<ng-container *luDisplayer="let zone; select: selectRef1">{{ zone }}</ng-container>
						<ng-container *luOption="let zone; select: selectRef1"
							><strong>{{ zone }}</strong
							><br />{{ townByZone[zone] }}</ng-container
						>
					</lu-simple-select>
				</lu-form-field>
			</div>
			<div>
				<lu-form-field [label]="'Zone de vacances scolaires'">
					<lu-multi-select #selectRef2 [options]="['Zone A', 'Zone B', 'Zone C']" [(ngModel)]="example3" [addOptionLabel]="'Ajouter une zone'" addOptionStrategy="always" (addOption)="addOption()">
						<ng-container *luDisplayer="let zone; select: selectRef2">{{ zone }}</ng-container>
						<ng-container *luOption="let zone; select: selectRef2"
							><strong>{{ zone }}</strong
							><br />{{ townByZone[zone] }}</ng-container
						>
					</lu-multi-select>
				</lu-form-field>
			</div>
		</div>
	`,
})
class SelectDemoStory {
	green = { id: 1, name: 'Green' };
	red = { id: 2, name: 'Red' };
	yellow = { id: 3, name: 'Yellow' };
	blue = { id: 4, name: 'Blue' };
	purple = { id: 5, name: 'purple' };
	orange = { id: 6, name: 'orange' };
	cyan = { id: 7, name: 'cyan' };
	grey = { id: 8, name: 'grey' };
	item = this.red;
	townByZone = {
		'Zone A': 'Bordeaux, Lyon…',
		'Zone B': 'Marseille, Lille…',
		'Zone C': 'Paris, Toulouse…',
	};
	addOption() {}
}

export default {
	title: 'Documentation/Forms/Select/demo',
	component: SelectDemoStory,
	argTypes: {},
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template: StoryFn<SelectDemoStory> = (args) => ({
	props: args,
});

export const Demo = template.bind({});
Demo.args = {};
Demo.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
};
