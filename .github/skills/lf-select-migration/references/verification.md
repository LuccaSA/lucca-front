# Verification: payload diff, console errors, screenshots

A select migration is verified by what leaves the browser, not by what the screen shows. One
browser session for the whole pass (`playwright-cli open` once, `goto` between screens), one
`run-code` script per screen, results written to a log you read.

## Before anything: is the app serving your code?

Dev server redirected to a file (`npx ng serve --no-ssl > <scratch>/ngserve.log 2>&1`), then grep
`Application bundle generation complete` / `failed`. A server behind a proxy renders raw i18n keys
for `@lucca/translate` apps: fine for payload checks, wrong for e2e (see e2e-locators.md).

## Script skeleton

```js
async (page) => {
  const out = [];
  const errors = [];
  const requests = [];
  page.on('console', (m) => { if (m.type() === 'error' && !/404|Failed to load resource|Amplitude/.test(m.text())) errors.push(m.text().slice(0, 160)); });
  page.on('pageerror', (e) => errors.push('PAGEERROR ' + String(e).slice(0, 160)));
  page.on('request', (r) => {
    if (/\/api\/.*(matrix|report|employees)/.test(r.url())) {
      requests.push({ method: r.method(), url: decodeURIComponent(r.url().replace(/^https?:\/\/[^/]+/, '')), body: r.postData() ?? null });
    }
  });

  await page.goto(BASE + '/app/screen', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(5000);
  const select = page.locator('lu-multi-select[departments]').first();
  await select.click();
  await page.waitForSelector('.lu-select-panel-layout');
  await page.locator('.lu-select-panel-layout lu-listbox-option').nth(1).click();
  await page.keyboard.press('Escape');
  requests.length = 0;
  await page.getByRole('button', { name: /Afficher/ }).click();
  await page.waitForTimeout(4000);
  requests.forEach((r) => out.push('request=' + JSON.stringify(r)));
  out.push('control=' + (await page.evaluate(() => JSON.stringify(window.ng.getComponent(document.querySelector('prem-my-screen')).departmentCtrl.value))));
  await page.screenshot({ path: PROOFS + TAG + '-screen.png' });
  out.push('errors=' + JSON.stringify(errors));
  return out.join('\n');
}
```

`window.ng.getComponent` / `getDirectives` (dev mode) read the live control and directive state:
useful to assert the `LuMultiSelection` mode or a directive's `params`.

## Payload diff routine

1. Run the script on `main` (or the deployed app) for: several items, one exclusion after select
   all, the empty selection. Save the `request=` lines: one per call, with method, full URL and
   body, never truncated.
2. Run the same script on the branch. `diff` the request lines: method, query string and body
   must all match (a POST/PUT body may switch from ids to objects behind an identical URL). Ids
   order may differ when the source list is sorted differently; compare as sets only if the back
   is order-insensitive (read the back).
3. Paste both lines in the PR attention point of that screen.

## Errors are part of green

Print `errors` in every script and grep the dev-server log after the pass:

```
grep -c "Maximum call stack\|ERROR" <scratch>/ngserve.log
```

A store ↔ control recursion (value-shapes.md) unwinds before the screenshot: the UI and the payload
are right, only the console knows. It shipped once because the script had no listener.

## Screenshots for the PR

Resize to 1920×1080 before capturing, one capture with the panel open per migrated screen, before
(`main`) and after. Attach with `gh pr edit <n> --body-file body.md --attach ./before.png --attach
./after.png` (gh ≥ 2.99): local `![…](./before.png)` references in the body are rewritten to the
uploaded URLs. One `<details><summary>Screen</summary>` table per screen keeps the description
readable.
