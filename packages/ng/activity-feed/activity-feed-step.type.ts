/**
 * Available ActivityFeedComponent Types
 */

export const ACTIVITY_FEED_STEP_STATUS = ['success', 'critical', 'pending'] as const;
export type ActivityFeedStepStatus = (typeof ACTIVITY_FEED_STEP_STATUS)[number];
