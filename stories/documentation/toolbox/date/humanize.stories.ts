import { AsyncPipe } from '@angular/common';
import { Component, Directive, Injector, Input, LOCALE_ID, OnChanges, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { CalloutComponent } from '@lucca-front/ng/callout';
import { LuHumanizeDateFormatter, LuHumanizeDatePipe, LuRelativeTime, LuRelativeTimeFormatUnit } from '@lucca-front/ng/date';
import { Meta, StoryFn, StoryObj, applicationConfig } from '@storybook/angular';

@Directive({
	selector: '[fakeLocaleId]',
	standalone: true,
})
class FakeLocaleIdDirective implements OnChanges {
	#templateRef = inject(TemplateRef);
	#viewContainerRef = inject(ViewContainerRef);

	@Input() fakeLocaleId = 'fr';

	ngOnChanges(): void {
		this.#viewContainerRef.clear();
		this.#viewContainerRef.createEmbeddedView(
			this.#templateRef,
			{},
			{
				injector: Injector.create({
					providers: [{ provide: LOCALE_ID, useValue: this.fakeLocaleId }],
				}),
			},
		);
	}
}

@Component({
	selector: 'humanize-stories',
	standalone: true,
	imports: [LuHumanizeDatePipe, AsyncPipe, FakeLocaleIdDirective, ButtonComponent, CalloutComponent],
	template: `
		<h1>Humanize</h1>

		<h2>Langues</h2>

		<p>Choisissez une langue</p>

		<div class="pr-u-marginBottom300" style="display: flex; gap: var(--pr-t-spacings-100)">
			<button luButton="outline" (click)="locale = 'fr'">FR</button>
			<button luButton="outline" (click)="locale = 'en'">EN</button>
			<button luButton="outline" (click)="locale = 'pt'">PT</button>
		</div>

		<h2>Choisir la date</h2>

		<div class="pr-u-marginBottom300" style="display: flex; gap: var(--pr-t-spacings-100)">
			<button luButton="outline" (click)="setDate('one-hour-ago')">Il y a une heure</button>
			<button luButton="outline" (click)="setDate('one-minute-ago')">Il y a une minute</button>
			<button luButton="outline" (click)="setDate('now')">Maintenant</button>
			<button luButton="outline" (click)="setDate('in-one-minute')">Dans une minute</button>
			<button luButton="outline" (click)="setDate('in-one-hour')">Dans une heure</button>
		</div>

		<h2>Modifier la date</h2>

		<div class="pr-u-marginBottom300" style="display: flex; gap: var(--pr-t-spacings-100)">
			<button luButton="outline" (click)="updateDate('minus-one-hour')">-1 hour</button>
			<button luButton="outline" (click)="updateDate('add-one-hour')">+1 hour</button>
			<button luButton="outline" (click)="updateDate('minus-one-minute')">-1 minute</button>
			<button luButton="outline" (click)="updateDate('add-one-minute')">+1 minute</button>
			<button luButton="outline" (click)="updateDate('minus-10-second')">-10 secondes</button>
			<button luButton="outline" (click)="updateDate('add-10-second')">+10 secondes</button>
		</div>

		<h2>Résultat</h2>

		<lu-callout *fakeLocaleId="locale" class="pr-u-marginBottom300">
			Résultat: <b>{{ date | luHumanizeDate : allowedUnits | async }}</b>
		</lu-callout>
	`,
})
class HumanizeStory {
	locale = 'fr';
	date = new Date();
	allowedUnits?: LuRelativeTimeFormatUnit[];

	setDate(date: 'in-one-minute' | 'one-minute-ago' | 'one-hour-ago' | 'in-one-hour' | 'now') {
		switch (date) {
			case 'in-one-minute':
				this.date = new Date(Date.now() + 60_000);
				break;
			case 'one-minute-ago':
				this.date = new Date(Date.now() - 60_000);
				break;
			case 'one-hour-ago':
				this.date = new Date(Date.now() - 60_000 * 60);
				break;
			case 'in-one-hour':
				this.date = new Date(Date.now() + 60_000 * 60);
				break;
			case 'now':
				this.date = new Date();
				break;
		}
	}

	updateDate(path: 'add-one-minute' | 'minus-one-minute' | 'add-10-second' | 'minus-10-second' | 'add-one-hour' | 'minus-one-hour') {
		switch (path) {
			case 'add-one-minute':
				this.date = new Date(this.date.getTime() + 60_000);
				break;
			case 'minus-one-minute':
				this.date = new Date(this.date.getTime() - 60_000);
				break;
			case 'add-10-second':
				this.date = new Date(this.date.getTime() + 10_000);
				break;
			case 'minus-10-second':
				this.date = new Date(this.date.getTime() - 10_000);
				break;
			case 'add-one-hour':
				this.date = new Date(this.date.getTime() + 60_000 * 60);
				break;
			case 'minus-one-hour':
				this.date = new Date(this.date.getTime() - 60_000 * 60);
				break;
		}
	}
}

export default {
	title: 'Documentation/Toolbox/Dates/Humanize',
	component: HumanizeStory,
	parameters: {
		docs: {
			source: {
				language: 'html',
				type: 'code',
				code: '{{ date | luHumanizeDate | async }}',
			},
		},
	},
} as Meta;

export const Humanize: StoryObj<HumanizeStory> = {};

class CustomHumanizeFormatter extends LuHumanizeDateFormatter {
	override format({ unit, value }: LuRelativeTime): string {
		switch (unit) {
			case 'second':
				return value > 0 ? 'in a few seconds' : 'a few seconds ago';
			case 'day':
				return value === 1 ? 'tomorrow' : value === -1 ? 'yesterday' : super.format({ unit, value });
			default:
				return super.format({ unit, value });
		}
	}
}

export const HumanizeCustomFormatter: StoryObj<HumanizeStory> = {
	decorators: [
		applicationConfig({
			providers: [
				{
					provide: LuHumanizeDateFormatter,
					useClass: CustomHumanizeFormatter,
				},
			],
		}),
	],
};

export const HumanizeAllowedUnits: StoryFn<HumanizeStory> = () => ({
	props: {
		allowedUnits: ['second'],
	},
});
