/**
 * Available LuUserPictureComponent Sizes
 */

export const USER_PICTURE_SIZE = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const;
export type UserPictureSize = (typeof USER_PICTURE_SIZE)[number];
