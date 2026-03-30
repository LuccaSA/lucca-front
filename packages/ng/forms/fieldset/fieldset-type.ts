/**
 * Available FieldsetComponent sizes
 */

export const FIELDSET_SIZE = ['S'] as const;
export type FieldsetSize = (typeof FIELDSET_SIZE)[number];
