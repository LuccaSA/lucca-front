/**
 * Available PhoneNumberInputComponent Autocomplete values
 */

export const PHONE_NUMBER_INPUT_AUTOCOMPLETE = ['off', 'tel'] as const;
export type PhoneNumberInputAutocomplete = (typeof PHONE_NUMBER_INPUT_AUTOCOMPLETE)[number];
