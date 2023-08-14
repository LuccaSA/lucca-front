import { FormlyExtension, FormlyFieldConfig } from '@ngx-formly/core';

export function buildAddWrapperExtension(wrapperName: string, predicate: (f: FormlyFieldConfig | undefined) => boolean): FormlyExtension {
	return {
		postPopulate(field: FormlyFieldConfig) {
			if (predicate(field)) {
				field.wrappers = [...(field.wrappers || []), wrapperName];
			}
		},
	};
}
