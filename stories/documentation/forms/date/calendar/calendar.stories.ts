import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent, LuDateModule } from '@lucca-front/ng/date';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'date-calendar-stories',
	template: `
		<lu-calendar [(ngModel)]="date"></lu-calendar>

		<button class="button mod-outlined u-marginRightSmall" (click)="random()">Random</button>

		{{ date | luDate: 'full' }}
	`,
})
class CalendarStories implements OnInit {
	date = new Date();
	ngOnInit() {}
	random() {
		this.date = new Date(this.date);
		this.date.setDate(Math.ceil(Math.random() * 30));
	}
}

export default {
	title: 'Documentation/Forms/Date/Calendar',
	component: LuCalendarInputComponent,
	decorators: [
		componentWrapperDecorator(CalendarStories),
		moduleMetadata({
			declarations: [CalendarStories],
			imports: [LuDateModule, BrowserAnimationsModule, FormsModule],
			providers: [
				{ provide: LOCALE_ID, useValue: 'en-US' },
				{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter },
			],
		}),
	],
} as Meta;

const template: Story<CalendarStories> = (args: CalendarStories) => ({
	props: args,
});

const code = `/*
	1. Importer LuDateModule et BrowserAnimationsModule,
	   provider un ALuDateAdapter
*/
import { LuDateModule } from '@lucca-front/ng/date';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuStringDateAdapter } from '@lucca-front/ng/core';

@NgModule({
	imports: [LuDateModule, BrowserAnimationsModule],
	providers: [{ provide: ALuDateAdapter, useClass: LuStringDateAdapter }]
})
class CalendarStoriesModule {}

/* 2. Utiliser lu-calendar  */
@Component({
	selector: 'calendar-story',
	template: \`
	<lu-calendar [(ngModel)]="date"></lu-calendar>
	\`
})`;

export const Calendar = template.bind({});
Calendar.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			code,
		},
	},
};
