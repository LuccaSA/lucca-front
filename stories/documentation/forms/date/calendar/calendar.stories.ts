import { registerLocaleData } from '@angular/common';
import localesFr from '@angular/common/locales/fr';
import { ChangeDetectionStrategy, Component, input, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ALuDateAdapter, ELuDateGranularity, LuDateGranularity, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent, luCalendarInputTranslations, LuDateAdapterPipe } from '@lucca-front/ng/date';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { intlArgType } from '@/helpers/stories';

registerLocaleData(localesFr);

@Component({
	selector: 'date-calendar-stories',
	imports: [LuCalendarInputComponent, LuDateAdapterPipe, FormsModule],
	providers: [{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter }],
	template: `
		<lu-calendar [(ngModel)]="date" [min]="min()" [max]="max()" [granularity]="granularity()" [startOn]="startOn()" />

		<button type="button" class="button mod-outlined pr-u-marginInlineEnd200" (click)="random()">Random</button>

		{{ date | luDate: 'full' }}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class CalendarStory {
	readonly min = input<Date>();
	readonly max = input<Date>();
	readonly granularity = input<LuDateGranularity>(ELuDateGranularity.day);
	readonly startOn = input<Date>();

	date = new Date();

	random() {
		this.date = new Date(this.date);
		this.date.setDate(Math.ceil(Math.random() * 30));
	}
}

// The Storybook date control emits a timestamp
const toDate = (value: unknown): Date | undefined => (value ? new Date(value as number) : undefined);

export default {
	title: 'Documentation/Forms/Date/Calendar',
	argTypes: {
		min: {
			control: { type: 'date' },
			description: 'Date minimale sélectionnable.',
			table: { category: 'inputs' },
		},
		max: {
			control: { type: 'date' },
			description: 'Date maximale sélectionnable.',
			table: { category: 'inputs' },
		},
		granularity: {
			options: Object.values(ELuDateGranularity),
			control: { type: 'select' },
			description: 'Granularité de la valeur sélectionnée.',
			table: { category: 'inputs', defaultValue: { summary: 'day' } },
		},
		startOn: {
			control: { type: 'date' },
			description: 'Date affichée par le calendrier en l’absence de valeur. Par défaut : aujourd’hui.',
			table: { category: 'inputs' },
		},
		intl: intlArgType(luCalendarInputTranslations, 'LuCalendarInputLabel'),
	},
	component: CalendarStory,
	decorators: [
		applicationConfig({
			providers: [provideAnimations(), { provide: LOCALE_ID, useValue: 'en-US' }],
		}),
	],
} as Meta;

const template = (args: Record<string, unknown>) => ({
	props: {
		granularity: args['granularity'],
		min: toDate(args['min']),
		max: toDate(args['max']),
		startOn: toDate(args['startOn']),
	},
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
import { FormsModule } from '@angular/forms';
import { ALuDateAdapter, LuNativeDateAdapter } from '@lucca-front/ng/core';
import { LuCalendarInputComponent } from '@lucca-front/ng/date';

@Component({
	selector: 'calendar-story',
	imports: [LuCalendarInputComponent, FormsModule],
	providers: [{ provide: ALuDateAdapter, useClass: LuNativeDateAdapter }],
	template: \`
	<lu-calendar [(ngModel)]="date" />
	\`
})`;

export const Calendar: StoryObj = {
	args: {
		granularity: ELuDateGranularity.day,
	},
	render: template,
};
Calendar.parameters = {
	controls: { include: ['min', 'max', 'granularity', 'startOn', 'intl'] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
