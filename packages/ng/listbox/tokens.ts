import { InjectionToken } from '@angular/core';
import { ListboxComponent } from './listbox.component';
import { OptionComponent } from './option/option.component';

export const LISTBOX_INSTANCE = new InjectionToken<ListboxComponent>('LuListboxInstance');
export const OPTION_INSTANCE = new InjectionToken<OptionComponent>('LuOptionInstance');
