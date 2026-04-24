/**
 * Available ActivityFeedComponent Types
 */

export const TIME_PICKER_RANGE_SIZE = ['S', 'M'] as const;
export type TimeRangePickerSize = (typeof TIME_PICKER_RANGE_SIZE)[number];
