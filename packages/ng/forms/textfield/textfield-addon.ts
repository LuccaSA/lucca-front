import { LuccaIcon } from '@lucca-front/icons';

export interface TextfieldIconAddon {
	icon: LuccaIcon;
	ariaLabel: string;
}

export interface TextfieldStringAddon {
	content: string;
	ariaLabel: string;
}

export type TextfieldAddon = TextfieldIconAddon | TextfieldStringAddon;
