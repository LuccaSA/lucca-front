import { TemplateRef } from '@angular/core';

export type PortalContent<T = unknown> = string | TemplateRef<T>;
