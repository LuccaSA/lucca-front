/**
 * Available RadioGroupInputComponent Types
 */

export const RADIO_GROUP_INPUT_SIZE = ['S', 'M'] as const;
export type RadioGroupInputSize = (typeof RADIO_GROUP_INPUT_SIZE)[number];

export const RADIO_GROUP_INPUT_FRAMED_SIZE = ['L'] as const;
export type RadioGroupInputFramedSize = (typeof RADIO_GROUP_INPUT_FRAMED_SIZE)[number];

export const RADIO_GROUP_INPUT_ARROW = ['neutral', 'default'] as const;
export type RadioGroupInputArrow = (typeof RADIO_GROUP_INPUT_ARROW)[number];
