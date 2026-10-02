import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { SkipLinkDirective } from './skip-link.directive';
import { SkipLinksService } from './skip-links.service';

@Component({
	selector: 'lu-skip-link-test',
	imports: [SkipLinkDirective],
	template: '',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkipLinkTestComponent {
	readonly label = input('Main content');
	readonly target = input('');
	readonly displayed = input(true);
}

describe(SkipLinkDirective.name, () => {
	let fixture: ComponentFixture<SkipLinkTestComponent>;
	let service: SkipLinksService;

	const setup = (template: string, inputs: Partial<Record<'label' | 'target' | 'displayed', unknown>> = {}) => {
		TestBed.overrideComponent(SkipLinkTestComponent, { set: { template } });
		fixture = TestBed.createComponent(SkipLinkTestComponent);
		service = TestBed.inject(SkipLinksService);
		Object.entries(inputs).forEach(([name, value]) => fixture.componentRef.setInput(name, value));
		render();
	};

	/** The directive's effect can update its own target, which re-runs it: flush until stable. */
	const render = () => {
		fixture.detectChanges();
		TestBed.flushEffects();
	};

	const getTarget = () => (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.target')!;
	const registeredLinks = () => service.links().map(({ id, label, host }) => ({ id, label, host }));

	describe('host element', () => {
		it('should flag the host as a skip link target', () => {
			// Act
			setup(`<div class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().classList).toContain('skipLinks_target');
		});

		it('should make a non-focusable host programmatically focusable', () => {
			// Act
			setup(`<div class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().getAttribute('tabindex')).toBe('-1');
		});

		it.each([
			['a button', `<button type="button" class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></button>`],
			['a link', `<a href="#" class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></a>`],
			['an input', `<input class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()" />`],
		])('should not add a tabindex on %s', (_, template) => {
			// Act
			setup(template);
			// Assert
			expect(getTarget().hasAttribute('tabindex')).toBe(false);
		});

		it('should keep an existing tabindex', () => {
			// Act
			setup(`<div class="target" tabindex="0" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().getAttribute('tabindex')).toBe('0');
		});
	});

	describe('id resolution and registration', () => {
		it('should set the given target as id and register the link', () => {
			// Act
			setup(`<div class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().id).toBe('main');
			expect(registeredLinks()).toEqual([{ id: 'main', label: 'Main content', host: getTarget() }]);
		});

		it('should reuse the existing id when no target is given', () => {
			// Act
			setup(`<div class="target" id="existing" luSkipLinkTarget [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().id).toBe('existing');
			expect(registeredLinks()).toEqual([{ id: 'existing', label: 'Main content', host: getTarget() }]);
		});

		it('should generate an id when there is neither a target nor an existing id', () => {
			// Act
			setup(`<div class="target" luSkipLinkTarget [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().id).toMatch(/^skipLink\d+$/);
			expect(registeredLinks()).toEqual([{ id: getTarget().id, label: 'Main content', host: getTarget() }]);
		});

		it('should generate a distinct id for each target', () => {
			// Act
			setup(`
				<div class="target" luSkipLinkTarget [luSkipLinkLabel]="label()"></div>
				<div class="other" luSkipLinkTarget [luSkipLinkLabel]="label()"></div>
			`);
			// Assert
			const [first, second] = service.links().map((link) => link.id);
			expect(first).not.toBe(second);
		});

		it('should overwrite an existing id with the given target and warn about it', () => {
			// Arrange
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
			// Act
			setup(`<div class="target" id="existing" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(getTarget().id).toBe('main');
			expect(registeredLinks()).toEqual([{ id: 'main', label: 'Main content', host: getTarget() }]);
			expect(warn).toHaveBeenCalledExactlyOnceWith('The ID passed as a parameter to luSkipLinkTarget will overwrite the existing ID on the element.');
		});

		it('should not warn when the existing id matches the given target', () => {
			// Arrange
			const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
			// Act
			setup(`<div class="target" id="main" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Assert
			expect(warn).not.toHaveBeenCalled();
			expect(registeredLinks()).toEqual([{ id: 'main', label: 'Main content', host: getTarget() }]);
		});

		it('should register the links in document order', () => {
			// Act
			setup(`
				<div class="first" luSkipLinkTarget="first" luSkipLinkLabel="First"></div>
				<div class="second" luSkipLinkTarget="second" luSkipLinkLabel="Second"></div>
			`);
			// Assert
			expect(service.links().map((link) => link.label)).toEqual(['First', 'Second']);
		});
	});

	describe('input changes', () => {
		it('should update the registered link when the label changes', () => {
			// Arrange
			setup(`<div class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>`);
			// Act
			fixture.componentRef.setInput('label', 'Content');
			render();
			// Assert
			expect(registeredLinks()).toEqual([{ id: 'main', label: 'Content', host: getTarget() }]);
		});

		it('should replace the registered link when the target changes', () => {
			// Arrange
			vi.spyOn(console, 'warn').mockImplementation(() => {});
			setup(`<div class="target" [luSkipLinkTarget]="target()" [luSkipLinkLabel]="label()"></div>`, { target: 'main' });
			// Act
			fixture.componentRef.setInput('target', 'content');
			render();
			// Assert
			expect(getTarget().id).toBe('content');
			expect(registeredLinks()).toEqual([{ id: 'content', label: 'Main content', host: getTarget() }]);
		});
	});

	describe('destroy', () => {
		it('should unregister the link when the host is destroyed', () => {
			// Arrange
			setup(
				`@if (displayed()) {
					<div class="target" luSkipLinkTarget="main" [luSkipLinkLabel]="label()"></div>
				}`,
			);
			// Act
			fixture.componentRef.setInput('displayed', false);
			render();
			// Assert
			expect(service.links()).toEqual([]);
		});

		it('should keep the other links registered', () => {
			// Arrange
			setup(`
				@if (displayed()) {
					<div luSkipLinkTarget="first" luSkipLinkLabel="First"></div>
				}
				<div luSkipLinkTarget="second" luSkipLinkLabel="Second"></div>
			`);
			// Act
			fixture.componentRef.setInput('displayed', false);
			render();
			// Assert
			expect(service.links().map((link) => link.id)).toEqual(['second']);
		});
	});
});
