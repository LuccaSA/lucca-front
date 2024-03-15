import { registerLocaleData } from '@angular/common';
import localesFr from '@angular/common/locales/fr';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent, LuDateAdapterPipe } from '@lucca-front/ng/date';
import { Meta, StoryFn, applicationConfig } from '@storybook/angular';

registerLocaleData(localesFr);

@Component({
	selector: 'date-calendar-stories',
	standalone: true,
	imports: [LuCalendarInputComponent, LuDateAdapterPipe, FormsModule],
	providers: [{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter }],
	template: `
		<lu-calendar [(ngModel)]="date"></lu-calendar>

		<button type="button" class="button mod-outlined pr-u-marginRight200" (click)="random()">Random</button>

		{{ date | luDate : 'full' }}
	`,
})
class CalendarStory implements OnInit {
	date = new Date();
	ngOnInit() {}
	random() {
		this.date = new Date(this.date);
		this.date.setDate(Math.ceil(Math.random() * 30));
	}
}

export default {
	title: 'Documentation/Forms/Date/Calendar',
	component: CalendarStory,
	decorators: [
		applicationConfig({
			providers: [provideAnimations(), { provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

const template: StoryFn<CalendarStory> = (args) => ({
	props: args,
});

const code = `
/*
	1. Appeler provideAnimations
*/
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
	providers: [provideAnimations()],
})
class AppModule {}

/* 2. Utiliser lu-calendar */
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent } from '@lucca-front/ng/date';

@Component({
	selector: 'calendar-story',
	standalone: true,
	imports: [LuCalendarInputComponent],
	providers: [{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter }],
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
			type: 'code',
			code,
		},
	},
};
