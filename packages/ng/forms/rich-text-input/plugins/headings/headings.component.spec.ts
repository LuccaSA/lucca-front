import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { vi } from 'vitest';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { ListStyleToolbarComponent } from '../list-format/list-style-toolbar.component';
import { HeadingsComponent } from './headings.component';

@Component({
	selector: 'lu-headings-host',
	imports: [ReactiveFormsModule, RichTextInputComponent, HtmlFormatterDirective, HeadingsComponent, ListStyleToolbarComponent],
	template: `
		<lu-rich-text-input luWithHtmlFormatter [formControl]="formControl">
			<lu-rich-text-plugin-headings />
			<lu-rich-text-toolbar-list-style />
		</lu-rich-text-input>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HeadingsHostComponent {
	readonly formControl = new FormControl<string | null>(null);
}

describe(HeadingsComponent.name, () => {
	let fixture: ComponentFixture<HeadingsHostComponent>;
	let host: HeadingsHostComponent;

	function getTextbox(): HTMLElement {
		return (fixture.nativeElement as HTMLElement).querySelector('[role="textbox"]')!;
	}

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HeadingsHostComponent] });
		fixture = TestBed.createComponent(HeadingsHostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	describe('disabled state', () => {
		it('should not change the block holding the selection when the control is enabled', async () => {
			// Arrange
			const value = '<p>Intro</p><ul><li>First</li><li>Last</li></ul>';
			host.formControl.setValue(value);
			await vi.waitFor(() => expect(getTextbox().querySelectorAll('li')).toHaveLength(2));

			// Act
			host.formControl.enable();
			fixture.detectChanges();
			await fixture.whenStable();

			// Assert
			expect(getTextbox().querySelectorAll('li')).toHaveLength(2);
			expect(host.formControl.value).toBe(value);
			expect(host.formControl.pristine).toBe(true);
		});
	});
});
