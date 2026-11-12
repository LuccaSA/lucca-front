import { ChangeDetectionStrategy, Component, LOCALE_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { FavoriteComponent } from './favorite.component';
import { LuFavoriteTranslations } from './favorite.translate';

@Component({
	selector: 'lu-favorite-test',
	imports: [FavoriteComponent],
	template: `<lu-favorite [(favorite)]="favorite" [disabled]="disabled()" [intl]="intl()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly favorite = signal(false);
	readonly disabled = signal(false);
	readonly intl = signal<Partial<LuFavoriteTranslations>>({});
}

@Component({
	selector: 'lu-favorite-attribute-test',
	imports: [FavoriteComponent],
	template: `<lu-favorite favorite (favoriteChange)="changes.push($event)" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class AttributeHostComponent {
	readonly changes: boolean[] = [];
}

@Component({
	selector: 'lu-favorite-disabled-test',
	imports: [FavoriteComponent],
	template: `<div (click)="clicks.push('parent')">
		<lu-favorite disabled (click)="clicks.push('host')" (favoriteChange)="changes.push($event)" />
	</div>`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class DisabledHostComponent {
	readonly changes: boolean[] = [];
	readonly clicks: string[] = [];
}

describe(FavoriteComponent.name, () => {
	function render(locale = 'en'): ComponentFixture<HostComponent> {
		TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: locale }] });
		const fixture = TestBed.createComponent(HostComponent);
		fixture.detectChanges();
		return fixture;
	}

	function getButton(fixture: ComponentFixture<HostComponent>): HTMLButtonElement {
		return (fixture.nativeElement as HTMLElement).querySelector('button')!;
	}

	function getName(fixture: ComponentFixture<HostComponent>): string {
		return getButton(fixture).querySelector('.pr-u-mask')?.textContent?.trim() ?? '';
	}

	function getIcon(fixture: ComponentFixture<HostComponent>): string {
		return (fixture.nativeElement as HTMLElement).querySelector('.lucca-icon')?.className ?? '';
	}

	it('should render a toggle button with a fixed accessible name', () => {
		// Act
		const fixture = render();

		// Assert
		const button = getButton(fixture);
		expect(getName(fixture)).toBe('Favorite');
		expect(button.getAttribute('aria-label')).toBeNull();
		expect(button.getAttribute('aria-pressed')).toBe('false');
		expect(button.getAttribute('aria-disabled')).toBeNull();
		expect(getIcon(fixture)).toContain('icon-star');
		expect(getIcon(fixture)).not.toContain('icon-starFilled');
	});

	it('should toggle the favorite state on click and keep the accessible name', () => {
		// Arrange
		const fixture = render();

		// Act
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert
		expect(fixture.componentInstance.favorite()).toBe(true);
		const button = getButton(fixture);
		expect(button.getAttribute('aria-pressed')).toBe('true');
		expect(getName(fixture)).toBe('Favorite');
		expect(getIcon(fixture)).toContain('icon-starFilled');

		// Act
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert
		expect(fixture.componentInstance.favorite()).toBe(false);
		expect(getButton(fixture).getAttribute('aria-pressed')).toBe('false');
	});

	it('should close the tooltip on toggle with its previous label, but keep it when disabled', () => {
		// Arrange
		const fixture = render();
		const tooltip = fixture.debugElement.query(By.directive(LuTooltipTriggerDirective)).injector.get(LuTooltipTriggerDirective);
		const requestClose = vi.spyOn(tooltip, 'requestClose');

		// Act
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert: the closing tooltip keeps its label
		expect(requestClose).toHaveBeenCalledOnce();
		expect(tooltip.tooltipContent()).toBe('Add to favorites');

		// Act: next hover
		getButton(fixture).dispatchEvent(new MouseEvent('mouseenter'));
		fixture.detectChanges();

		// Assert
		expect(tooltip.tooltipContent()).toBe('Remove from favorites');

		// Act
		fixture.componentInstance.disabled.set(true);
		fixture.detectChanges();
		getButton(fixture).click();

		// Assert
		expect(requestClose).toHaveBeenCalledOnce();
	});

	it('should release the tooltip label once the close delay is over, in case hovering the tooltip cancelled the closing', () => {
		// Arrange
		vi.useFakeTimers();
		const fixture = render();
		const tooltip = fixture.debugElement.query(By.directive(LuTooltipTriggerDirective)).injector.get(LuTooltipTriggerDirective);

		// Act
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert: frozen while closing
		expect(tooltip.tooltipContent()).toBe('Add to favorites');

		// Act: the close delay is over, without any new hover of the button
		vi.advanceTimersByTime(tooltip.tooltipLeaveDelay());
		fixture.detectChanges();

		// Assert
		expect(tooltip.tooltipContent()).toBe('Remove from favorites');
		vi.useRealTimers();
	});

	it('should not toggle when disabled, while keeping the button focusable', () => {
		// Arrange
		const fixture = render();
		fixture.componentInstance.disabled.set(true);
		fixture.detectChanges();

		// Act
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert
		const button = getButton(fixture);
		expect(fixture.componentInstance.favorite()).toBe(false);
		expect(button.getAttribute('aria-disabled')).toBe('true');
		expect(button.disabled).toBe(false);
	});

	it('should animate only when adding, until the sparks end or are cancelled', () => {
		// Arrange
		const fixture = render();
		const host = (fixture.nativeElement as HTMLElement).querySelector('lu-favorite')!;
		const animationEvent = (type: string, animationName: string) => Object.assign(new Event(type, { bubbles: true }), { animationName });

		// Act
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert
		expect(host.classList).toContain('is-animated');

		// Act: the bounce of the star ends first, the sparks keep going
		host.querySelector('.lucca-icon')!.dispatchEvent(animationEvent('animationend', 'favoriteAdd'));
		fixture.detectChanges();

		// Assert
		expect(host.classList).toContain('is-animated');

		// Act: the favorite gets hidden, which cancels the sparks
		host.dispatchEvent(animationEvent('animationcancel', 'favoriteSparks'));
		fixture.detectChanges();

		// Assert
		expect(host.classList).not.toContain('is-animated');

		// Act: removing from the favorites does not animate
		getButton(fixture).click();
		fixture.detectChanges();

		// Assert
		expect(host.classList).not.toContain('is-animated');
	});

	it('should neither emit nor let the click bubble when disabled, like a native disabled button', () => {
		// Arrange
		const fixture = TestBed.createComponent(DisabledHostComponent);
		fixture.detectChanges();
		const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;

		// Act
		const notCanceled = button.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));

		// Assert
		expect(notCanceled).toBe(false);
		expect(fixture.componentInstance.changes).toEqual([]);
		expect(fixture.componentInstance.clicks).toEqual([]);
	});

	it('should translate the accessible name and allow overriding it', () => {
		// Arrange
		const fixture = render('fr-FR');

		// Assert
		expect(getName(fixture)).toBe('Favori');

		// Act
		fixture.componentInstance.intl.set({ label: 'Chef de projet en favori' });
		fixture.detectChanges();

		// Assert
		expect(getName(fixture)).toBe('Chef de projet en favori');
	});

	it('should accept a bare favorite attribute and emit the new state on click', () => {
		// Arrange
		const fixture = TestBed.createComponent(AttributeHostComponent);
		fixture.detectChanges();
		const button = (fixture.nativeElement as HTMLElement).querySelector('button')!;
		expect(button.getAttribute('aria-pressed')).toBe('true');

		// Act
		button.click();
		fixture.detectChanges();

		// Assert
		expect(button.getAttribute('aria-pressed')).toBe('false');
		expect(fixture.componentInstance.changes).toEqual([false]);
	});
});
