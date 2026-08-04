import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightSectionComponent } from './highlight-section.component';
import { HighlightSectionBubblePosition, HighlightSectionTheme } from './highlight-section.type';

const CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-data';
const ILLUSTRATION_CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section';

@Component({
	selector: 'lu-highlight-section-host',
	imports: [HighlightSectionComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-highlight-section [theme]="theme()" [palette]="palette()" [bubble]="bubble()" [bubblePosition]="bubblePosition()" [illustration]="illustration()">
			<p class="projected">Projected content</p>
		</lu-highlight-section>
	`,
})
class HostComponent {
	readonly theme = signal<HighlightSectionTheme>('white');
	readonly palette = signal<string>('lucca');
	readonly bubble = signal<number | undefined>(undefined);
	readonly bubblePosition = signal<HighlightSectionBubblePosition>('both');
	readonly illustration = signal<string | undefined>(undefined);
}

describe(HighlightSectionComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;
	let host: HostComponent;

	function section(): HTMLElement {
		return fixture.nativeElement.querySelector('lu-highlight-section') as HTMLElement;
	}

	function query<T extends HTMLElement>(selector: string): T | null {
		return fixture.nativeElement.querySelector<T>(selector);
	}

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HostComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(HostComponent);
		host = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should set the base class and the palette class on the host', () => {
		expect(section().classList).toContain('highlightSection');
		expect(section().classList).toContain('palette-lucca');
	});

	it('should update the palette class when the palette changes', () => {
		host.palette.set('timmi');
		fixture.detectChanges();

		expect(section().classList).toContain('palette-timmi');
		expect(section().classList).not.toContain('palette-lucca');
	});

	it.each([
		['white', []],
		['light', ['mod-light']],
		['dark', ['mod-dark']],
	] as const)('should apply the modifier of the %s theme', (theme, expectedClasses) => {
		host.theme.set(theme);
		fixture.detectChanges();

		expect([...section().classList].filter((className) => className.startsWith('mod-'))).toEqual([...expectedClasses]);
	});

	it('should project the content inside the slot', () => {
		expect(query('.highlightSection-content-slot .projected')?.textContent).toBe('Projected content');
	});

	it('should not render the ornaments layer when no bubble is set', () => {
		expect(query('.highlightSection-bubbles')).toBeNull();
	});

	it('should render both ornaments by default', () => {
		host.bubble.set(1);
		fixture.detectChanges();

		expect(query('.highlightSection-bubbles-start')).not.toBeNull();
		expect(query('.highlightSection-bubbles-end')).not.toBeNull();
	});

	it.each([
		['start', true, false],
		['end', false, true],
		['both', true, true],
	] as const)('should render the %s ornament(s)', (bubblePosition, hasStart, hasEnd) => {
		host.bubble.set(1);
		host.bubblePosition.set(bubblePosition);
		fixture.detectChanges();

		expect(!!query('.highlightSection-bubbles-start')).toBe(hasStart);
		expect(!!query('.highlightSection-bubbles-end')).toBe(hasEnd);
	});

	it('should build the ornament URL from the palette, the theme and the bubble number', () => {
		host.palette.set('cleemy');
		host.bubble.set(3);
		fixture.detectChanges();

		expect(query<HTMLImageElement>('.highlightSection-bubbles-end')?.getAttribute('src')).toBe(`${CDN_PATH}/cleemy/bubbles-light-3.svg`);

		host.theme.set('dark');
		fixture.detectChanges();

		expect(query<HTMLImageElement>('.highlightSection-bubbles-end')?.getAttribute('src')).toBe(`${CDN_PATH}/cleemy/bubbles-dark-3.svg`);
	});

	it('should keep light ornaments for the light theme', () => {
		host.theme.set('light');
		host.bubble.set(2);
		fixture.detectChanges();

		expect(query<HTMLImageElement>('.highlightSection-bubbles-end')?.getAttribute('src')).toBe(`${CDN_PATH}/lucca/bubbles-light-2.svg`);
	});

	it('should not render the illustration when it is not set', () => {
		expect(query('.highlightSection-content-illustration')).toBeNull();
	});

	it('should resolve a short illustration name against the CDN', () => {
		host.illustration.set('coffee');
		fixture.detectChanges();

		expect(query<HTMLImageElement>('.highlightSection-content-illustration')?.getAttribute('src')).toBe(`${ILLUSTRATION_CDN_PATH}/coffee.svg`);
	});

	it('should use the illustration as-is when it is an URL', () => {
		host.illustration.set('https://example.com/custom.svg');
		fixture.detectChanges();

		expect(query<HTMLImageElement>('.highlightSection-content-illustration')?.getAttribute('src')).toBe('https://example.com/custom.svg');
	});
});
