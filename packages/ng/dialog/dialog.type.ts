/**
 * Available DialogComponent Types
 */

export const DIALOG_FANCY_ILLUSTRATION = ['approval', 'checklist', 'email', 'install', 'mapping', 'save', 'users', 'welcome', 'payment-card'] as const;
export type DialogFancyIllustration = (typeof DIALOG_FANCY_ILLUSTRATION)[number];
