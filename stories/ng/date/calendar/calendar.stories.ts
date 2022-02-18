import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { ALuDateAdapter, LuNativeDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';
import { LuDateModule } from '@lucca-front/ng/date';

@Component({
	selector: 'date-calendar-stories',
	templateUrl: './calendar.stories.html'
})
class CalendarStories implements OnInit {
	date = new Date();
	ngOnInit() {
		// this.date.setFullYear(2016);
	}
	random() {
		this.date = new Date(this.date);
		this.date.setDate(Math.ceil(Math.random() * 30));
	}
}

export default {
	title: 'NG/Date/Calendar',
	component: CalendarStories,
	decorators: [
		moduleMetadata({
			entryComponents: [CalendarStories],
			imports: [
				LuDateModule,
				BrowserAnimationsModule,
				FormsModule,
			],
			providers: [
				{ provide: LOCALE_ID, useValue: 'en-US' },
				// { provide: LOCALE_ID, useValue: 'fr-FR' },
				{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
			]
		})
	]
} as Meta;

const template: Story<CalendarStories> = (args: CalendarStories) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	model: new Date(),
}
