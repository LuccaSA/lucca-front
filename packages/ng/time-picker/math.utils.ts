export const roundToNearest = (value: number, step: number) => Math.round(value / step) * step;

export const floorToNearest = (value: number, step: number) => Math.floor(value / step) * step;

export const ceilToNearest = (value: number, step: number) => Math.ceil(value / step) * step;

/**
 * Returns the value of n circularized between 0 and max.
 * Given n = 0 and max = 10, returns 0.
 * Given n = 10 and max = 10, returns 10.
 * Given n = 11 and max = 10, returns 1.
 * Given n = -1 and max = 10, returns 9.
 */
export const circularize = (n: number, max: number) => {
	if (n % max === 0) {
		return n === 0 ? 0 : max;
	}
	return ((n % max) + max) % max;
};
