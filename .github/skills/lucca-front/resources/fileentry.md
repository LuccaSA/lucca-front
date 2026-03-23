# pr-FileEntry

## Quand utiliser ce composant
- Pour permettre aux utilisateurs de télécharger et de gérer des fichiers dans un formulaire.
- Idéal pour les applications nécessitant un retour visuel sur l'état de téléchargement des fichiers (ex: fichiers en cours de chargement, erreurs de téléchargement).
- Utile pour afficher les informations d'un fichier (nom, taille, type) avec des options pour le supprimer ou le modifier.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileentry-angular-basic--basic)

## Composant Figma
[Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-189555) - Ce composant présente un espace pour le téléchargement de fichiers avec différentes tailles et états visuels, incluant des variantes pour l'affichage de fichiers média.

## Import

```typescript
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
```

## Usage de base

```html
<lu-file-entry [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png' }"></lu-file-entry>
```

## Directive / Composant : `lu-file-entry`

Directive utilisée pour le composant de gestion de fichiers. Applicable sur les éléments pour créer un champ de téléchargement de fichier.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `null` | Variante par défaut, sans taille spécifiée. |
| `"S"` | Variante de taille petite. |

```html
<lu-file-entry size="S" [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png' }"></lu-file-entry>
```

## Inputs

### `entry`
Type: `{ name: string, size: number, type: string }` — Default: `undefined`

Objet contenant les informations du fichier à afficher.

```html
<lu-file-entry [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png' }"></lu-file-entry>
```

### `size`
Type: `'S' | null` — Default: `null`

Définit la taille du composant.

```html
<lu-file-entry size="S" [entry]="{ name: 'dummyimage.png', size: 28420, type: 'image/png' }"></lu-file-entry>
```

### `state`
Type: `null | 'loading' | 'error'` — Default: `null`

Indique l'état du fichier (par exemple, en cours de chargement ou une erreur).

```html
<lu-file-entry [entry]="..." state="loading"></lu-file-entry>
```

## Patterns courants

### Fichier en cours de téléchargement
```html
<lu-file-entry [entry]="{ name: 'file.txt', size: 1024, type: 'text/plain' }" state="loading"></lu-file-entry>
```

### Fichier avec erreur
```html
<lu-file-entry [entry]="{ name: 'virus_file.exe', size: 2048, type: 'application/octet-stream' }" state="error"></lu-file-entry>
```

## Accessibilité
S'assurer que les utilisateurs comprennent l'état actuel des fichiers avec des messages d'erreur clairs. Utiliser des attributs ARIA pour signaler les états de succès et d'erreur.

## Guidelines Prisme
- Utiliser des icônes appropriées pour le type de fichier.
- Offrir des messages d'erreur spécifiques et utiles pour une meilleure expérience utilisateur.
- Limiter les types de fichiers acceptés pour éviter les téléchargements non sécurisés.