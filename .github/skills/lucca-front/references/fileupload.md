# AssetsFileUpload

## Quand utiliser ce composant
- Lorsque vous devez permettre aux utilisateurs de téléverser un ou plusieurs fichiers.
- Pour afficher des fichiers importés avec des graphiques et des informations de statut.
- Lorsque vous souhaitez limiter la taille des fichiers téléversés et afficher des messages d'erreur en cas de non-conformité.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-file-fileupload-angular-basic--docs)
- [Multi](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileupload-angular-basic--multi)
- [Single](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileupload-angular-basic--single)

## Composant Figma
[AssetsFileUpload Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-189590) — Visualisation des uploads de fichiers avec variantes disponibles pour différents types d'affichage (Default, Media).

## Import

```typescript
import { MultiFileUploadComponent } from '@lucca-front/ng/file-upload';
import { SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
```

## Usage de base

```html
<lu-form-field label="Label">
    <lu-multi-file-upload (filePicked)="fileUploadFeature.uploadFiles([$event])" />
</lu-form-field>
```

## Directive / Composant : `lu-file-entry`, `lu-multi-file-upload`, `lu-single-file-upload`, `lu-form-field`, `lu-text-input`, `[luInput]`

Les sélecteurs sont utilisés pour intégrer le composant de téléchargement de fichiers dans diverses mises en page. Ils sont applicables sur des éléments HTML pour créer des zones de dépôt et de prévisualisation de fichiers.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut pour le téléchargement de fichiers. |
| `"media"` | Affiche les fichiers importés avec une mise en forme adaptée aux visuels. |

```html
<lu-multi-file-upload media (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-multi-file-upload>
```

## Inputs

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du composant de téléchargement.

```html
<lu-single-file-upload [size]="'large'" (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-single-file-upload>
```

### `fileMaxSize`
Type: `number` — Default: `undefined`

Limite le poids des fichiers importables (en octets).

```html
<lu-multi-file-upload [fileMaxSize]="1048576" (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-multi-file-upload>
```

### `illustration`
Type: `string` — Default: `undefined`

Modifie l'illustration de l'icône dans la zone de dépôt.

```html
<lu-single-file-upload [illustration]="'uploads/file.svg'" (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-single-file-upload>
```

### `media`
Type: `boolean` — Default: `false`

Affiche les fichiers importés avec une mise en forme adaptée aux visuels.

```html
<lu-single-file-upload [media]="true" (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-single-file-upload>
```

### `displayFileName`
Type: `boolean` — Default: `false`

Affiche le nom des fichiers importés sous l'image en vue média.

```html
<lu-single-file-upload [displayFileName]="true" (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-single-file-upload>
```

### `structure`
Type: `boolean` — Default: `false`

Augmente le border-radius du champ pour l'utiliser en élément de structure.

```html
<lu-single-file-upload [structure]="true" (filePicked)="fileUploadFeature.uploadFiles([$event])"></lu-single-file-upload>
```

## Patterns courants

### Upload de fichiers multiples
```html
<lu-form-field label="Label">
    <lu-multi-file-upload (filePicked)="fileUploadFeature.uploadFiles([$event])" />
</lu-form-field>
```

### Upload d'un fichier unique
```html
<lu-form-field label="Label">
    <lu-single-file-upload (filePicked)="fileUploadFeature.uploadFiles([$event])" />
</lu-form-field>
```

## Accessibilité
Les éléments de téléchargement doivent être accessibles au clavier et doivent fournir des indications claires sur les erreurs de téléchargement ou de validation des fichiers.

## Guidelines Prisme
- Utiliser des icônes claires pour les zones de dépôt.
- Fournir des messages d'erreur descriptifs en cas de problème lors du téléversement.