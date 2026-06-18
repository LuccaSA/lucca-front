import { LuccaIcon } from '@lucca-front/icons';
import { PortalContent } from '@lucca-front/ng/core';

export type TextfieldIconAddon = {
	icon: LuccaIcon;
	ariaLabel: string;
};

export type TextfieldTextAddon = {
	content: PortalContent;
	ariaLabel: string;
};

export type TextInputAddon = TextfieldIconAddon | TextfieldTextAddon;
