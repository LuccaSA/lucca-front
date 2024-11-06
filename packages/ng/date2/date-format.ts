export function getDateFormat(locale: string): string {
	return new Intl.DateTimeFormat(locale).formatToParts(new Date('01/01/2024')).reduce((acc, part) => {
		switch (part.type) {
			case 'day':
				return `${acc}${'d'.repeat(part.value.length)}`;
			case 'month':
				return `${acc}${'M'.repeat(part.value.length)}`;
			case 'year':
				return `${acc}${'y'.repeat(part.value.length)}`;
			case 'literal':
				return `${acc}${part.value}`;
		}
		return acc;
	}, '');
}

// Warning: it works on Latin languages, but deserves to be tested on non-Latin languages
export function getLocalizedDateFormat(locale: string, period: 'year' | 'month' | 'day' = 'day'): string {
	const letterLocalizedForDay = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).formatToParts(100, 'day')[2]['value'].charAt(1).toUpperCase();
	const letterLocalizedForMonth = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).formatToParts(100, 'month')[2]['value'].charAt(1).toUpperCase();
	const letterLocalizedForYear = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' }).formatToParts(100, 'year')[2]['value'].charAt(1).toUpperCase();

	const intlConfig: Intl.DateTimeFormatOptions = {
		year: 'numeric',
	};

	if (period === 'month' || period === 'day') {
		intlConfig.month = 'numeric';
	}

	if (period === 'day') {
		intlConfig.day = 'numeric';
	}

	return new Intl.DateTimeFormat(locale, intlConfig).formatToParts(new Date('01/01/2024')).reduce((acc, part) => {
		switch (part.type) {
			case 'day':
				return `${acc}${letterLocalizedForDay.repeat(part.value.length)}`;
			case 'month':
				return `${acc}${letterLocalizedForMonth.repeat(part.value.length)}`;
			case 'year':
				return `${acc}${letterLocalizedForYear.repeat(part.value.length)}`;
			case 'literal':
				return `${acc}${part.value}`;
		}
		return acc;
	}, '');
}
