# FileUpload — résiduel du schematic `file-upload`

`ng g @lucca-front/ng:file-upload` (Étape 1) couvre trois changements d'un coup. **Ne rien refaire à la main de ce qu'il traite** ; cette référence sert à reprendre ce qu'il signale en warning.

## Ce que le schematic applique

1. **Taille** : `S` est devenue la taille par défaut de `lu-single-file-upload`, `lu-multi-file-upload` et `lu-file-entry`, et `L` a été introduite pour retrouver l'ancien rendu. Le schematic ajoute `size="L"` là où aucune taille n'était précisée et supprime les `size="S"` devenus redondants.
2. **Rendu du `FileEntry`** : `lu-single-file-upload` n'affiche plus l'entry qu'on lui passe. Le schematic restructure l'usage en `@if` / `@else`, répartit les inputs entre les deux composants et ajoute les imports nécessaires :

```html
<!-- Avant -->
<lu-single-file-upload [entry]="file" [state]="state" (deleteFile)="delete()" [accept]="accept" />

<!-- Après -->
@if (file; as fileEntry) {
  <lu-file-entry-wrapper>
    <lu-file-entry [entry]="fileEntry" size="L" media [state]="state" (deleteFile)="delete()" />
  </lu-file-entry-wrapper>
} @else {
  <lu-single-file-upload size="L" [accept]="accept" />
}
```

3. **`.fileEntryDisplayWrapper`** : la classe est remplacée par le composant `lu-file-entry-wrapper`.

## Ce qu'il laisse

- **Ses warnings** : `[size]` lié à une expression, `[entry]` sur un élément portant une directive structurelle, `.fileEntryDisplayWrapper` appliquée via un binding. Chaque warning porte le chemin du fichier. Les reprendre au cas par cas — pour la taille, `'S'` devient `null` (défaut) et `null` devient `'L'`.
- **Usages HTML/CSS purs** : `.fileUpload.mod-S`, `.fileEntry.mod-S` et `.fileToolbar.mod-S` n'existent plus. Un élément qui portait `mod-S` perd simplement la classe ; un élément sans `mod-S` doit recevoir `mod-L` pour garder son rendu.

## Deux écarts à l'iso-rendu, assumés

- Le `@if` / `@else` **retire** la zone d'upload du DOM là où le composant la masquait seulement (`is-hidden`) : le focus et l'état du champ ne se comportent plus tout à fait pareil.
- La conversion de `.fileEntryDisplayWrapper` s'applique à **tous** les éléments portant la classe, y compris ceux sans rapport avec un file upload. La classe CSS continuerait de fonctionner telle quelle ; c'est une adoption, pas une réparation.
