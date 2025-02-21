export const KILO_BYTE = 1000;
export const MEGA_BYTE = KILO_BYTE * 1000;

export function formatSize(locale: string, size: number): string {
	let unit = 'byte';
	let value = size;

	if (size >= MEGA_BYTE) {
		unit = 'megabyte';
		value /= MEGA_BYTE;
	} else if (size >= KILO_BYTE) {
		unit = 'kilobyte';
		value /= KILO_BYTE;
	}

	const weightFormatter = Intl.NumberFormat(locale, {
		notation: 'compact',
		style: 'unit',
		unit: unit,
		unitDisplay: 'narrow',
	});

	return weightFormatter.format(value);
}
