import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, ComponentType, PortalOutlet } from '@angular/cdk/portal';
import { ComponentRef } from '@angular/core';
import { Injector } from '@angular/core';
import { LU_MODAL_DATA } from './modal.token';
import { ILuModalConfig } from './modal-config.model';
import { ILuPopupRef, LuPopupRef, ALuPopupRef } from '../popup/index';
import { LuModalPanelComponent } from './modal-panel.component';
import { IModalContent } from './modal.model';

export interface ILuModalRef<T extends IModalContent = IModalContent, D = any, R = any> extends ILuPopupRef<T, D, R> {}
export abstract class ALuModalRef<T extends IModalContent = IModalContent, D = any, R = any> extends ALuPopupRef<T, D, R> implements ILuModalRef<T, D, R> {}
