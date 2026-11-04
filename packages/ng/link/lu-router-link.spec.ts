import { ChangeDetectionStrategy, Component, isSignal, viewChild, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, RouterLink } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { LuRouterLink } from './lu-router-link';

// `LuRouterLink` relies on internals of Angular's `RouterLink` that are not part of its public API.
// These tests pin that contract: when one fails after an Angular upgrade, read
// https://github.com/angular/angular/blob/main/packages/router/src/directives/router_link.ts
// and adapt `lu-router-link.ts` before looking at `luLink` itself.

type RouterLinkInternals = { reactiveHref: WritableSignal<string | null> };

@Component({
	selector: 'lu-router-link-host',
	imports: [RouterLink, LuRouterLink],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<a class="angular" routerLink="/dashboard">angular</a>
		<a class="lucca" luRouterLink routerLink="/dashboard">lucca</a>
	`,
})
class HostComponent {
	readonly angularLink = viewChild.required(RouterLink);
	readonly luccaLink = viewChild.required(LuRouterLink);
}

describe(LuRouterLink.name, () => {
	async function setup() {
		TestBed.configureTestingModule({
			providers: [provideRouter([{ path: '**', component: HostComponent }])],
		});
		const harness = await RouterTestingHarness.create();
		const host = await harness.navigateByUrl('/', HostComponent);
		harness.detectChanges();
		return { harness, host };
	}

	function hrefOf(harness: RouterTestingHarness, selector: string): string | null {
		return harness.routeNativeElement!.querySelector(selector)!.getAttribute('href');
	}

	describe('Angular RouterLink internal contract', () => {
		it('exposes `reactiveHref` as a writable signal', async () => {
			const { host } = await setup();
			const reactiveHref = (host.angularLink() as unknown as RouterLinkInternals).reactiveHref;

			expect(isSignal(reactiveHref)).toBe(true);
			expect(typeof reactiveHref.set).toBe('function');
		});

		it('binds `attr.href` to `reactiveHref`', async () => {
			const { harness, host } = await setup();

			(host.angularLink() as unknown as RouterLinkInternals).reactiveHref.set('/forced');
			harness.detectChanges();

			expect(hrefOf(harness, '.angular')).toBe('/forced');
		});
	});

	describe('href override', () => {
		it('lets the router compute the href by default', async () => {
			const { harness, host } = await setup();

			expect(host.luccaLink().resolvedHref()).toBe('/dashboard');
			expect(hrefOf(harness, '.lucca')).toBe('/dashboard');
		});

		it('renders the forced href through the inherited host binding', async () => {
			const { harness, host } = await setup();

			host.luccaLink().hrefOverride.set('https://example.com');
			harness.detectChanges();

			expect(hrefOf(harness, '.lucca')).toBe('https://example.com');
		});

		it('removes the href when forced to null', async () => {
			const { harness, host } = await setup();

			host.luccaLink().hrefOverride.set(null);
			harness.detectChanges();

			expect(hrefOf(harness, '.lucca')).toBeNull();
		});

		it('falls back to the router-computed href once the override is cleared', async () => {
			const { harness, host } = await setup();

			host.luccaLink().hrefOverride.set('https://example.com');
			harness.detectChanges();
			host.luccaLink().hrefOverride.set(undefined);
			harness.detectChanges();

			expect(hrefOf(harness, '.lucca')).toBe('/dashboard');
		});

		it('keeps the forced href across navigations', async () => {
			const { harness, host } = await setup();

			host.luccaLink().hrefOverride.set('https://example.com');
			harness.detectChanges();
			await harness.navigateByUrl('/elsewhere');
			harness.detectChanges();

			expect(hrefOf(harness, '.lucca')).toBe('https://example.com');
		});
	});
});
