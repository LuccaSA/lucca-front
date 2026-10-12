import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { BUTTON_TYPE, ButtonType } from './button.type';

@Component({
	selector: 'lu-button-test',
	imports: [ButtonComponent],
	template: `
		<button type="button" data-testid="luButton" [luButton]="type()">Button</button>
		<button type="button" data-testid="prButton" [prButton]="type()">Button</button>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	type = input<ButtonType>('');
}

describe('ButtonComponent', () => {
	let button: ButtonComponent;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ButtonComponent],
		}).compileComponents();
		button = TestBed.createComponent(ButtonComponent).componentInstance;
	});

	it('Should init properly', () => {
		expect(button).not.toBeUndefined();
	});

	describe('type classes', () => {
		let fixture: ComponentFixture<HostComponent>;

		const classesOf = (testId: string): string[] =>
			[...(fixture.nativeElement as HTMLElement).querySelector(`[data-testid="${testId}"]`)!.classList].filter((klass) => klass.startsWith('mod-')).sort();

		const render = async (type: ButtonType) => {
			fixture.componentRef.setInput('type', type);
			fixture.detectChanges();
			await fixture.whenStable();
		};

		beforeEach(() => {
			fixture = TestBed.createComponent(HostComponent);
		});

		it.each(BUTTON_TYPE)('should set the same classes with prButton and luButton for "%s"', async (type) => {
			// Act
			await render(type);
			// Assert
			expect(classesOf('prButton')).toEqual(classesOf('luButton'));
		});

		it('should set the AI and invert classes for "AI-invert"', async () => {
			// Act
			await render('AI-invert');
			// Assert
			expect(classesOf('prButton')).toEqual(['mod-AI', 'mod-invert']);
		});

		it('should set the ghost classes for the deprecated "text"', async () => {
			// Act
			await render('text');
			// Assert
			expect(classesOf('luButton')).toEqual(['mod-ghost']);
		});

		it('should set the ghost invert classes for the deprecated "text-invert"', async () => {
			// Act
			await render('text-invert');
			// Assert
			expect(classesOf('luButton')).toEqual(['mod-ghost', 'mod-invert']);
		});
	});
});
