import { APP_BASE_HREF } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { LinkComponent } from './link.component';

@Component({
	selector: 'lu-link-host',
	imports: [LinkComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<!-- external links -->
		<a class="ext-relative" [luLink]="['../abc']" [external]="true">relative external</a>
		<a class="ext-string" [luLink]="'/goals/team'" [external]="true">absolute string external</a>
		<a class="ext-array" [luLink]="['/goals/team']" [external]="true">absolute array external</a>
		<button type="button" class="ext-button" [luLink]="['/goals/team']" [external]="true">button external</button>
		<button type="button" class="ext-button-disabled" [luLink]="['/goals/team']" [external]="true" [disabled]="true">button external disabled</button>

		<!-- internal links -->
		<a class="int-absolute" [luLink]="['/dashboard']">internal absolute</a>
		<a class="int-relative" [luLink]="['../settings']">internal relative</a>

		<!-- plain href -->
		<a class="plain-href" href="https://example.com/docs">plain href</a>

		<!-- modifiers -->
		<a class="disabled-ext" [luLink]="['/goals/team']" [external]="true" [disabled]="true">disabled external</a>
		<a class="disabled-int" [luLink]="['/dashboard']" [disabled]="true">disabled internal</a>
		<a class="decoration" [luLink]="['/dashboard']" [decorationHover]="true">decoration hover</a>
		<a class="hidden-icon" [luLink]="['/goals/team']" [external]="true" [hiddenIcon]="true">hidden icon</a>
	`,
})
class HostComponent {}

const routes: Routes = [
	{
		path: 'luccafront/reviews/:id',
		children: [{ path: 'review', component: HostComponent }],
	},
];

function query(harness: RouterTestingHarness, selector: string): HTMLElement {
	return harness.routeNativeElement!.querySelector<HTMLElement>(selector)!;
}

function hrefOf(harness: RouterTestingHarness, selector: string): string | null {
	return query(harness, selector).getAttribute('href');
}

describe(LinkComponent.name, () => {
	async function setup(baseHref?: string) {
		TestBed.configureTestingModule({
			providers: [provideRouter(routes), ...(baseHref !== undefined ? [{ provide: APP_BASE_HREF, useValue: baseHref }] : [])],
		});
		const harness = await RouterTestingHarness.create();
		await harness.navigateByUrl('/luccafront/reviews/42/review', HostComponent);
		harness.detectChanges();
		return harness;
	}

	describe('external URL resolution', () => {
		it('resolves relative commands against the current route', async () => {
			const harness = await setup();
			// From /luccafront/reviews/42/review, `['../abc']` must resolve relative to the current route,
			// like a plain routerLink would — not from the root.
			expect(hrefOf(harness, '.ext-relative')).toBe('/luccafront/reviews/42/abc');
		});

		it('applies the baseHref to string commands', async () => {
			const harness = await setup('/luccafront');
			expect(hrefOf(harness, '.ext-string')).toBe('/luccafront/goals/team');
		});

		it('applies the baseHref to array commands (kept working)', async () => {
			const harness = await setup('/luccafront');
			expect(hrefOf(harness, '.ext-array')).toBe('/luccafront/goals/team');
		});

		it('serializes without baseHref when none is configured', async () => {
			const harness = await setup();
			expect(hrefOf(harness, '.ext-string')).toBe('/goals/team');
		});
	});

	describe('external link host bindings', () => {
		it('opens external anchors in a new tab with a safe rel', async () => {
			const harness = await setup();
			const anchor = query(harness, '.ext-array');
			expect(anchor.getAttribute('target')).toBe('_blank');
			expect(anchor.getAttribute('rel')).toBe('noopener noreferrer');
		});

		it('marks external links with the icon modifier class', async () => {
			const harness = await setup();
			expect(query(harness, '.ext-array').classList).toContain('mod-icon');
			expect(query(harness, '.int-absolute').classList).not.toContain('mod-icon');
		});

		it('applies the base link class to every link', async () => {
			const harness = await setup();
			expect(query(harness, '.int-absolute').classList).toContain('link');
		});

		it('hides the external icon when hiddenIcon is set', async () => {
			const harness = await setup();
			expect(query(harness, '.hidden-icon').classList).toContain('mod-hiddenIcon');
			expect(query(harness, '.ext-array').classList).not.toContain('mod-hiddenIcon');
		});

		it('underlines only on hover when decorationHover is set', async () => {
			const harness = await setup();
			expect(query(harness, '.decoration').classList).toContain('mod-decorationHover');
		});
	});

	describe('internal (non-external) links', () => {
		it('resolves absolute commands through the router without opening a new tab', async () => {
			const harness = await setup();
			const anchor = query(harness, '.int-absolute');
			expect(anchor.getAttribute('href')).toBe('/dashboard');
			expect(anchor.getAttribute('target')).toBeNull();
			expect(anchor.getAttribute('rel')).toBeNull();
		});

		it('resolves relative commands against the current route', async () => {
			const harness = await setup();
			expect(hrefOf(harness, '.int-relative')).toBe('/luccafront/reviews/42/settings');
		});
	});

	describe('plain href', () => {
		it('renders a raw href untouched', async () => {
			const harness = await setup();
			expect(hrefOf(harness, '.plain-href')).toBe('https://example.com/docs');
		});
	});

	describe('disabled state', () => {
		it('clears the href and marks the anchor as presentational', async () => {
			const harness = await setup();
			const anchor = query(harness, '.disabled-ext');
			expect(anchor.getAttribute('href')).toBeNull();
			expect(anchor.getAttribute('role')).toBe('presentation');
			expect(anchor.classList).toContain('is-disabled');
		});

		it('drops target/rel so a disabled external link cannot navigate', async () => {
			const harness = await setup();
			const anchor = query(harness, '.disabled-ext');
			expect(anchor.getAttribute('target')).toBeNull();
			expect(anchor.getAttribute('rel')).toBeNull();
		});

		it('clears the href of a disabled internal link', async () => {
			const harness = await setup();
			expect(hrefOf(harness, '.disabled-int')).toBeNull();
		});
	});

	describe('button[luLink] external navigation', () => {
		it('opens the serialized external URL in a new tab on click', async () => {
			const harness = await setup('/luccafront');
			const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
			try {
				query(harness, '.ext-button').click();
				// `redirect()` defers the `window.open` to `afterNextRender`, so flush the render hooks.
				TestBed.inject(ApplicationRef).tick();
				expect(openSpy).toHaveBeenCalledWith('/luccafront/goals/team', '_blank');
			} finally {
				openSpy.mockRestore();
			}
		});

		it('does not open a window when the button is disabled', async () => {
			const harness = await setup('/luccafront');
			const openSpy = vi.spyOn(window, 'open').mockReturnValue(null);
			try {
				query(harness, '.ext-button-disabled').click();
				TestBed.inject(ApplicationRef).tick();
				expect(openSpy).not.toHaveBeenCalled();
			} finally {
				openSpy.mockRestore();
			}
		});
	});
});
