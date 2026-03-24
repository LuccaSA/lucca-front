# AssetsFileUpload

## Quand utiliser ce composant
- Pour permettre aux utilisateurs de télécharger un ou plusieurs fichiers via une interface intuitive.
- Lorsque vous souhaitez intégrer un mécanisme de dépôt de fichiers (drag and drop) sur votre interface utilisateur.
- Pour gérer le téléchargement de fichiers multimédias, comme des images ou des vidéos, avec une indication claire de type.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-file-fileupload-angular-basic--docs)
- [Multi](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileupload-angular-basic--multi)
- [Single](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileupload-angular-basic--single)

## Composant Figma
[AssetsFileUpload](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-189590) — Ce composant présente une interface de téléchargement de fichiers, avec des variantes pour le type de fichier. Variantes disponibles : Type=Default, Type=Media.

## Import

```typescript
import { MultiFileUploadComponent } from '@lucca-front/ng/file';
// ou
import { SingleFileUploadComponent } from '@lucca-front/ng/file';
```

## Usage de base

```html
<!-- Usage minimal d'un upload simple -->
<lu-single-file-upload></lu-single-file-upload>

<!-- Usage minimal d'un upload multiple -->
<lu-multi-file-upload></lu-multi-file-upload>
```

## Directive / Composant : `lu-single-file-upload` ou `lu-multi-file-upload`

Description courte du sélecteur. Applicable sur les éléments qui nécessitent la fonctionnalité de téléchargement de fichiers.

## Inputs

### `type`
Type: `'single' | 'multi'` — Default: `'single'`

Détermine le mode de téléchargement, soit simple ou multiple.

```html
<lu-single-file-upload [type]="'single'"></lu-single-file-upload>
<lu-multi-file-upload [type]="'multi'"></lu-multi-file-upload>
```

### `accept`
Type: `string` — Default: `''`

Permet de spécifier les types de fichiers acceptés lors du téléchargement.

```html
<lu-single-file-upload [accept]="'.jpg,.png'"></lu-single-file-upload>
<lu-multi-file-upload [accept]="'.jpg,.png,.mp4'"></lu-multi-file-upload>
```

## Patterns courants

### Upload simple avec drag and drop
```html
<lu-single-file-upload>
  <input type="file" luInput />
</lu-single-file-upload>
```

### Upload multiple avec drag and drop
```html
<lu-multi-file-upload>
  <input type="file" luInput multiple />
</lu-multi-file-upload>
```

## Accessibilité
Assurez-vous que les éléments d’input sont correctement étiquetés avec les attributs `aria-label` pour améliorer l'accessibilité.

## Guidelines Prisme
- Préférez l'utilisation des systèmes de validation des fichiers pour assurer une bonne expérience utilisateur.
- Évitez de permettre le téléchargement de types de fichiers non pris en charge.