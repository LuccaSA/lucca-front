# FileEntry

## Quand utiliser ce composant
- Pour afficher des fichiers téléchargés dans une interface utilisateur.
- Lorsqu'il est nécessaire de montrer l'état des fichiers, comme en cours de téléchargement ou en erreur.
- Pour intégrer une fonctionnalité de gestion de fichiers dans des formulaires complexes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-file-fileentry-angular-basic--basic)

## Composant Figma
[pr-FileEntry (v19.3) Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=28445-189555) - Le composant représente une entrée de fichier avec plusieurs états et tailles, permettant une interaction avec les utilisateurs lors du chargement de fichiers.

## Import

```typescript
import { FileEntryComponent } from '@lucca-front/ng/file-upload';
```

## Usage de base

```html
<lu-file-entry [entry]="{ name: 'document.pdf', size: 123456, type: 'application/pdf' }"></lu-file-entry>
```

## Directive / Composant : `lu-file-entry`

Ce sélecteur représente une entrée de fichier qui peut être utilisée dans des formulaires. Applicable uniquement sur des éléments Angular.

## Inputs

### `entry`
Type: `FileEntry` — Default: `undefined`

Représente l'objet fichier avec les propriétés nom, taille et type.

```html
<lu-file-entry [entry]="{ name: 'document.pdf', size: 123456, type: 'application/pdf' }"></lu-file-entry>
```

## Patterns courants

### Afficher un fichier en cours de téléchargement
```html
<lu-file-entry [entry]="{ name: 'image.png', size: 204800, type: 'image/png', state: 'Uploading' }"></lu-file-entry>
```

## Accessibilité
Assurez-vous que le composant a des attributs ARIA appropriés pour indiquer l'état du téléchargement et les erreurs éventuelles.

## Guidelines Prisme
- Utiliser des messages clairs pour indiquer l'état du fichier (erreur, en cours de téléchargement, succès).
- Ne pas surcharger l'utilisateur avec trop d'éléments d'interface, garder une hiérarchie claire.