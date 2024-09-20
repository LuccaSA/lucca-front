import { Palette } from '@lucca-front/ng/core';

export interface DateRange {
	class?: `palette-${Palette}` | string;
	start: Date;
	end?: Date;
	label?: string;
}
