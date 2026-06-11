/**
 * Available FooterComponent Types
 */

export const FOOTER_NARROW_AT_MEDIA_MAX = ['XXS', 'XS', 'S', 'M'] as const;
export type FooterNarrowAtMediaMax = (typeof FOOTER_NARROW_AT_MEDIA_MAX)[number];

export const FOOTER_CONTAINER_MAX = ['M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type FooterContainerMax = (typeof FOOTER_CONTAINER_MAX)[number];
