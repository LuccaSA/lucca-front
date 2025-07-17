import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { JsonPipe } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, createComponent, DestroyRef, Directive, forwardRef, inject, input, inputBinding, OnInit, Type, ViewContainerRef } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AsyncValidatorFn, FormControl, FormControlDirective, FormGroup, NgControl, ValidatorFn } from '@angular/forms';
import { LuCoreSelectEstablishmentsDirective } from '@lucca-front/ng/core-select/establishment';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { startWith } from 'rxjs';

interface BaseFormFactoryConfig {
	label: string | (() => string);
	validators?: ValidatorFn | ValidatorFn[];
	asyncValidators?: AsyncValidatorFn | AsyncValidatorFn[];
}

interface TextFormFactoryConfig extends BaseFormFactoryConfig {
	type: 'text';
}

type ElementFormFactoryConfig = TextFormFactoryConfig | SimpleSelectFormFactoryConfig | MultiSelectFormFactoryConfig;
type FormFactoryConfig = Partial<Record<string, ElementFormFactoryConfig>>;

type ComponentDirectiveBinding = Parameters<typeof createComponent>[1]['directives'][number];

interface SimpleSelectFormFactoryConfig extends BaseFormFactoryConfig {
	type: 'simple-select';
	directives: ComponentDirectiveBinding[];
}

interface MultiSelectFormFactoryConfig extends BaseFormFactoryConfig {
	type: 'multi-select';
	directives: ComponentDirectiveBinding[];
}

const inputComponentByType: Record<ElementFormFactoryConfig['type'], Type<unknown>> = {
	text: TextInputComponent,
	'simple-select': LuSimpleSelectInputComponent,
	'multi-select': LuMultiSelectInputComponent,
};

/**
 * `FormControlDirective` is not standalone so it can not be used directly in `createComponent({ directives: [...] })`
 */
@Directive({
	providers: [
		{
			provide: NgControl,
			useExisting: forwardRef(() => StandaloneFormControlDirective),
		},
	],
})
class StandaloneFormControlDirective extends FormControlDirective {}

@Directive({ selector: '[luFormFactory]' })
export class FormFactoryDirective implements OnInit {
	#viewContainerRef = inject(ViewContainerRef);
	#destroyRef = inject(DestroyRef);

	manifest = input.required<FormFactoryConfig>({ alias: 'luFormFactory' });
	form = input.required<FormGroup>({ alias: 'luFormFactoryForm' });

	ngOnInit(): void {
		const group = this.form();

		for (const [key, config] of Object.entries(this.manifest())) {
			const control = new FormControl(null, {
				validators: config.validators ?? [],
				asyncValidators: config.asyncValidators ?? [],
			});
			group.addControl(key, control, { emitEvent: false });

			const input = this.#viewContainerRef.createComponent(inputComponentByType[config.type], {
				directives: [
					{
						type: StandaloneFormControlDirective,
						bindings: [inputBinding('formControl', () => control)],
					},
					...('directives' in config ? config.directives : []),
				],
			});

			this.#viewContainerRef.createComponent(FormFieldComponent, {
				bindings: [inputBinding('label', typeof config.label === 'function' ? config.label : () => config.label)],
				projectableNodes: [[input.location.nativeElement]],
			});
		}

		// Emit initial value
		group.patchValue({});
	}
}

@Component({
	selector: 'lu-form-factory-test',
	imports: [FormFactoryDirective, JsonPipe],
	template: `
		<h1 class="pr-u-marginBlockEnd200">Form Factory Test</h1>
		<div class="form-container">
			<ng-container [luFormFactory]="manifest" [luFormFactoryForm]="form" />
		</div>
		<pre>{{ formValue() | json }}</pre>
	`,
	styles: [
		`
			.form-container {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-100);
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFactoryStories {
	form = new FormGroup({});
	manifest = {
		name: {
			type: 'text',
			label: 'Nom du règlementaire',
		},
		description: {
			type: 'text',
			label: 'Description du règlementaire',
		},
		establishment: {
			type: 'simple-select',
			label: 'Etablissement',
			directives: [LuCoreSelectEstablishmentsDirective],
		},
		establishments: {
			type: 'multi-select',
			label: 'Etablissements',
			directives: [LuCoreSelectEstablishmentsDirective],
		},
	} satisfies FormFactoryConfig;

	formValue = toSignal(this.form.valueChanges.pipe(startWith(this.form.value)));
}

export default {
	title: 'Documentation/Forms/Factory/Basic',
	component: FormFactoryStories,
	decorators: [
		applicationConfig({
			providers: [provideHttpClient()],
		}),
	],
} as Meta;

export const Basic: StoryObj<FormFactoryStories> = {};
