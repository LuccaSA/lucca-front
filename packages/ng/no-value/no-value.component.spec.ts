import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoValueComponent } from './no-value.component';

/**
 * Text exposed to assistive technologies: the content without the `aria-hidden` parts.
 */
function accessibleText(element: Element): string {
	const clone = element.cloneNode(true) as Element;
	clone.querySelectorAll('[aria-hidden="true"]').forEach((hidden) => hidden.remove());
	return clone.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

@Component({
	selector: 'lu-no-value-test',
	imports: [NoValueComponent],
	template: `
		<p class="outside"><lu-no-value [alt]="alt()" [intl]="intl()" /></p>
		<table>
			<tbody>
				<tr>
					<td class="cell"><lu-no-value [alt]="alt()" /></td>
					<td class="deferredCell">
						@if (show()) {
							<lu-no-value />
						}
					</td>
					<td class="wrappedCell">
						<div><lu-no-value /></div>
					</td>
					<td class="textCell">Manager: <lu-no-value /></td>
				</tr>
			</tbody>
		</table>
		<div role="table">
			<div role="row">
				<div role="cell" class="ariaCell"><lu-no-value /></div>
			</div>
		</div>
		<table role="presentation">
			<tr>
				<td class="layoutCell"><lu-no-value /></td>
			</tr>
		</table>
		<table>
			<tr>
				<td class="layoutInDataCell">
					<table role="none">
						<tr>
							<td><lu-no-value /></td>
						</tr>
					</table>
				</td>
			</tr>
		</table>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class NoValueTestComponent {
	readonly alt = input<string>();
	readonly intl = input<{ noValue?: string }>({});
	readonly show = input(false);
}

describe(NoValueComponent.name, () => {
	let fixture: ComponentFixture<NoValueTestComponent>;

	async function render(inputs: { alt?: string; intl?: { noValue?: string }; show?: boolean } = {}): Promise<HTMLElement> {
		fixture = TestBed.createComponent(NoValueTestComponent);
		Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();
		return fixture.nativeElement;
	}

	it('should display an em dash hidden from assistive technologies', async () => {
		const root = await render();

		expect(root.querySelector('.outside [aria-hidden="true"][data-content-before="—"]')).toBeTruthy();
	});

	it('should add a visually hidden text outside a table cell', async () => {
		const root = await render();

		expect(accessibleText(root.querySelector('.outside')!)).toBe('Not provided');
	});

	it('should add no text inside a table cell', async () => {
		const root = await render();

		expect(root.querySelector('.cell [data-content-before="—"]')).toBeTruthy();
		expect(accessibleText(root.querySelector('.cell')!)).toBe('');
	});

	it('should add no text inside an ARIA cell', async () => {
		const root = await render();

		expect(accessibleText(root.querySelector('.ariaCell')!)).toBe('');
	});

	it('should add no text when wrapped in an element of a table cell', async () => {
		const root = await render();

		expect(accessibleText(root.querySelector('.wrappedCell')!)).toBe('');
	});

	it('should add a visually hidden text in a table cell that has another text', async () => {
		const root = await render();

		expect(accessibleText(root.querySelector('.textCell')!)).toBe('Manager: Not provided');
	});

	it('should add a visually hidden text in a cell of a layout table', async () => {
		const root = await render();

		expect(accessibleText(root.querySelector('.layoutCell')!)).toBe('Not provided');
	});

	it('should look past a layout table for an enclosing table cell', async () => {
		const root = await render();

		expect(accessibleText(root.querySelector('.layoutInDataCell')!)).toBe('');
	});

	it('should add no text when inserted in a table cell after its creation', async () => {
		await render();
		fixture.componentRef.setInput('show', true);
		fixture.detectChanges();
		await fixture.whenStable();
		fixture.detectChanges();

		const cell: HTMLElement = fixture.nativeElement.querySelector('.deferredCell');
		expect(cell.querySelector('lu-no-value')).toBeTruthy();
		expect(accessibleText(cell)).toBe('');
	});

	it('should read the alt text instead, in a table cell too', async () => {
		const root = await render({ alt: 'No manager' });

		expect(accessibleText(root.querySelector('.outside')!)).toBe('No manager');
		expect(accessibleText(root.querySelector('.cell')!)).toBe('No manager');
	});

	it('should read nothing with an empty alt', async () => {
		const root = await render({ alt: '' });

		expect(accessibleText(root.querySelector('.outside')!)).toBe('');
	});

	it('should follow the intl overrides', async () => {
		const root = await render({ intl: { noValue: 'Unknown' } });

		expect(accessibleText(root.querySelector('.outside')!)).toBe('Unknown');
	});
});
