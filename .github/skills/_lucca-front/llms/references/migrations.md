# Migrations Lucca Front

> Codemods exécutables via `ng generate @lucca-front/ng:<nom>`. Ils réécrivent automatiquement le code (templates, SCSS, imports) pour absorber un changement d'API, là où le changelog par composant ne fait que **décrire** le changement.
> Source : `packages/ng/schematics/collection.json`. Liste cumulative.
> Guidance prose (étapes manuelles, contexte) : `./documentation/deprecated/deprecated.md`.

## Catalogue complet (cumulatif)

| Codemod | Commande | Effet | Introduit |
|---------|----------|-------|-----------|
| action-icon | `ng generate @lucca-front/ng:action-icon` | Replace actionIcon usages with button mod-onlyIcon | 17.4 |
| alignment-utilities | `ng generate @lucca-front/ng:alignment-utilities` | Replace alignment utilities tokens. | 21.0.1 |
| cdn-urls | `ng generate @lucca-front/ng:cdn-urls` | Replace cdn urls with their new location | 19.2 |
| class-prefix | `ng generate @lucca-front/ng:class-prefix` | Add pr- prefix to all utility classes | 20.2 |
| color-text | `ng generate @lucca-front/ng:color-text` | Replace color text tokens. | 21.0 |
| component-path | `ng generate @lucca-front/ng:component-path` | Update path component import | 21.0.1 |
| deprecated-resolver | `ng generate @lucca-front/ng:deprecated-resolver` | Migrate deprecated NgModules, types and input output. | 21.3 |
| file-upload | `ng generate @lucca-front/ng:file-upload` | Migrate file upload usages: size default, FileEntry rendering and fileEntryDisplayWrapper | 22.0.3 |
| lu-button | `ng generate @lucca-front/ng:lu-button` | Migrate CSS-only buttons to the new luButton component | 20.1 |
| lu-container | `ng generate @lucca-front/ng:lu-container` | Migrate HTML container to the new lu-container component | 21.1 |
| lu-grid | `ng generate @lucca-front/ng:lu-grid` | Migrate HTML grid to the new lu-grid component | 21.3 |
| lu-icon | `ng generate @lucca-front/ng:lu-icon` | Migrate HTML icons to the new lu-icon component | 20.1 |
| lu-loading | `ng generate @lucca-front/ng:lu-loading` | Migrate HTML loading to the new lu-loading component | 21.1 |
| lu-select | `ng generate @lucca-front/ng:lu-select` | Migrate lu-select into lu-simple-select and lu-multiple-select where possible. | 19.2 |
| lu-text-input | `ng generate @lucca-front/ng:lu-text-input` | Migrate deprecated textfield into lu-text-input where possible. | 21.0 |
| new-icons | `ng generate @lucca-front/ng:new-icons` | Replace old icon names with new ones. | 17.2 |
| palettes | `ng generate @lucca-front/ng:palettes` | Replace palettes with new names. | 17.4 |
| tokens-radius | `ng generate @lucca-front/ng:tokens-radius` | Replace radius tokens with new names. | 20.2 |
| tokens-spacings | `ng generate @lucca-front/ng:tokens-spacings` | Replace spacing tokens with new names. | 17.4 |
| tokens-typo | `ng generate @lucca-front/ng:tokens-typo` | Replace typography tokens with new names. | 20.1 |

