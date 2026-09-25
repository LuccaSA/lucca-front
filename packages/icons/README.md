# lucca-front / icons

## How to update the legacy icon font

- Update font files in `font/` folder
- Update the `selection.json` file with the new one from icomoon
- Run `npm run icons:update`
- You're done, just need to commit the changes now!

`npm run icons:update` also regenerates `packages/prisme/icon/icons.ts` and `stories/documentation/icons-list.ts` (see below) as part of the same command — no separate step needed.

For more details, see https://www.notion.so/Mise-jour-de-la-font-fc4a671131db45319bb3c6b80650c846 (:flag_fr:)

## How to update the SVG icon list (`LuccaIcon` type)

The list of available icons (`packages/prisme/icon/icons.ts`, `stories/documentation/icons-list.ts`) is generated from the icon SVGs committed to the private [`cdn.lucca.fr`](https://github.com/LuccaSA/cdn.lucca.fr) repo, not from this package's font files.

- Run `npm run icons:update:sprite`
- It clones `cdn.lucca.fr` (uses your existing GitHub access to the LuccaSA org — no separate token or setup needed) and regenerates the two files above
- Commit the changes
