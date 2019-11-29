import { ILuPopupConfig } from '@lucca-front/ng/popup';
import { ChangeDetectionStrategy } from '@angular/core';

export interface ILuModalConfig extends ILuPopupConfig {
	changeDetection: ChangeDetectionStrategy;
}
