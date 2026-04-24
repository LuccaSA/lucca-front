/**
 * Available ErrorPageComponent Types
 */

export const ERROR_PAGE_ILLUSTRATION = ['400', '403', '404', '429', '500', 'keyboard', 'lock', 'map'] as const;
export type ErrorPageIllustration = (typeof ERROR_PAGE_ILLUSTRATION)[number];
