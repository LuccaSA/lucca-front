/**
 * Available ChipComponent Types
 */

export const CHIP_SIZE = ['S'] as const;
export type ChipSize = (typeof CHIP_SIZE)[number];

export const CHIP_STATE = ['warning', 'critical'] as const;
export type ChipState = (typeof CHIP_STATE)[number];
