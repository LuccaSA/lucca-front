import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { LuDateModule } from '@lucca-front/ng/date';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';
import { FormsModule } from '@angular/forms';

@Component({
	selector: 'date-select-stories',
	template: `
<label class="textfield palette-secondary">
	<lu-date-select class="textfield-input" placeholder="oijzeoifj" [ngModel]="model" (ngModelChange)="modelChange($event)"></lu-date-select>
</label>
`,
}) class DateSelectStory {
	@Input() model: string;

	modelChange(value: string) {
		// debugger;
		console.log('LuDateSelect', { value });
	}
}

export default {
	title: 'NG/Date/select',
	component: DateSelectStory,
	decorators: [
		moduleMetadata({
			entryComponents: [DateSelectStory],
			imports: [
				LuDateModule,
				BrowserAnimationsModule,
				FormsModule,
			],
			providers: [
				{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }
			]
		})
	]
} as Meta;

const template: Story<DateSelectStory> = (args: DateSelectStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	model: "2021-05-06",
}
