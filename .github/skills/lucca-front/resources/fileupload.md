# AssetsFileUpload

## Quand utiliser ce composant
- Lorsque vous devez permettre le téléchargement de fichiers uniques ou multiples dans une interface utilisateur.
- Pour gérer des fichiers multimédias, notamment des images ou des vidéos, avec des prévisualisations.
- Dans des formulaires où la saisie de fichiers est requise, tout en garantissant une bonne expérience utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-file-fileupload-angular-basic--docs)
- [Multi](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileupload-angular-basic--multi)
- [Single](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileupload-angular-basic--single)

## Composant Figma
[AssetsFileUpload - Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-189590) + Le composant est conçu pour afficher une zone de dépôt de fichiers avec actions claires pour le téléchargement. Les variantes disponibles incluent un type par défaut et un type média.

## Import

```typescript
import { SingleFileUploadComponent, MultiFileUploadComponent } from '@lucca-front/ng/file-upload';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-single-file-upload>...</lu-single-file-upload>
```

## Directive / Composant : `luFileUpload` ou `<lu-file-upload>`

Directive ou composant permettant de gérer le téléchargement de fichiers. Applicable sur les éléments HTML spécifiques comme `<lu-single-file-upload>` ou `<lu-multi-file-upload>`.

### Valeurs

| Valeur      | Description                       |
|-------------|-----------------------------------|
| `""` (vide) | Variante par défaut               |
| `"media"`   | Variante pour le téléchargement de fichiers multimédias |

```html
<lu-single-file-upload type="media">...</lu-single-file-upload>
```

## Inputs

### `allowedFileTypes`
Type: `string[]` — Default: `[]`

Permet de spécifier les types de fichiers autorisés pour le téléchargement.

```html
<lu-single-file-upload [allowedFileTypes]="['image/png', 'image/jpeg']">...</lu-single-file-upload>
```

### `multiple`
Type: `boolean` — Default: `false`

Indique si le téléchargement de plusieurs fichiers est autorisé.

```html
<lu-multi-file-upload [multiple]="true">...</lu-multi-file-upload>
```

## Patterns courants

### Upload Système
```html
<!-- Zone de dépôt pour le téléchargement de fichiers -->
<lu-multi-file-upload [multiple]="true" [allowedFileTypes]="['image/*']">...</lu-multi-file-upload>
```

## Accessibilité
Assurez-vous que les éléments de téléchargement ont des légendes claires et que les messages d'erreur sont accessibles pour les utilisateurs d'assistants technologiques.

## Guidelines Prisme
- Utiliser des icônes reconnaissables pour les actions de téléchargement.
- Fournir une rétroaction visuelle lors du téléchargement des fichiers.
- Évitez de bloquer l'interface pendant le processus de téléchargement.