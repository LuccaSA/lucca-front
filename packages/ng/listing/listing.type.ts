/**
 * Available ListingComponent sizes
 */
export const LISTING_SIZE = ['S'] as const;
export type ListingSize = (typeof LISTING_SIZE)[number];
