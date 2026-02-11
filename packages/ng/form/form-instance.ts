import { InjectionToken } from '@angular/core';
import { FormComponent } from './form.component';

export const LU_FORM_INSTANCE = new InjectionToken<FormComponent>('LuForm:Instance');
