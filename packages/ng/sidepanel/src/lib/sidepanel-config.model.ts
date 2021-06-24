import { ILuModalConfig } from '@lucca-front/ng/modal';

export interface ILuSidepanelConfig extends ILuModalConfig {
	position?: 'left' | 'right' | 'top' | 'bottom';
}
