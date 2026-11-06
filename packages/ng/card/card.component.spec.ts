import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
import { CardActionDirective } from './action/card-action.directive';
import { CardComponent } from './card.component';
import { CardHeadingLevel } from './card.type';
import { CardWrapperComponent } from './wrapper/card-wrapper.component';

@Component({
	selector: 'lu-card-test',
	imports: [CardComponent, CardActionDirective],
	template: `
		<lu-card class="numeric" [headingLevel]="headingLevel()"><a href="#" luCardAction>Title</a></lu-card>
		<lu-card class="attribute" headingLevel="5"><a href="#" luCardAction>Title</a></lu-card>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	headingLevel = input<CardHeadingLevel>(3);
}

@Component({
	selector: 'lu-card-wrapper-test',
	imports: [CardComponent, CardActionDirective, CardWrapperComponent],
	template: `
		<lu-card-wrapper [headingLevel]="wrapperHeadingLevel()">
			<lu-card headingLevel="5"><a href="#" luCardAction>Title</a></lu-card>
		</lu-card-wrapper>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class WrapperHostComponent {
	wrapperHeadingLevel = input<CardHeadingLevel | null>(null);
}

@Component({
	selector: 'lu-card-wrapper-grid-test',
	imports: [CardComponent, CardActionDirective, CardWrapperComponent, GridComponent, GridColumnComponent],
	template: `
		<lu-card-wrapper class="custom">
			<lu-grid columns="3">
				<lu-grid-column>
					<lu-card><a href="#" luCardAction>Title</a></lu-card>
				</lu-grid-column>
			</lu-grid>
		</lu-card-wrapper>
		<lu-card-wrapper class="nested">
			<lu-card>
				<a href="#" luCardAction>Title</a>
				<lu-grid columns="2"><span>Content</span></lu-grid>
			</lu-card>
		</lu-card-wrapper>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class WrapperGridHostComponent {}

const heading = (card: Element) => card.querySelector('[role="heading"]');

describe(CardComponent.name, () => {
	describe('outside a lu-card-wrapper', () => {
		let fixture: ComponentFixture<HostComponent>;
		let element: HTMLElement;

		beforeEach(() => {
			TestBed.configureTestingModule({ imports: [HostComponent] });
			fixture = TestBed.createComponent(HostComponent);
			element = fixture.nativeElement as HTMLElement;
			fixture.detectChanges();
		});

		it('should expose the title as a level 3 heading by default', () => {
			// Assert
			const card = element.querySelector('lu-card.numeric')!;
			expect(heading(card)?.getAttribute('aria-level')).toBe('3');
			expect(heading(card)?.textContent?.trim()).toBe('Title');
		});

		it('should apply the headingLevel input, given as a number or as an attribute', () => {
			// Act
			fixture.componentRef.setInput('headingLevel', 2);
			fixture.detectChanges();
			// Assert
			expect(heading(element.querySelector('lu-card.numeric')!)?.getAttribute('aria-level')).toBe('2');
			expect(heading(element.querySelector('lu-card.attribute')!)?.getAttribute('aria-level')).toBe('5');
		});

		it('should not be a listitem', () => {
			// Assert
			expect(element.querySelector('lu-card')!.getAttribute('role')).toBeNull();
		});
	});

	describe('inside a lu-card-wrapper', () => {
		let fixture: ComponentFixture<WrapperHostComponent>;
		let element: HTMLElement;

		beforeEach(() => {
			TestBed.configureTestingModule({ imports: [WrapperHostComponent] });
			fixture = TestBed.createComponent(WrapperHostComponent);
			element = fixture.nativeElement as HTMLElement;
			fixture.detectChanges();
		});

		it('should be a listitem of the wrapper list', () => {
			// Assert
			const card = element.querySelector('lu-card')!;
			expect(card.getAttribute('role')).toBe('listitem');
			expect(card.parentElement?.getAttribute('role')).toBe('list');
		});

		it('should fall back to the card headingLevel when the wrapper sets none', () => {
			// Assert
			expect(heading(element.querySelector('lu-card')!)?.getAttribute('aria-level')).toBe('5');
		});

		it('should use the wrapper headingLevel over the card one', () => {
			// Act
			fixture.componentRef.setInput('wrapperHeadingLevel', 2);
			fixture.detectChanges();
			// Assert
			expect(heading(element.querySelector('lu-card')!)?.getAttribute('aria-level')).toBe('2');
		});
	});

	describe('inside a lu-grid projected in a lu-card-wrapper', () => {
		let element: HTMLElement;

		beforeEach(() => {
			TestBed.configureTestingModule({ imports: [WrapperGridHostComponent] });
			const fixture = TestBed.createComponent(WrapperGridHostComponent);
			element = fixture.nativeElement as HTMLElement;
			fixture.detectChanges();
		});

		it('should mark the wrapper as a custom grid', () => {
			// Assert
			expect(element.querySelector('lu-card-wrapper.custom')!.classList.contains('mod-gridCustom')).toBe(true);
		});

		it('should ignore a lu-grid placed in the content of a card', () => {
			// Assert
			expect(element.querySelector('lu-card-wrapper.nested')!.classList.contains('mod-gridCustom')).toBe(false);
		});

		it('should still be a listitem of the wrapper list', () => {
			// Assert
			const card = element.querySelector('lu-card-wrapper.custom lu-card')!;
			expect(card.getAttribute('role')).toBe('listitem');
			expect(card.closest('[role]:not(lu-card)')?.getAttribute('role')).toBe('list');
		});
	});
});
