# Bumping Lucca Front during the migration

## A GitHub release is not an npm release

The Lucca Front publish job runs `npm stage publish` for stable tags (RC tags publish directly under
the `rc` dist-tag). A stable version sits staged until a maintainer promotes it. Before touching
`package.json`:

```
curl -s https://registry.npmjs.org/@lucca-front%2fng | jq '.versions | has("22.0.4"), .["dist-tags"].latest'
```

The release page and a green publish run prove nothing; poll the registry or ask the DS team.

## Lockstep peers

`@lucca-front/ng`, `@lucca-front/scss`, `@lucca-front/icons`, `@lucca/prisme` (auto-installed
peer) and `@lucca/stylelint-config-prisme` (devDependency) pin each other exactly. Bumping one at a
time, `npm install` after editing the manifest, or `npm update` of the five all die in ERESOLVE
because the lock keeps the siblings at the old version. What works:

1. Set the new range on the four manifest entries (`~22.0.4`).
2. Delete the five `node_modules/@lucca-front/*`, `node_modules/@lucca/prisme`,
   `node_modules/@lucca/stylelint-config-prisme` keys from `package-lock.json` (`packages`).
3. Plain `npm install`; the lock diff stays at the five version lines.

Never `--force` or `--legacy-peer-deps` for a real bump: `--legacy-peer-deps` drops auto-installed
peers (prisme) and the build breaks later. A pre-release cannot install at all when sibling packages
(`@lucca/pagga-components`, `@lucca/workflow`, `@lucca/ngx-sitemap`) declare `^22.0.0` peers, which a
`-rc` does not satisfy; test an RC with `--force` locally only, then `npm ci` back.

## API moves to expect

- 21 → 22: `options`, `loading`, `optionComparer`, `optionKey` on `ALuSelectInputComponent` are
  signals (`select.options.set(...)`); `totalCount$` abstract on `ALuCoreSelectApiDirective`.
- 22.0.4: `totalCount$` optional; subclasses that provide it need `override` (with
  `noImplicitOverride`), the `= NEVER` stubs are deleted. `SelectDataSource.paramsChange` is finally
  consumed, so a panel-header toggle refetches without a restart helper.
- After the bump, restart `ng serve` (Vite keeps the old deps), `npx ng build` to a log, re-read the
  shame stylesheet for "remove with version X" rules to drop.

## Workarounds discipline

One shame stylesheet for CSS, one `shared/components/select/` helper for behaviour, each with the
DS issue in the commit (never the issue number in the code) and the version that removes it. When a
workaround masks a DS bug, add a canary spec pinned on the installed version
(`expect(version).toBe('22.0.2')`) so the next bump forces the review. Keep a `git format-patch` of
the removal ready if the fix is already on the DS master.

## Verified in

`lucca-front-ng-core-select-api.mjs` 22.0.4: `...(totalCount$ ? { getTotalCount: () => totalCount$ } : {})`, so an absent `totalCount$` is handled. Publish mode: `Publish npm packages` workflow on `LuccaSA/lucca-front`, run for `v22.0.4` (2026-09-21), step `Resolve publish mode from tag` prints `Publish mode: staged`. Peer conflict and lock procedure measured on Pagga.Remuneration front, npm 11, 22.0.2 → 22.0.4.
