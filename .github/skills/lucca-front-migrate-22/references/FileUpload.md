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

Avant la 22, seule la valeur `S` existait pour l'input `size` ; sans `size` précisé, le rendu était grand (aucune valeur `L` n'existait pour le désigner explicitement). En 22, l'ancienne `S` devient la taille par défaut — plus besoin de la préciser — et `L` est une nouvelle valeur introduite pour retrouver l'ancien rendu par défaut.

```html
<!-- Avant -->
<lu-single-file-upload size="S" />
<lu-single-file-upload />          <!-- ancien défaut = grand, pas de valeur "L" pour le désigner -->

<!-- Après -->
<lu-single-file-upload />          <!-- size="S" supprimé : c'est le nouveau défaut -->
<lu-single-file-upload size="L" /> <!-- pour retrouver l'ancien rendu (nouvelle valeur) -->
```

**Appliquer systématiquement** :
- chaque `lu-single-file-upload`/`lu-multi-file-upload` **sans** `size` explicite doit recevoir `size="L"`, sous peine de changer silencieusement le rendu de l'UI (passage au nouveau défaut petit) ;
- chaque `lu-single-file-upload`/`lu-multi-file-upload` avec `size="S"` explicite doit voir cet attribut **supprimé**, puisque `S` est désormais la valeur par défaut (attribut redondant).

Ne pas laisser ces décisions à l'utilisateur — les appliquer systématiquement sur chaque occurrence détectée.
