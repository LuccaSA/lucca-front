# FileUpload — SingleFileUpload & taille par défaut

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

## 2. Taille par défaut

La taille par défaut de `lu-single-file-upload` **et** `lu-multi-file-upload` est désormais la **plus petite** (auparavant l'équivalent de `L`).

```html
<!-- Avant -->
<lu-single-file-upload size="S" />
<lu-single-file-upload />          <!-- ancien défaut = grand -->

<!-- Après -->
<lu-single-file-upload />          <!-- nouveau défaut = petit -->
<lu-single-file-upload size="L" /> <!-- pour retrouver l'ancien rendu -->
```

**Décision humaine requise** : chaque `lu-single-file-upload`/`lu-multi-file-upload` **sans** `size` explicite change de rendu. Deux options selon l'intention :
- conserver le rendu actuel → ajouter `size="L"` ;
- adopter le nouveau défaut → ne rien faire.

Signaler chaque occurrence sans `size` plutôt que de trancher automatiquement.
