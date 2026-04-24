/**
 * Available TimeRangePicker Types
 */

export const TIME_RANGE_PICKER_SIZE = ['S', 'M'] as const;
export type TimeRangePickerSize = (typeof TIME_RANGE_PICKER_SIZE)[number];
