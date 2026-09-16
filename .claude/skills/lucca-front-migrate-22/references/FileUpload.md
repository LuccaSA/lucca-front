# FileUpload — SingleFileUpload & taille

## 1. SingleFileUpload — gestion de `FileEntry` déléguée

Le composant `lu-single-file-upload` ne prend plus l'input `[entry]`. On rend la main sur la gestion de `FileEntry`, pour offrir la même souplesse que `MultipleFileUpload` : c'est au parent d'afficher `lu-file-entry` quand un fichier est présent.

```html
<!-- Avant -->
<lu-single-file-upload [entry]="fileUpload" />

<!-- Après -->
@if (fileUpload) {
  <lu-file-entry [entry]="fileUpload" />
} @else {
  <lu-single-file-upload />
}
```

Non automatisable proprement : la variable conditionnelle (`fileUpload` ci-dessus) dépend du code du consommateur. Restructurer le template au cas par cas.

## 2. Taille — couverte par le schematic

`S` est devenue la taille par défaut de `lu-single-file-upload`, `lu-multi-file-upload` et `lu-file-entry`, et la valeur `L` a été introduite pour retrouver l'ancien rendu par défaut. `ng g @lucca-front/ng:file-upload-size` (Étape 1) applique cette bascule : ajout de `size="L"` là où aucune taille n'était précisée, suppression des `size="S"` devenus redondants. **Ne pas le refaire à la main.**

Deux cas que le schematic ne traite pas, à relever dans le rapport final :

- **`[size]` lié à une expression** (`[size]="isCompact ? 'S' : null"`) : le schematic l'affiche en warning dans sa sortie et laisse le code inchangé. Reprendre l'expression au cas par cas — `'S'` devient `null` (défaut) et `null` devient `'L'`.
- **Usages HTML/CSS purs** : `.fileUpload.mod-S`, `.fileEntry.mod-S` et `.fileToolbar.mod-S` n'existent plus. Un élément qui portait `mod-S` perd simplement la classe ; un élément sans `mod-S` doit recevoir `mod-L` pour garder son rendu.
