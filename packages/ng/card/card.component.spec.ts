import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
	selector: 'lu-card-illustration-test',
	imports: [CardComponent, CardActionDirective],
	template: `
		<lu-card class="none"><a href="#" luCardAction>Title</a></lu-card>
		<lu-card class="bubble" bubbleIcon="app">
			<span cardHeaderStartSlot class="custom">Custom</span>
			<a href="#" luCardAction>Title</a>
		</lu-card>
		<lu-card class="slot">
			<span cardHeaderStartSlot class="custom">Custom</span>
			<a href="#" luCardAction>Title</a>
		</lu-card>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class IllustrationHostComponent {}

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

	describe('illustration', () => {
		let element: HTMLElement;

		const illustration = (selector: string) => element.querySelector(`lu-card.${selector} .card2-illustration`)!;

		beforeEach(() => {
			TestBed.configureTestingModule({ imports: [IllustrationHostComponent] });
			const fixture = TestBed.createComponent(IllustrationHostComponent);
			element = fixture.nativeElement as HTMLElement;
			fixture.detectChanges();
		});

		it('should leave the illustration empty without bubbleIcon nor projected content', () => {
			// Assert
			expect(illustration('none').children).toHaveLength(0);
			expect(illustration('none').textContent?.trim()).toBe('');
		});

		it('should display a decorative bubble icon from bubbleIcon, instead of the projected content', () => {
			// Assert
			const bubble = illustration('bubble').querySelector('lu-bubble-icon');
			expect(bubble).not.toBeNull();
			expect(bubble?.querySelector('.lucca-icon')?.classList.contains('icon-app')).toBe(true);
			expect(illustration('bubble').querySelector('.custom')).toBeNull();
		});

		it('should project the cardHeaderStartSlot content without bubbleIcon', () => {
			// Assert
			expect(illustration('slot').querySelector('.custom')).not.toBeNull();
			expect(illustration('slot').querySelector('lu-bubble-icon')).toBeNull();
		});
	});
});
