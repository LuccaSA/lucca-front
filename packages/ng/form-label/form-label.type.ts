/**
 * Available FormLabelComponent Types
 */

export const FORM_LABEL_SIZE = ['XS', 'S'] as const;
export type FormLabelSize = (typeof FORM_LABEL_SIZE)[number];
