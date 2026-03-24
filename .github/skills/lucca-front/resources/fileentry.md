# FileEntry

## Quand utiliser ce composant
- Lorsque vous souhaitez permettre à un utilisateur de télécharger des fichiers dans une application.
- Pour représenter visuellement l'état d'un fichier en cours de téléchargement ou en erreur.
- Idéal pour les formulaires où des fichiers sont requis, comme les CV ou les documents d'identité.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileentry-angular-basic--basic)

## Composant Figma
[Visuel du composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-189555) - Ce composant présente différentes variantes selon le type, la taille et l'état, incluant par exemple des états d'erreur et de chargement.

## Import

```typescript
import { FileEntryComponent } from '@lucca-front/ng/file';
// ou
import { FileEntryDirective } from '@lucca-front/ng/file';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-file-entry></lu-file-entry>
```

## Directive / Composant : `lu-file-entry`

Composant utilisé pour la gestion du téléchargement de fichiers, appliqué sur un élément HTML pour permettre l'interaction utilisateur.

### Valeurs (si directive avec valeurs)

| Valeur   | Description                  |
|----------|------------------------------|
| `""`     | Variante par défaut          |
| `"error"`| Indique un état d'erreur     |
| `"media"`| Indique un type de média     |
| `"uploading"`| Indique que le fichier est en cours de téléchargement |
| `"s"`    | Taille petite                |
| `"m"`    | Taille moyenne               |

```html
<lu-file-entry type="media" size="m" state="uploading"></lu-file-entry>
```

## Inputs

### `type`
Type: `'default' | 'media'` — Default: `'default'`

Définit le type de fichier à télécharger.

```html
<lu-file-entry [type]="'media'"></lu-file-entry>
```

### `size`
Type: `'s' | 'm'` — Default: `'s'`

Définit la taille du composant.

```html
<lu-file-entry [size]="'m'"></lu-file-entry>
```

### `state`
Type: `'default' | 'error' | 'uploading'` — Default: `'default'`

Indique l'état du fichier (ex: en cours de téléchargement, erreur).

```html
<lu-file-entry [state]="'uploading'"></lu-file-entry>
```

## Patterns courants

### Affichage d’un fichier en cours de téléchargement
```html
<lu-file-entry type="media" size="s" state="uploading"></lu-file-entry>
```

## Accessibilité
Veillez à fournir des étiquettes appropriées et à gérer les états d'erreur de manière claire pour les lecteurs d'écran.

## Guidelines Prisme
- Assurez-vous que les états visuels soient cohérents et faciles à comprendre.
- Évitez d'utiliser des éléments cliquables qui ne réalisent aucune action.