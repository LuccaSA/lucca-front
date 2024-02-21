import { InjectionToken, TemplateRef, Type } from '@angular/core';

export type PortalContent<T = unknown> = string | TemplateRef<T> | Type<unknown>;

export const PORTAL_CONTEXT = new InjectionToken<unknown>('PORTAL_CONTEXT');
