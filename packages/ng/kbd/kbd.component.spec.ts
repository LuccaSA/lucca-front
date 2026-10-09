import { ChangeDetectionStrategy, Component, input, LOCALE_ID } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { KbdComponent } from './kbd.component';
import { KbdKey } from './kbd.type';

@Component({
	selector: 'lu-kbd-test',
	imports: [KbdComponent],
	template: `<lu-kbd [keys]="keys()" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	readonly keys = input<KbdKey | readonly KbdKey[]>('Escape');
}

function getKeys(fixture: ComponentFixture<unknown>): string[] {
	return Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('.kbd')).map((key) => key.textContent?.trim() ?? '');
}

describe(KbdComponent.name, () => {
	function render(keys: KbdKey | readonly KbdKey[], locale = 'en'): ComponentFixture<HostComponent> {
		TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: locale }] });
		const fixture = TestBed.createComponent(HostComponent);
		fixture.componentRef.setInput('keys', keys);
		fixture.detectChanges();
		return fixture;
	}

	afterEach(() => vi.restoreAllMocks());

	it('should render a single key in a span wrapper, without nested kbd', () => {
		// Act
		const fixture = render('Escape');

		// Assert
		const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.kbdWrapper');
		expect(wrapper?.tagName).toBe('SPAN');
		expect(wrapper?.querySelectorAll(':scope > kbd.kbd').length).toBe(1);
		expect(getKeys(fixture)).toEqual(['Esc']);
	});

	it('should join the keys of a combination with a plus sign', () => {
		// Act
		const fixture = render(['Control', 'Shift', 'z']);

		// Assert
		expect(getKeys(fixture)).toEqual(['Ctrl', 'Shift', 'Z']);
		const wrapper = (fixture.nativeElement as HTMLElement).querySelector('kbd.kbdWrapper');
		expect(wrapper?.querySelectorAll(':scope > kbd.kbd').length).toBe(3);
		expect(wrapper?.textContent?.replace(/\s/g, '')).toBe('Ctrl+Shift+Z');
	});

	it('should translate the named keys', () => {
		// Act
		const fixture = render(['Control', 'Shift', ' ', 'Delete'], 'fr-FR');

		// Assert
		expect(getKeys(fixture)).toEqual(['Ctrl', 'Maj', 'Espace', 'Suppr']);
		expect((fixture.nativeElement as HTMLElement).querySelector('.kbd.mod-space .pr-u-mask')?.textContent).toBe('Espace');
	});

	it('should display the arrows as icons with a translated alternative', () => {
		// Act
		const fixture = render(['Alt', 'ArrowUp'], 'fr-FR');

		// Assert
		const icon = (fixture.nativeElement as HTMLElement).querySelector('.kbd .lucca-icon');
		expect(icon).not.toBeNull();
		expect(getKeys(fixture)).toEqual(['Alt', 'flèche haut']);
	});

	it('should display Backspace as an icon with a translated alternative', () => {
		// Act
		const fixture = render('Backspace', 'fr-FR');

		// Assert
		expect((fixture.nativeElement as HTMLElement).querySelector('.kbd .lucca-icon.icon-arrowBackspace')).not.toBeNull();
		expect(getKeys(fixture)).toEqual(['Retour arrière']);
	});

	it('should display any other key as is', () => {
		// Act
		const fixture = render(['F2', 'PrintScreen']);

		// Assert
		expect(getKeys(fixture)).toEqual(['F2', 'PrintScreen']);
	});

	it('should display Alt as Option and Meta as Cmd on Mac', () => {
		// Arrange
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');

		// Act
		const fixture = render(['Alt', 'Meta']);

		// Assert
		expect(getKeys(fixture)).toEqual(['Option', 'Cmd']);
	});

	it('should display Home, End and the page keys as Fn and an arrow on Mac', () => {
		// Arrange
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');

		// Act
		const fixture = render(['Alt', 'Home'], 'fr-FR');

		// Assert
		expect(getKeys(fixture)).toEqual(['Fn', 'Option', 'flèche gauche']);
	});

	it('should display Home and the page keys by their name elsewhere', () => {
		// Act
		const fixture = render(['Home', 'PageUp'], 'fr-FR');

		// Assert
		expect(getKeys(fixture)).toEqual(['Début', 'Page préc']);
	});

	it('should apply the pill and skeuo modifiers to the wrapper', () => {
		// Arrange
		TestBed.configureTestingModule({});
		const fixture = TestBed.createComponent(KbdComponent);
		fixture.componentRef.setInput('keys', 'Escape');
		fixture.componentRef.setInput('pill', true);
		fixture.componentRef.setInput('skeuo', '');

		// Act
		fixture.detectChanges();

		// Assert
		const wrapper = (fixture.nativeElement as HTMLElement).querySelector('.kbdWrapper');
		expect(wrapper?.classList.contains('mod-pill')).toBe(true);
		expect(wrapper?.classList.contains('mod-skeuo')).toBe(true);
	});

	it('should display the modifiers first, in the Mac order on Mac', () => {
		// Arrange
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');

		// Act
		const fixture = render(['z', 'Meta', 'Shift', 'Alt', 'Control']);

		// Assert
		expect(getKeys(fixture)).toEqual(['Ctrl', 'Option', 'Shift', 'Cmd', 'Z']);
	});

	it('should display the modifiers first, in the Windows order elsewhere', () => {
		// Arrange
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

		// Act
		const fixture = render(['z', 'Shift', 'Alt', 'Control', 'Meta']);

		// Assert
		expect(getKeys(fixture)).toEqual(['Win', 'Ctrl', 'Alt', 'Shift', 'Z']);
	});

	it('should display Meta as Win elsewhere', () => {
		// Arrange
		vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

		// Act
		const fixture = render(['Meta', 'e']);

		// Assert
		expect(getKeys(fixture)).toEqual(['Win', 'E']);
	});
});
