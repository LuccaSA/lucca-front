/**
 * Available BasePickerComponent sizes
 */

export const BASE_PICKER_SIZE = ['S', 'M'] as const;
export type BasePickerSize = (typeof BASE_PICKER_SIZE)[number];
