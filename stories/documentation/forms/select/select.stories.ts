import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuInputModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuSelectInputComponent, LuSelectModule } from '@lucca-front/ng/select';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'select-stories',
	template: `
		<section class="section">
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
		</section>
		<section class="section">
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
		</section>
	`,
})
class SelectStory {
	green = { id: 1, name: 'Green' };
	red = { id: 2, name: 'Red' };
	yellow = { id: 3, name: 'Yellow' };
	blue = { id: 4, name: 'Blue' };
}

export default {
	title: 'Documentation/Forms/Select',
	component: LuSelectInputComponent,
	argTypes: {},
	decorators: [
		componentWrapperDecorator(SelectStory),
		moduleMetadata({
			imports: [LuSelectModule, LuOptionModule, LuInputModule, BrowserAnimationsModule],
			declarations: [SelectStory],
		}),
	],
} as Meta;

const template: Story<SelectStory> = (args: SelectStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {};
