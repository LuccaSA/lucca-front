import { Component, LOCALE_ID, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LU_LOADING_TRANSLATIONS, luLoadingTranslations } from './loading.translate';

@Component({
	template: `<lu-loading [hiddenLabel]="hiddenLabel()" [intl]="intl()" />`,
	imports: [LoadingComponent],
})
class DefaultLabelHostComponent {
	readonly hiddenLabel = signal<boolean | null>(null);
	readonly intl = signal({});
}

@Component({
	template: `<lu-loading [hiddenLabel]="hiddenLabel()">Fetching users</lu-loading>`,
	imports: [LoadingComponent],
})
class ProjectedLabelHostComponent {
	readonly hiddenLabel = signal<boolean | null>(null);
}

describe(LoadingComponent.name, () => {
	const host = (fixture: ComponentFixture<unknown>) => fixture.nativeElement.querySelector('lu-loading') as HTMLElement;
	const label = (fixture: ComponentFixture<unknown>) => host(fixture).querySelector('.loading-label')?.textContent?.trim();

	describe('without projected content', () => {
		let fixture: ComponentFixture<DefaultLabelHostComponent>;

		beforeEach(() => {
			TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] });
			fixture = TestBed.createComponent(DefaultLabelHostComponent);
			fixture.detectChanges();
		});

		it('renders the translated default label', () => {
			expect(label(fixture)).toBe('Chargement…');
		});

		it('visually hides the default label', () => {
			expect(host(fixture).classList).toContain('mod-hiddenLabel');
		});

		it('displays the default label when hiddenLabel is false', () => {
			fixture.componentInstance.hiddenLabel.set(false);
			fixture.detectChanges();

			expect(host(fixture).classList).not.toContain('mod-hiddenLabel');
			expect(label(fixture)).toBe('Chargement…');
		});

		it('overrides the default label through the intl input', () => {
			fixture.componentInstance.intl.set({ label: 'Récupération des données…' });
			fixture.detectChanges();

			expect(label(fixture)).toBe('Récupération des données…');
		});
	});

	describe('with projected content', () => {
		let fixture: ComponentFixture<ProjectedLabelHostComponent>;

		beforeEach(() => {
			fixture = TestBed.createComponent(ProjectedLabelHostComponent);
			fixture.detectChanges();
		});

		it('renders the projected content instead of the default label', () => {
			expect(label(fixture)).toBe('Fetching users');
		});

		it('keeps the projected content visible', () => {
			expect(host(fixture).classList).not.toContain('mod-hiddenLabel');
		});

		it('visually hides the projected content when hiddenLabel is true', () => {
			fixture.componentInstance.hiddenLabel.set(true);
			fixture.detectChanges();

			expect(host(fixture).classList).toContain('mod-hiddenLabel');
		});
	});

	describe('translations', () => {
		it('falls back to english for an unknown locale', () => {
			TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: 'ja-JP' }] });
			const fixture = TestBed.createComponent(DefaultLabelHostComponent);
			fixture.detectChanges();

			expect(label(fixture)).toBe('Loading…');
		});

		it('uses the translations provided application-wide', () => {
			TestBed.configureTestingModule({
				providers: [
					{ provide: LOCALE_ID, useValue: 'en' },
					{ provide: LU_LOADING_TRANSLATIONS, useValue: { ...luLoadingTranslations, en: { label: 'Please wait…' } } },
				],
			});
			const fixture = TestBed.createComponent(DefaultLabelHostComponent);
			fixture.detectChanges();

			expect(label(fixture)).toBe('Please wait…');
		});
	});
});
