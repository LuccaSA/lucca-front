export const FORM_FIELD_SIZE = ['XS', 'S', 'M'] as const;
export type FormFieldSize = (typeof FORM_FIELD_SIZE)[number];
