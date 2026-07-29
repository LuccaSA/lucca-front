/**
 * Available LuUserTileComponent Sizes
 */

export const USER_TILE_SIZE = ['L', 'M', 'S', 'XS'] as const;
export type UserTileSize = (typeof USER_TILE_SIZE)[number];
