export const SoftwareIconList = ['compensation'] as const;

export type SoftwareIcon = (typeof SoftwareIconList)[number];
