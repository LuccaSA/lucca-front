import { applicationConfig, Meta } from '@storybook/angular';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { allLegumes } from '@/stories/forms/select/select.utils';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { FormFieldComponent } from '@lucca-front/ng/form-field';

@Component({
	selector: 'multi-select-onpush',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuMultiSelectInputComponent, LuCoreSelectApiV4Directive, FormFieldComponent],
	styles: [
		`
			lu-form-field {
				display: block;
				padding-top: 550px;
				padding-bottom: 600px;
			}
			.scroll-test {
				overflow: auto;
				height: 600px;
			}
		`,
	],
	template: `
		<div class="scroll-test">
			<lu-form-field label="Inside an OnPush Component">
				<lu-multi-select apiV4="/organization/structure/api/establishments" />
			</lu-form-field>
		</div>
	`,
})
class MultiSelectOnPush {
	allLegumes = allLegumes;
}

export default {
	title: 'Documentation/Forms/MultiSelect/OnPush TEST',
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()],
		}),
	],
	component: MultiSelectOnPush,
} as Meta;

export const Basic = {};
