/**
 * Available FormFieldComponent types
 */

export const FORM_FIELD_WIDTH = [20, 30, 40, 50, 60] as const;
export type FormFieldWidth = (typeof FORM_FIELD_WIDTH)[number];

export const FORM_FIELD_LAYOUT = ['default', 'checkable', 'fieldset'] as const;
export type FormFieldLayout = (typeof FORM_FIELD_LAYOUT)[number];
