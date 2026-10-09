import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from './form.component';

@Component({
	selector: 'lu-form-host',
	imports: [FormComponent, ReactiveFormsModule],
	template: `
		<form luForm [formGroup]="formGroup" [focusInvalidOnSubmit]="focusInvalidOnSubmit()" (submit)="onSubmit()">
			<input id="name" formControlName="name" />
			<input id="email" formControlName="email" />
			<button id="save" type="submit">Save</button>
		</form>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FormHost {
	readonly focusInvalidOnSubmit = signal(true);

	readonly formGroup = new FormGroup({
		name: new FormControl('', Validators.required),
		email: new FormControl('', Validators.required),
	});

	onSubmit(): void {
		this.formGroup.markAllAsTouched();
	}
}

@Component({
	selector: 'lu-default-form-host',
	imports: [FormComponent, ReactiveFormsModule],
	template: `
		<form luForm [formGroup]="formGroup">
			<input id="name" formControlName="name" />
			<button id="save" type="submit">Save</button>
		</form>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DefaultFormHost {
	readonly formGroup = new FormGroup({
		name: new FormControl('', Validators.required),
	});
}

describe(FormComponent.name, () => {
	function createHost() {
		TestBed.configureTestingModule({ imports: [FormHost] });
		const fixture = TestBed.createComponent(FormHost);
		fixture.detectChanges();
		const form = (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>('form')!;
		document.body.appendChild(fixture.nativeElement);
		return { fixture, form };
	}

	afterEach(() => {
		document.body.innerHTML = '';
	});

	const flushFocusRender = () => new Promise((resolve) => setTimeout(resolve));

	it('should focus the first invalid field when submitting an invalid form', async () => {
		const { form } = createHost();

		form.dispatchEvent(new Event('submit'));
		await flushFocusRender();

		expect(document.activeElement?.id).toBe('name');
	});

	it('should not move focus when the form is valid', async () => {
		const { fixture, form } = createHost();
		fixture.componentInstance.formGroup.setValue({ name: 'a', email: 'b' });
		fixture.detectChanges();
		const initialActiveElement = document.activeElement;

		form.dispatchEvent(new Event('submit'));
		await flushFocusRender();

		expect(document.activeElement).toBe(initialActiveElement);
	});

	it('should not move focus by default when submitting an invalid form', async () => {
		TestBed.configureTestingModule({ imports: [DefaultFormHost] });
		const fixture = TestBed.createComponent(DefaultFormHost);
		fixture.detectChanges();
		const form = (fixture.nativeElement as HTMLElement).querySelector<HTMLFormElement>('form')!;
		document.body.appendChild(fixture.nativeElement);
		const initialActiveElement = document.activeElement;

		form.dispatchEvent(new Event('submit'));
		await flushFocusRender();

		expect(document.activeElement).toBe(initialActiveElement);
	});

	it('should not move focus when focusInvalidOnSubmit is false', async () => {
		const { fixture, form } = createHost();
		fixture.componentInstance.focusInvalidOnSubmit.set(false);
		fixture.detectChanges();
		const initialActiveElement = document.activeElement;

		form.dispatchEvent(new Event('submit'));
		await flushFocusRender();

		expect(document.activeElement).toBe(initialActiveElement);
	});

	it('should focus the first invalid field even when it becomes touched only in the submit handler', async () => {
		const { fixture, form } = createHost();
		fixture.componentInstance.formGroup.controls.email.setValue('b');
		fixture.detectChanges();

		form.dispatchEvent(new Event('submit'));
		await flushFocusRender();

		expect(document.activeElement?.id).toBe('name');
	});
});
