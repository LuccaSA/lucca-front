/**
 * Available BubbleIconComponent Types
 */

export const BUBBLE_ICON_SIZE = ['S', 'M', 'L'] as const;
export type BubbleIconSize = (typeof BUBBLE_ICON_SIZE)[number];

export const BUBBLE_ICON_DIRECTION = ['top', 'bottom', 'left', 'right', 'random'] as const;
export type BubbleIconDirection = (typeof BUBBLE_ICON_DIRECTION)[number];
