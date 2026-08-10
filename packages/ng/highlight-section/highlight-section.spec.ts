import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightSectionComponent } from './highlight-section.component';
import { HighlightSectionTheme } from './highlight-section.type';

const ILLUSTRATION_CDN_PATH = 'https://cdn.lucca.fr/transverse/prisme/visuals/highlight-section';

@Component({
	selector: 'lu-highlight-section-host',
	imports: [HighlightSectionComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<lu-highlight-section [theme]="theme()" [palette]="palette()" [bubbleStart]="bubbleStart()" [bubbleEnd]="bubbleEnd()" [illustration]="illustration()">
			<p class="projected">Projected content</p>
		</lu-highlight-section>
	`,
})
class HostComponent {
	readonly theme = signal<HighlightSectionTheme>('white');
	readonly palette = signal<string>('lucca');
	readonly bubbleStart = signal<number | undefined>(undefined);
	readonly bubbleEnd = signal<number | undefined>(undefined);
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
		expect(query('.highlightSection-bubbleStart')).toBeNull();
		expect(query('.highlightSection-bubbleEnd')).toBeNull();
	});

	it('should not display any decorations by default', () => {
		fixture.detectChanges();

		expect(query('.highlightSection-bubbleStart')).toBeNull();
		expect(query('.highlightSection-bubbleEnd')).toBeNull();
	});

	it('should render start ornament', () => {
		host.bubbleStart.set(1);

		fixture.detectChanges();

		expect(query('.highlightSection-bubbleStart')).not.toBeNull();
		expect(query('.highlightSection-bubbleEnd')).toBeNull();
	});

	it('should render end ornament', () => {
		host.bubbleEnd.set(2);

		fixture.detectChanges();

		expect(query('.highlightSection-bubbleStart')).toBeNull();
		expect(query('.highlightSection-bubbleEnd')).not.toBeNull();
	});

	it('should render both ornaments', () => {
		host.bubbleStart.set(1);
		host.bubbleEnd.set(2);

		fixture.detectChanges();

		expect(query('.highlightSection-bubbleStart')).not.toBeNull();
		expect(query('.highlightSection-bubbleEnd')).not.toBeNull();
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
