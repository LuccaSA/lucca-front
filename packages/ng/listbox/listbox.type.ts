/**
 * Available ListboxComponent Types
 */

export const LISTBOX_STATE = ['loading', 'empty'] as const;
export type ListboxState = (typeof LISTBOX_STATE)[number];
