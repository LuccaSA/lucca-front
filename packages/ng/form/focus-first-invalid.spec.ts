import { focusFirstInvalidControl } from './focus-first-invalid';

describe('focusFirstInvalidControl', () => {
	let form: HTMLFormElement;

	beforeEach(() => {
		form = document.createElement('form');
		document.body.appendChild(form);
	});

	afterEach(() => {
		form.remove();
	});

	it('should focus the first invalid native input', () => {
		form.innerHTML = `
			<input id="valid" class="ng-valid" />
			<input id="first-invalid" class="ng-invalid" />
			<input id="second-invalid" class="ng-invalid" />
		`;

		focusFirstInvalidControl(form);

		expect(document.activeElement?.id).toBe('first-invalid');
	});

	it('should focus the inner focusable element of an invalid non-focusable host', () => {
		form.innerHTML = `
			<lu-simple-select class="ng-invalid">
				<div><input id="inner-input" tabindex="0" /></div>
			</lu-simple-select>
		`;

		focusFirstInvalidControl(form);

		expect(document.activeElement?.id).toBe('inner-input');
	});

	it('should focus the innermost invalid control when a wrapping group is also ng-invalid', () => {
		form.innerHTML = `
			<div class="ng-invalid">
				<input id="leaf-invalid" class="ng-invalid" />
			</div>
		`;

		focusFirstInvalidControl(form);

		expect(document.activeElement?.id).toBe('leaf-invalid');
	});

	it('should do nothing when no control is invalid', () => {
		form.innerHTML = `<input id="valid" class="ng-valid" />`;
		const initialActiveElement = document.activeElement;

		focusFirstInvalidControl(form);

		expect(document.activeElement).toBe(initialActiveElement);
	});

	it('should do nothing when the invalid element has no focusable target', () => {
		form.innerHTML = `<div class="ng-invalid"><span>not focusable</span></div>`;
		const initialActiveElement = document.activeElement;

		focusFirstInvalidControl(form);

		expect(document.activeElement).toBe(initialActiveElement);
	});
});
