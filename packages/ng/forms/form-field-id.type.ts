/**
 * Available FormFieldIdDirective labelledBy strategies
 */

export const FORM_FIELD_ID_LABELLED_BY_STRATEGY = ['prepend', 'append'] as const;
export type FormFieldIdLabelledByStrategy = (typeof FORM_FIELD_ID_LABELLED_BY_STRATEGY)[number];
