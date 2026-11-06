import { inject, InjectionToken } from '@angular/core';

/**
 * Source of randomness for purely visual variations (e.g. skeleton widths). Provide a constant function to get a stable rendering.
 */
export const LU_RANDOM = new InjectionToken<() => number>('LU_RANDOM', {
	factory: () => Math.random,
});

export function ɵinjectRandomPercent(defaultMin: number, defaultMax: number): (min?: number, max?: number) => string {
	const random = inject(LU_RANDOM);
	return (min = defaultMin, max = defaultMax) => `${Math.floor(random() * (max - min) + min).toString()}%`;
}
