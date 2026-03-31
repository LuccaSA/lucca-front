/**
 * Available CalloutComponent Types
 */

export const CALLOUT_SIZE = ['M', 'S'] as const;
export type CalloutSize = (typeof CALLOUT_SIZE)[number];

export const CALLOUT_POPOVER_SIZE = ['M', 'S', 'XS'] as const;
export type CalloutPopoverSize = (typeof CALLOUT_POPOVER_SIZE)[number];
