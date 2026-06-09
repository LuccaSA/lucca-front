# Migrations Lucca Front — jusqu'à v21.0.0

> Codemods exécutables via `ng generate @lucca-front/ng:<nom>`. Ils réécrivent automatiquement le code (templates, SCSS, imports) pour absorber un changement d'API, là où le changelog par composant ne fait que **décrire** le changement.
> Source : `packages/ng/schematics/collection.json` au tag v21.0.0. Liste cumulative.
> Guidance prose (étapes manuelles, contexte) : `./documentation/deprecated/deprecated.md`.

_Catalogue de base de la branche 21.x (pas de diff de prédécesseur)._

## Catalogue complet (cumulatif ≤ v21.0.0)

| Codemod | Commande | Effet | Introduit |
|---------|----------|-------|-----------|
| action-icon | `ng generate @lucca-front/ng:action-icon` | Replace actionIcon usages with button mod-onlyIcon | — |
| cdn-urls | `ng generate @lucca-front/ng:cdn-urls` | Replace cdn urls with their new location | — |
| class-prefix | `ng generate @lucca-front/ng:class-prefix` | Add pr- prefix to all utility classes | — |
| color-text | `ng generate @lucca-front/ng:color-text` | Replace color text tokens. | — |
| lu-button | `ng generate @lucca-front/ng:lu-button` | Migrate CSS-only buttons to the new luButton component | — |
| lu-icon | `ng generate @lucca-front/ng:lu-icon` | Migrate HTML icons to the new lu-icon component | — |
| lu-select | `ng generate @lucca-front/ng:lu-select` | Migrate lu-select into lu-simple-select and lu-multiple-select where possible. | — |
| lu-text-input | `ng generate @lucca-front/ng:lu-text-input` | Migrate deprecated textfield into lu-text-input where possible. | — |
| new-icons | `ng generate @lucca-front/ng:new-icons` | Replace old icon names with new ones. | — |
| palettes | `ng generate @lucca-front/ng:palettes` | Replace palettes with new names. | — |
| tokens-radius | `ng generate @lucca-front/ng:tokens-radius` | Replace radius tokens with new names. | — |
| tokens-spacings | `ng generate @lucca-front/ng:tokens-spacings` | Replace spacing tokens with new names. | — |
| tokens-typo | `ng generate @lucca-front/ng:tokens-typo` | Replace typography tokens with new names. | — |

