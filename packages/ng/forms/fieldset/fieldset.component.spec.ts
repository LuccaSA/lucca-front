import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldsetActionDirective } from './fieldset-action.directive';
import { FieldsetComponent } from './fieldset.component';

@Component({
	selector: 'lu-fieldset-test',
	imports: [FieldsetComponent, FieldsetActionDirective],
	template: `
		<lu-fieldset class="input" heading="Title" [action]="actionTpl">Content</lu-fieldset>
		<lu-fieldset class="projected" heading="Title" [expandable]="expandable()">
			<button type="button" luFieldsetAction>Projected</button>
			Content
		</lu-fieldset>
		<lu-fieldset class="both" heading="Title" [action]="actionTpl">
			<button type="button" luFieldsetAction>Projected</button>
			Content
		</lu-fieldset>
		<lu-fieldset class="parent" heading="Title">
			<lu-fieldset class="child" heading="Title">
				<button type="button" luFieldsetAction>Projected</button>
				Content
			</lu-fieldset>
		</lu-fieldset>
		<ng-template #actionTpl><button type="button">From input</button></ng-template>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	expandable = signal(false);
}

describe(FieldsetComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let element: HTMLElement;

	const action = (selector: string) => element.querySelector(`lu-fieldset.${selector} > fieldset > legend .fieldset-title-content-action`);
	const text = (node: Element | null | undefined) => node?.textContent?.trim();

	beforeEach(() => {
		fixture = TestBed.createComponent(HostComponent);
		element = fixture.nativeElement as HTMLElement;
		fixture.detectChanges();
	});

	describe('action', () => {
		it('should render the action input', () => {
			expect(text(action('input'))).toBe('From input');
		});

		it('should render the luFieldsetAction element in the action area, not in the content', () => {
			expect(text(action('projected'))).toBe('Projected');
			expect(text(element.querySelector('.projected .fieldset-content'))).toBe('Content');
		});

		it('should give the action input priority over the projected element', () => {
			expect(text(action('both'))).toBe('From input');
			expect(element.querySelector('.both')?.textContent).not.toContain('Projected');
		});

		it('should ignore the action of a nested fieldset', () => {
			expect(action('parent')).toBeNull();
			expect(text(action('child'))).toBe('Projected');
		});

		it('should ignore the projected action when expandable', () => {
			fixture.componentInstance.expandable.set(true);
			fixture.detectChanges();

			expect(action('projected')).toBeNull();
			expect(element.querySelector('.projected')?.textContent).not.toContain('Projected');
		});
	});
});
