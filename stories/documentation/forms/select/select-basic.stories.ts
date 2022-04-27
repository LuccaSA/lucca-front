import { Component } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LuInputDisplayerModule } from '@lucca-front/ng/input';
import { LuOptionModule } from '@lucca-front/ng/option';
import { LuPopoverModule } from '@lucca-front/ng/popover';
import { LuSelectInputComponent, LuSelectModule } from '@lucca-front/ng/select';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from "@storybook/angular";

@Component({
	selector: 'select-story',
	template: `
		<label class="textfield">
			<lu-select [(ngModel)]="item" class="textfield-input">
				<ng-container *luDisplayer="let value">{{value.name}}</ng-container>
				<lu-option-picker>
					<lu-option [value]="green">{{green.name}}</lu-option>
					<lu-option [value]="red">{{red.name}}</lu-option>
					<lu-option [value]="yellow">{{yellow.name}}</lu-option>
					<lu-option [value]="blue">{{blue.name}}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">normal</span>
		</label>
		<br/>

		<label class="textfield">
			<lu-select [(ngModel)]="item" class="textfield-input">
				<ng-container *luDisplayer="let value">{{value.name}}</ng-container>
				<lu-option-picker>
					<lu-option [disabled]="true" [value]="green">{{green.name}}</lu-option>
					<lu-option [disabled]="true" [value]="red">{{red.name}}</lu-option>
					<lu-option [disabled]="true" [value]="yellow">{{yellow.name}}</lu-option>
					<lu-option [disabled]="true" [value]="blue">{{blue.name}}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">every option disabled</span>
		</label>
		<br/>

		<label class="textfield">
			<lu-select [(ngModel)]="item" class="textfield-input">
				<ng-container *luDisplayer="let value">{{value.name}}</ng-container>
				<lu-option-picker>
					<lu-option [value]="green" [disabled]="true">{{green.name}}</lu-option>
					<lu-option [value]="red">{{red.name}}</lu-option>
					<lu-option [value]="yellow">{{yellow.name}}</lu-option>
					<lu-option [value]="blue">{{blue.name}}</lu-option>
					<lu-option [value]="purple">{{purple.name}}</lu-option>
					<lu-option [value]="orange">{{orange.name}}</lu-option>
					<lu-option [value]="cyan">{{cyan.name}}</lu-option>
					<lu-option [value]="grey" [disabled]="true">{{grey.name}}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">first & last options disabled</span>
		</label>
		<br/>

		<label class="textfield">
			<lu-select [(ngModel)]="item" class="textfield-input">
				<ng-container *luDisplayer="let value">{{value.name}}</ng-container>
				<lu-option-picker>
					<lu-option [value]="green">{{green.name}}</lu-option>
					<lu-option [value]="red">{{red.name}}</lu-option>
					<lu-option [value]="yellow" [disabled]="true">{{yellow.name}}</lu-option>
					<lu-option [value]="blue" [disabled]="true">{{blue.name}}</lu-option>
					<lu-option [value]="purple">{{purple.name}}</lu-option>
					<lu-option [value]="orange">{{orange.name}}</lu-option>
					<lu-option [value]="cyan" [disabled]="true">{{cyan.name}}</lu-option>
					<lu-option [value]="grey">{{grey.name}}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">random options disabled</span>
		</label>
		<br/>

		<label class="textfield">
			<lu-select [(ngModel)]="item" class="textfield-input" [disabled]="true">
				<ng-container *luDisplayer="let value">{{value.name}}</ng-container>
				<lu-option-picker>
					<lu-option [value]="green">{{green.name}}</lu-option>
					<lu-option [value]="red">{{red.name}}</lu-option>
					<lu-option [value]="yellow">{{yellow.name}}</lu-option>
					<lu-option [value]="blue">{{blue.name}}</lu-option>
				</lu-option-picker>
			</lu-select>
			<span class="textfield-label">select disabled</span>
		</label>
	`
})
class SelectModalStory {
	red =	{ id: 1, name: 'red' };
	green = { id: 2, name: 'green' };
	yellow =	{ id: 3, name: 'yellow' };
	blue =	{ id: 4, name: 'blue' };
	purple = { id: 5, name: 'purple' };
	orange = { id: 6, name: 'orange'};
	cyan = { id: 7, name: 'cyan' };
	grey = { id: 8, name: 'grey' };
	item = this.red;

	isDisabled = true;
}

export default {
	title: 'Documentation/Forms/Select',
	component: LuSelectInputComponent,
	decorators: [
		componentWrapperDecorator(SelectModalStory),
		moduleMetadata({
			declarations: [SelectModalStory],
			imports: [
				LuSelectModule,
				LuOptionModule,
				LuPopoverModule,
				LuInputDisplayerModule,
				BrowserAnimationsModule,
			],
		})
	],
} as Meta;

const Template: Story = props => ({
	props: {
		...props
	}
});

export const Basic = Template.bind({});
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code: `
				//TODO: write doc
			`
		}
	}
};
