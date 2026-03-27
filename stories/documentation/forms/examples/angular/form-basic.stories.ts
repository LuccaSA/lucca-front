import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { isNotNil } from '@lucca-front/ng/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormComponent } from '@lucca-front/ng/form';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { FormHeaderComponent } from '@lucca-front/ng/form-header';
import { FieldsetComponent, TextareaInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { ButtonComponent } from '@lucca/prisme/button';
import { Meta, StoryObj } from '@storybook/angular';
import { filter, tap } from 'rxjs';

@Component({
	selector: 'form-basic-story',
	templateUrl: './form-basic.stories.html',
	imports: [
		FormFieldComponent,
		TextInputComponent,
		TextareaInputComponent,
		FormsModule,
		GridColumnComponent,
		GridComponent,
		FieldsetComponent,
		DividerComponent,
		FormComponent,
		DividerComponent,
		FormHeaderComponent,
		ButtonComponent,
		ReactiveFormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormBasicStory implements OnInit {
	#destroyRef = inject(DestroyRef);

	form = new FormGroup({
		field1: new FormControl<string>('Lorem, ipsum dolor sit amet consectetur.', [Validators.maxLength(50)]),
		field2: new FormControl<string>('Sit amet', [Validators.required]),
		field3: new FormControl<string>('', [Validators.required]),
		field4: new FormControl<string>(''),
		field6: new FormControl<string>(''),
		field7: new FormControl<string>(''),
		field8: new FormControl<string>(''),
		field9: new FormControl<string>(
			'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad eligendi voluptas sit facere ipsum, veniam rerum aliquam ut delectus aperiam deserunt cum nulla magnam et laborum sequi.',
			[Validators.maxLength(400)],
		),
		field10: new FormControl<string>(''),
		field11: new FormControl<string>(''),
	});

	ngOnInit(): void {
		this.form.controls.field1.valueChanges
			.pipe(
				filter((value) => isNotNil(value) && value.length > 50),
				tap(() => {
					this.form.controls.field1.markAsTouched();
				}),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe();

		this.form.controls.field9.valueChanges
			.pipe(
				filter((value) => isNotNil(value) && value.length > 400),
				tap(() => {
					this.form.controls.field9.markAsTouched();
				}),
				takeUntilDestroyed(this.#destroyRef),
			)
			.subscribe();
	}

	submit() {
		this.form.markAllAsTouched();
	}
}

export default {
	title: 'Documentation/Forms/Examples/Angular',
	component: FormBasicStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FormBasicStory> = {
	args: {},
	render: template,
};
