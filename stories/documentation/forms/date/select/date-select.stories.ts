import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';
import { LuDateModule, LuDateSelectInputComponent } from '@lucca-front/ng/date';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'date-select-stories',
	template: `
		<label class="textfield">
			<lu-date-select class="textfield-input" [ngModel]="model" (ngModelChange)="modelChange($event)"></lu-date-select>
		</label>
	`,
})
class DateSelectStory {
	@Input() model: string = '2021-05-06';

	modelChange(value: string) {
		// debugger;
		console.log('LuDateSelect', { value });
	}
}

export default {
	title: 'Documentation/Forms/Date/Select',
	component: LuDateSelectInputComponent,
	decorators: [
		componentWrapperDecorator(DateSelectStory),
		moduleMetadata({
			declarations: [DateSelectStory],
			imports: [LuDateModule, BrowserAnimationsModule, FormsModule],
			providers: [{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }],
		}),
	],
} as Meta;

const template: Story<DateSelectStory> = (props: DateSelectStory) => ({});

const code = `
/*
	1. Importer LuDateSelectInputModule et BrowserAnimationsModule
	   provider un ALuDateAdapter
*/
import { LuDateSelectInputModule } from '@lucca-front/ng/date';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';

@NgModule({
	imports: [LuDateSelectInputModule, BrowserAnimationsModule],
	providers: [{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }]
})
class DateSelectStoriesModule {}

/* 2. Utiliser lu-date-select */
@Component({
	selector: 'date-select-story',
	template: \`
	<label class="textfield">
		<lu-date-select
			class="textfield-input"
			[ngModel]="date"
			[min]="minDate"
			[max]="maxDate"
			[hideClearer]="true"
			(ngModelChange)="doSomething($event)"
		>
		</lu-date-select>
		<span class="textfield-label u-mask" translate="KEY_FOR_ACCESSIBILITY"></span>
	</label>
	\`
})`;

export const Select = template.bind({});
Select.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code,
		},
	},
};
