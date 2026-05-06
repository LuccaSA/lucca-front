import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Meta } from '@storybook/angular';

const LOCALES = ['fr-FR', 'en-US', 'es-ES', 'de-DE', 'it-IT', 'nl-NL', 'pt-PT', 'pl-PL'] as const;

// Reference Sunday: 2024-01-07
const REFERENCE_SUNDAY = new Date(2024, 0, 7);

function getDayNames(locale: string, style: 'long' | 'short'): string[] {
	return Array.from({ length: 7 }, (_, i) => {
		const date = new Date(REFERENCE_SUNDAY);
		date.setDate(REFERENCE_SUNDAY.getDate() + i);
		return new Intl.DateTimeFormat(locale, { weekday: style }).format(date);
	});
}

function getMonthNames(locale: string, style: 'long' | 'short'): string[] {
	return Array.from({ length: 12 }, (_, i) => {
		const date = new Date(2024, i, 1);
		return new Intl.DateTimeFormat(locale, { month: style }).format(date);
	});
}

interface LocaleData {
	locale: string;
	days: string[];
	daysShort: string[];
	months: string[];
	monthsShort: string[];
}

const LOCALE_DATA: LocaleData[] = LOCALES.map((locale) => ({
	locale,
	days: getDayNames(locale, 'long'),
	daysShort: getDayNames(locale, 'short'),
	months: getMonthNames(locale, 'long'),
	monthsShort: getMonthNames(locale, 'short'),
}));

@Component({
	selector: 'intl-stories',
	template: `
		<table class="demo-QAtable">
			<thead>
				<tr>
					<th rowspan="2">Locale</th>
					<th colspan="2">Months</th>
					<th colspan="2">Days</th>
				</tr>
				<tr>
					<th>Long</th>
					<th>Short</th>
					<th>Long</th>
					<th>Short</th>
				</tr>
			</thead>
			<tbody>
				@for (entry of localeData; track entry.locale) {
					@for (i of monthIndices; track i) {
						<tr>
							@if (i === 0) {
								<td [attr.rowspan]="monthIndices.length">{{ entry.locale }}</td>
							}
							<td>{{ entry.months[i] }}</td>
							<td>{{ entry.monthsShort[i] }}</td>
							<td>{{ i < 7 ? entry.days[i] : '' }}</td>
							<td>{{ i < 7 ? entry.daysShort[i] : '' }}</td>
						</tr>
					}
				}
			</tbody>
		</table>

		<!-- To tell the ui-diff tool that the page has finished rendering -->
		<span id="ready"></span>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class IntlStory {
	protected readonly localeData = LOCALE_DATA;
	protected readonly monthIndices = Array.from({ length: 12 }, (_, i) => i);
}

export default {
	title: 'QA/Intl',
	component: IntlStory,
} as Meta;

export const Basic = {};
