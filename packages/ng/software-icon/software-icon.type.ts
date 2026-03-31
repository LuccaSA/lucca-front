/**
 * Available SoftwareIconComponent Sizes
 */

export const SOFTWARE_ICON_SIZE = ['XXS', 'XS', 'S', 'L'] as const;
export type SoftwareIconSize = (typeof SOFTWARE_ICON_SIZE)[number];
