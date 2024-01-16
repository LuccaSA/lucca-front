import { LuccaIcon } from '@lucca-front/icons';

export type TextfieldIconAddon = {
	icon: LuccaIcon;
	ariaLabel: string;
};

export type TextfieldTextAddon = {
	content: string;
	ariaLabel: string;
};

export type TextInputAddon = TextfieldIconAddon | TextfieldTextAddon;
