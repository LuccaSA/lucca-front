import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent, LuSelectModule } from '@lucca-front/ng/select';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'select-stories',
	template: `
	<div class="u-displayFlex">
		<label class="textfield u-marginRightSmall">
			<lu-select class="textfield-input" placeholder="Select an item">
				<ng-container *luDisplayer="let value">{{ value }}</ng-container>
				<lu-option-picker>
					<lu-option [value]="1">1</lu-option>
					<lu-option [value]="2">2</lu-option>
					<lu-option [value]="3">3</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">Select</span>
		</label>
		<label class="textfield u-marginRightSmall">
			<lu-select class="textfield-input" placeholder="Select an item" [multiple]="true">
				<ng-container *luDisplayer="let value">{{ value }}</ng-container>
				<lu-option-picker>
					<lu-option [value]="1">1</lu-option>
					<lu-option [value]="2">2</lu-option>
					<lu-option [value]="3">3</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">Multiple Select</span>
		</label>
		<label class="textfield u-marginRightSmall">
			<lu-select [(ngModel)]="item" class="textfield-input">
				<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
				<lu-option-picker>
					<lu-option [value]="green">{{ green.name }}</lu-option>
					<lu-option [value]="red">{{ red.name }}</lu-option>
					<lu-option [value]="yellow" [disabled]="true">{{ yellow.name }}</lu-option>
					<lu-option [value]="blue" [disabled]="true">{{ blue.name }}</lu-option>
					<lu-option [value]="purple">{{ purple.name }}</lu-option>
					<lu-option [value]="orange">{{ orange.name }}</lu-option>
					<lu-option [value]="cyan" [disabled]="true">{{ cyan.name }}</lu-option>
					<lu-option [value]="grey">{{ grey.name }}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">Disabled options</span>
		</label>
		<label class="textfield">
			<lu-select [(ngModel)]="item" class="textfield-input" [disabled]="true">
				<ng-container *luDisplayer="let value">{{ value.name }}</ng-container>
				<lu-option-picker>
					<lu-option [value]="green">{{ green.name }}</lu-option>
					<lu-option [value]="red">{{ red.name }}</lu-option>
					<lu-option [value]="yellow">{{ yellow.name }}</lu-option>
					<lu-option [value]="blue">{{ blue.name }}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">Disabled field</span>
		</label>
	</div>
	`,
})
class SelectStory {
	green = { id: 1, name: 'Green' };
	red = { id: 2, name: 'Red' };
	yellow = { id: 3, name: 'Yellow' };
	blue = { id: 4, name: 'Blue' };
	purple = { id: 5, name: 'purple' };
	orange = { id: 6, name: 'orange' };
	cyan = { id: 7, name: 'cyan' };
	grey = { id: 8, name: 'grey' };
	item = this.red;
}

export default {
	title: 'Documentation/Forms/Select',
	component: LuSelectInputComponent,
	argTypes: {},
	decorators: [
		componentWrapperDecorator(SelectStory),
		moduleMetadata({
			imports: [FormsModule, LuSelectModule, LuOptionModule, LuInputModule, BrowserAnimationsModule],
			declarations: [SelectStory],
		}),
	],
} as Meta;

const template: Story<SelectStory> = (args: SelectStory) => ({
	props: args,
});

const code = `
/* 1. Importer LuSelectModule, LuOptionModule, LuInputModule */
import { LuSelectModule } from '@lucca-front/ng/api';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuInputModule } from '@lucca-front/ng/input';

@NgModule({
	imports: [
		LuSelectModule,
		LuOptionModule,
		LuInputModule,
	]
})
class SelectStoriesModule {}

/* 2. Utiliser lu-select */
@Component({
	selector: 'select-story',
	template: \`
		<label class="textfield">
			<lu-select class="textfield-input" placeholder="Select an item">
				<span *luDisplayer="let value">{{ value }}</span>
				<lu-option-picker>
					<lu-option [value]="1">1</lu-option>
					<lu-option [value]="2">2</lu-option>
					<lu-option [value]="3">3</lu-option>
				</lu-option-picker>
			</lu-select>
		</label>
		<label class="textfield">
			<lu-select class="textfield-input" placeholder="Select an item" [multiple]="true">
				<span *luDisplayer="let value">{{ value }}</span>
				<lu-option-picker>
					<lu-option [value]="1">1</lu-option>
					<lu-option [value]="2">2</lu-option>
					<lu-option [value]="3">3</lu-option>
				</lu-option-picker>
			</lu-select>
		</label>
		<label class="textfield">
			<lu-select class="textfield-input">
				<h4 class="u-marginReset" *luDisplayer="let value">{{ value.id }} - {{ value.name }}</h4>
				<lu-option-picker>
					<lu-option [value]="green">{{ green.name }}</lu-option>
					<lu-option [value]="red">{{ red.name }}</lu-option>
					<lu-option [value]="yellow">{{ yellow.name }}</lu-option>
					<lu-option [value]="blue">{{ blue.name }}</lu-option>
				</lu-option-picker>
			</lu-select>
		</label>
	\`
})
class SelectStory { }`;

export const Basic = template.bind({});
Basic.args = {};
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code,
		},
	},
};
