// Based on Intl number input
// (more info: https://dm4t2.github.io/)

export const countOccurrences = (str: string, search: string): number => {
	return (str.match(new RegExp(escapeRegExp(search), 'g')) || []).length;
};

export const getPrefix = (parts: Intl.NumberFormatPart[]) =>
	parts
		.slice(0, parts.map((p) => p.type).indexOf('integer'))
		.map((p) => p.value)
		.join('');

export const getSuffix = (parts: Intl.NumberFormatPart[]) => {
	const types = parts.map((p) => p.type);
	return parts
		.slice(Math.max(types.lastIndexOf('integer'), types.indexOf('fraction')) + 1)
		.map((p) => p.value)
		.join('');
};

export const substringBefore = (str: string, search: string): string => {
	return str.substring(0, str.indexOf(search));
};

export const escapeRegExp = (str: string): string => {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const removeLeadingZeros = (str: string): string => {
	return str.replace(/^0+(0$|[^0])/, '$1');
};
