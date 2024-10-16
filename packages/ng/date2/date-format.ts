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
