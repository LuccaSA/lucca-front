import { APP_BASE_HREF } from '@angular/common';
import { ApplicationRef, ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router, RouterOutlet, Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { vi } from 'vitest';
import { LinkComponent } from './link.component';

@Component({
	selector: 'lu-link-child',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: 'child',
})
class ChildComponent {}

@Component({
	selector: 'lu-link-host',
	imports: [LinkComponent, RouterOutlet],
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
		<a class="int-merge" [luLink]="['/dashboard']" queryParamsHandling="merge">internal merge</a>
		<a class="int-fragment" [luLink]="['/dashboard']" [preserveFragment]="true">internal fragment</a>
		<button type="button" class="int-button" [luLink]="['/dashboard']">internal button</button>

		<!-- plain href -->
		<a class="plain-href" href="https://example.com/docs">plain href</a>
		<a class="lu-href" luLink href="https://example.com/docs">luLink href</a>

		<!-- modifiers -->
		<a class="disabled-ext" [luLink]="['/goals/team']" [external]="true" [disabled]="true">disabled external</a>
		<a class="disabled-int" [luLink]="['/dashboard']" [disabled]="true">disabled internal</a>
		<a class="decoration" [luLink]="['/dashboard']" [decorationHover]="true">decoration hover</a>
		<a class="hidden-icon" [luLink]="['/goals/team']" [external]="true" [hiddenIcon]="true">hidden icon</a>

		<router-outlet />
	`,
})
class HostComponent {}

@Component({
	selector: 'lu-link-dynamic-host',
	imports: [LinkComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `<a class="dynamic" [luLink]="commands()" [disabled]="disabled()" [external]="external()">dynamic</a>`,
})
class DynamicHostComponent {
	readonly commands = signal(['/dashboard']);
	readonly disabled = signal(false);
	readonly external = signal(false);
}

const routes: Routes = [
	{ path: 'dashboard', component: ChildComponent },
	{ path: 'dynamic/:id', component: DynamicHostComponent },
	{
		path: 'luccafront/reviews/:id',
		children: [{ path: 'review', component: HostComponent, children: [{ path: 'child', component: ChildComponent }] }],
	},
];

function query(harness: RouterTestingHarness, selector: string): HTMLElement {
	return harness.routeNativeElement!.querySelector<HTMLElement>(selector)!;
}

function hrefOf(harness: RouterTestingHarness, selector: string): string | null {
	return query(harness, selector).getAttribute('href');
}

/**
 * Clicks the link and returns the router URL once the click is handled.
 * The browser default action is cancelled so that links left to the browser do not trigger a real network request.
 */
async function click(harness: RouterTestingHarness, selector: string, init: MouseEventInit = {}): Promise<string> {
	const preventBrowserNavigation = (event: Event) => event.preventDefault();
	window.addEventListener('click', preventBrowserNavigation);
	try {
		query(harness, selector).dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, button: 0, ...init }));
		await harness.fixture.whenStable();
		return TestBed.inject(Router).url;
	} finally {
		window.removeEventListener('click', preventBrowserNavigation);
	}
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

	describe('navigation', () => {
		it('keeps the href of every link after navigating to a child route and back', async () => {
			const harness = await setup();
			const selectors = ['.ext-array', '.lu-href', '.int-absolute', '.int-relative', '.disabled-ext'];
			const initialHrefs = selectors.map((selector) => hrefOf(harness, selector));

			await harness.navigateByUrl('/luccafront/reviews/42/review/child');
			harness.detectChanges();
			expect(selectors.map((selector) => hrefOf(harness, selector))).toEqual(initialHrefs);

			await harness.navigateByUrl('/luccafront/reviews/42/review');
			harness.detectChanges();
			expect(selectors.map((selector) => hrefOf(harness, selector))).toEqual(initialHrefs);
		});

		it('follows the query params when queryParamsHandling is merge', async () => {
			const harness = await setup();

			await harness.navigateByUrl('/luccafront/reviews/42/review?tab=a');
			harness.detectChanges();
			expect(hrefOf(harness, '.int-merge')).toBe('/dashboard?tab=a');

			await harness.navigateByUrl('/luccafront/reviews/42/review?tab=b');
			harness.detectChanges();
			expect(hrefOf(harness, '.int-merge')).toBe('/dashboard?tab=b');
		});

		it('follows the fragment when preserveFragment is set', async () => {
			const harness = await setup();

			await harness.navigateByUrl('/luccafront/reviews/42/review#a');
			harness.detectChanges();
			expect(hrefOf(harness, '.int-fragment')).toBe('/dashboard#a');

			await harness.navigateByUrl('/luccafront/reviews/42/review#b');
			harness.detectChanges();
			expect(hrefOf(harness, '.int-fragment')).toBe('/dashboard#b');
		});
	});

	describe('click', () => {
		it('navigates in-app on an internal anchor', async () => {
			const harness = await setup();
			expect(await click(harness, '.int-absolute')).toBe('/dashboard');
		});

		it('navigates in-app on an internal button', async () => {
			const harness = await setup();
			expect(await click(harness, '.int-button')).toBe('/dashboard');
		});

		it('lets the browser handle modifier clicks on an anchor', async () => {
			const harness = await setup();
			expect(await click(harness, '.int-absolute', { ctrlKey: true })).toBe('/luccafront/reviews/42/review');
			expect(await click(harness, '.int-absolute', { metaKey: true })).toBe('/luccafront/reviews/42/review');
			expect(await click(harness, '.int-absolute', { button: 1 })).toBe('/luccafront/reviews/42/review');
		});

		it('does not navigate in-app on a disabled link', async () => {
			const harness = await setup();
			expect(await click(harness, '.disabled-int')).toBe('/luccafront/reviews/42/review');
		});

		it('does not navigate in-app on an external anchor', async () => {
			const harness = await setup();
			expect(await click(harness, '.ext-array')).toBe('/luccafront/reviews/42/review');
		});
	});

	describe('inputs updated after a navigation', () => {
		async function setupDynamic() {
			TestBed.configureTestingModule({ providers: [provideRouter(routes)] });
			const harness = await RouterTestingHarness.create();
			const host = await harness.navigateByUrl('/dynamic/1', DynamicHostComponent);
			// Same route config: the host component is reused, only the router state changes.
			await harness.navigateByUrl('/dynamic/2');
			harness.detectChanges();
			return { harness, host };
		}

		it('updates the href when the commands change', async () => {
			const { harness, host } = await setupDynamic();

			host.commands.set(['/settings']);
			harness.detectChanges();

			expect(hrefOf(harness, '.dynamic')).toBe('/settings');
		});

		it('restores the router href when the link is re-enabled', async () => {
			const { harness, host } = await setupDynamic();

			host.disabled.set(true);
			harness.detectChanges();
			expect(hrefOf(harness, '.dynamic')).toBeNull();

			host.disabled.set(false);
			harness.detectChanges();
			expect(hrefOf(harness, '.dynamic')).toBe('/dashboard');
		});

		it('switches to the external URL and back', async () => {
			const { harness, host } = await setupDynamic();

			host.external.set(true);
			harness.detectChanges();
			expect(hrefOf(harness, '.dynamic')).toBe('/dashboard');
			expect(query(harness, '.dynamic').getAttribute('target')).toBe('_blank');
			expect(await click(harness, '.dynamic')).toBe('/dynamic/2');

			host.external.set(false);
			harness.detectChanges();
			expect(query(harness, '.dynamic').getAttribute('target')).toBeNull();
			expect(await click(harness, '.dynamic')).toBe('/dashboard');
		});
	});
});
