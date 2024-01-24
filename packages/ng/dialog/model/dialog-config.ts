import { LuDialogComponent } from './dialog-component';
import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DialogPartial } from './types';
import { ComponentType } from '@angular/cdk/overlay';

export interface LuDialogConfig<C extends LuDialogComponent> {
	backdrop?: boolean;
	dismissible?: boolean;
	component: ComponentType<C> | TemplateRef<C>;
	params?: DialogPartial<C>;
	dialogData?: C['dialogData'];
	canClose?: (comp: C) => boolean | Observable<boolean>;
}
