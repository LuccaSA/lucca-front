# FileUpload — résiduel du schematic `file-upload`

`ng g @lucca-front/ng:file-upload` (Étape 1) migre la taille, le rendu du `FileEntry` et la classe `.fileEntryDisplayWrapper`. **Ne rien refaire à la main de ce qu'il a traité.** Cette référence ne couvre que ce qu'il laisse.

## 1. Reprendre ses warnings

Le schematic laisse le code inchangé et signale en warning, avec le chemin du fichier, les cas qu'il ne sait pas migrer : `[size]` lié à une expression, `[entry]` sur un élément portant une directive structurelle, `.fileEntryDisplayWrapper` appliquée via un binding.

**Taille** : `S` est devenue la valeur par défaut et `L` a été introduite pour retrouver l'ancien rendu. Dans une expression, `'S'` devient donc `null` et `null` devient `'L'`.

**`[entry]`** : `lu-single-file-upload` n'affiche plus l'entry qu'on lui passe. Reproduire la forme cible à la main, en répartissant les inputs entre les deux composants — `entry`, `state`, `previewUrl`, `inlineMessageError`, `displayFileName` et `deleteFile` vont sur le `lu-file-entry`, le reste demeure sur l'upload, et `structure` va sur les deux :

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

Le `lu-file-entry` est toujours en `size="L"`, et ne reçoit `media` que si l'upload est en `size="L"` — c'est ce que faisait le composant en interne.

## 2. Usages HTML/CSS purs

Hors de portée du schematic, qui ne traite que les composants Angular. `.fileUpload.mod-S`, `.fileEntry.mod-S` et `.fileToolbar.mod-S` n'existent plus : un élément qui portait `mod-S` perd simplement la classe, un élément sans `mod-S` doit recevoir `mod-L` pour garder son rendu.
