import { ChangeDetectionStrategy, Component, forwardRef, input, signal, viewChildren } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { PlainTextFormatterWithTagsDirective, provideLuRichTextPlainTextFormatter } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
import { vi } from 'vitest';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextInputComponent, RichTextPluginComponent } from './rich-text-input.component';

@Component({
	selector: 'lu-fake-plugin',
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: RICH_TEXT_PLUGIN_COMPONENT, useExisting: forwardRef(() => FakePluginComponent) }],
})
class FakePluginComponent implements RichTextPluginComponent {
	readonly name = input.required<string>();
	readonly tabindex = signal(-1);
	readonly setEditorInstance = vi.fn();
	readonly setDisabledState = vi.fn();
	readonly focus = vi.fn();
}

// Mimics the toolbar plugin: groups nested plugins in its own view
@Component({
	selector: 'lu-fake-plugin-group',
	imports: [FakePluginComponent],
	template: `<lu-fake-plugin name="b" /><lu-fake-plugin name="c" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [{ provide: RICH_TEXT_PLUGIN_COMPONENT, useExisting: forwardRef(() => FakePluginGroupComponent) }],
})
class FakePluginGroupComponent implements RichTextPluginComponent {
	readonly pluginComponents = viewChildren(RICH_TEXT_PLUGIN_COMPONENT);

	setEditorInstance(): void {
		return;
	}

	setDisabledState(isDisabled: boolean): void {
		this.pluginComponents().forEach((plugin) => plugin.setDisabledState(isDisabled));
	}
}

@Component({
	selector: 'lu-rich-text-input-host',
	imports: [ReactiveFormsModule, FormFieldComponent, RichTextInputComponent, PlainTextFormatterWithTagsDirective, FakePluginComponent, FakePluginGroupComponent],
	template: `
		<lu-form-field label="Description">
			<lu-rich-text-input luWithPlainTextTagsFormatter placeholder="Write here" [formControl]="formControl">
				<lu-fake-plugin name="a" />
				<lu-fake-plugin-group />
				<lu-fake-plugin name="d" />
			</lu-rich-text-input>
		</lu-form-field>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class RichTextInputHostComponent {
	readonly formControl = new FormControl<string | null>('Hello world');
}

describe(RichTextInputComponent.name, () => {
	let fixture: ComponentFixture<RichTextInputHostComponent>;
	let host: RichTextInputHostComponent;

	function getTextbox(): HTMLElement {
		return (fixture.nativeElement as HTMLElement).querySelector('[role="textbox"]')!;
	}

	function getToolbar(): HTMLElement {
		return (fixture.nativeElement as HTMLElement).querySelector('[role="toolbar"]')!;
	}

	function getPlugins(): Record<string, FakePluginComponent> {
		const plugins = fixture.debugElement.queryAll((el) => el.componentInstance instanceof FakePluginComponent).map((el) => el.componentInstance as FakePluginComponent);
		return Object.fromEntries(plugins.map((plugin) => [plugin.name(), plugin]));
	}

	function getTabindexes(): Record<string, number> {
		return Object.fromEntries(Object.entries(getPlugins()).map(([name, plugin]) => [name, plugin.tabindex()]));
	}

	function pressOnToolbar(key: 'ArrowLeft' | 'ArrowRight'): void {
		getToolbar().dispatchEvent(new KeyboardEvent('keydown', { key }));
		fixture.detectChanges();
	}

	beforeEach(() => {
		// Root formatter for components created without the host (its directive provides one too)
		TestBed.configureTestingModule({ imports: [RichTextInputHostComponent], providers: [provideLuRichTextPlainTextFormatter()] });
		fixture = TestBed.createComponent(RichTextInputHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('value', () => {
		it('should render the initial control value', async () => {
			// Assert
			await vi.waitFor(() => expect(getTextbox().textContent).toBe('Hello world'));
		});

		it('should render a value written before the editor is initialized', async () => {
			// Arrange
			const standalone = TestBed.createComponent(RichTextInputComponent);

			// Act
			standalone.componentInstance.writeValue('Pending value');
			standalone.detectChanges();

			// Assert
			await vi.waitFor(() => expect((standalone.nativeElement as HTMLElement).querySelector('[role="textbox"]')?.textContent).toBe('Pending value'));
		});

		it('should keep the control pristine and untouched when the value is set programmatically', async () => {
			// Arrange
			await vi.waitFor(() => expect(getTextbox().textContent).toBe('Hello world'));

			// Act
			host.formControl.setValue('Updated');
			await vi.waitFor(() => expect(getTextbox().textContent).toBe('Updated'));

			// Assert
			expect(host.formControl.pristine).toBe(true);
			expect(host.formControl.touched).toBe(false);
			expect(host.formControl.value).toBe('Updated');
		});
	});

	describe('placeholder', () => {
		it('should expose the placeholder only while the editor is empty', async () => {
			// Arrange
			const placeholder = () => (fixture.nativeElement as HTMLElement).querySelector('.richTextField-content-placeholder');
			await vi.waitFor(() => {
				fixture.detectChanges();
				expect(getTextbox().getAttribute('aria-placeholder')).toBeNull();
			});
			expect(placeholder()).toBeNull();

			// Act
			host.formControl.setValue(null);

			// Assert
			await vi.waitFor(() => {
				fixture.detectChanges();
				expect(getTextbox().getAttribute('aria-placeholder')).toBe('Write here');
			});
			expect(placeholder()?.textContent).toBe('Write here');
		});
	});

	describe('disabled state', () => {
		it('should reflect the disabled state on the editor and its plugins', () => {
			// Act
			host.formControl.disable();
			fixture.detectChanges();

			// Assert
			expect(getTextbox().getAttribute('aria-disabled')).toBe('true');
			expect(getTextbox().getAttribute('contenteditable')).toBe('false');
			Object.values(getPlugins()).forEach((plugin) => expect(plugin.setDisabledState).toHaveBeenLastCalledWith(true));
		});
	});

	describe('accessibility', () => {
		it('should link the textbox and toolbar to the form field label', () => {
			// Arrange
			const formField = fixture.debugElement.query((el) => el.componentInstance instanceof FormFieldComponent).componentInstance as FormFieldComponent;
			const id = formField.id();

			// Assert
			expect(id).not.toBe('');
			expect(getTextbox().getAttribute('aria-labelledby')).toContain(`${id}-label`);
			expect(getToolbar().getAttribute('aria-labelledby')).toBe(`${id}-label`);
			expect(getToolbar().getAttribute('aria-controls')).toBe(id);
		});

		it('should make only the first plugin focusable initially', () => {
			// Assert
			expect(getTabindexes()).toEqual({ a: 0, b: -1, c: -1, d: -1 });
		});

		it('should move the roving tabindex through nested plugins with arrow keys', () => {
			// Act
			pressOnToolbar('ArrowRight');

			// Assert
			expect(getTabindexes()).toEqual({ a: -1, b: 0, c: -1, d: -1 });
			expect(getPlugins()['b'].focus).toHaveBeenCalledOnce();

			// Act
			pressOnToolbar('ArrowLeft');

			// Assert
			expect(getTabindexes()).toEqual({ a: 0, b: -1, c: -1, d: -1 });
		});

		it('should wrap the roving tabindex at both ends of the toolbar', () => {
			// Act
			pressOnToolbar('ArrowLeft');

			// Assert
			expect(getTabindexes()).toEqual({ a: -1, b: -1, c: -1, d: 0 });

			// Act
			pressOnToolbar('ArrowRight');

			// Assert
			expect(getTabindexes()).toEqual({ a: 0, b: -1, c: -1, d: -1 });
		});
	});
});
