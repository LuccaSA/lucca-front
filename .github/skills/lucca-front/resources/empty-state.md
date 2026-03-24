# pr-EmptyStateSection

## Quand utiliser ce composant
- Lorsque vous souhaitez afficher un état vide dans une section d'une page.
- Pour fournir un message d'information ou d'instruction lorsque le contenu est absent.
- Pour améliorer l'expérience utilisateur en rendant les états vides plus compréhensibles et agréables visuellement.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-empty-state-angular-page--docs)
- [Page](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-empty-state-angular-page--page)
- [Section](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-empty-state-angular-section--section)

## Composant Figma
[Visualisation du composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21818-76686) — Le composant pr-EmptyStateSection permet deux variantes d'alignement du texte : Center et Left.

## Import

```typescript
import { EmptyStateSectionComponent } from '@lucca-front/ng/feedback';
```

## Usage de base

```html
<lu-empty-state-section>...</lu-empty-state-section>
```

## Directive / Composant : `lu-empty-state-section`

Composant utilisé pour afficher un état vide dans une section. 

### Valeurs

| Valeur | Description                  |
|--------|------------------------------|
| `""` (vide) | Variante par défaut (Alignement Center) |
| `"left"`    | Aligne le contenu à gauche      |

```html
<lu-empty-state-section alignment="left">...</lu-empty-state-section>
```

## Inputs

### `alignment`
Type: `'center' | 'left'` — Default: `'center'`

Définit l'alignement du texte à l'intérieur de la section.

```html
<lu-empty-state-section [alignment]="'left'">...</lu-empty-state-section>
```

## Patterns courants

### État vide avec message centré
```html
<lu-empty-state-section>Veuillez ajouter du contenu ici.</lu-empty-state-section>
```

### État vide avec message aligné à gauche
```html
<lu-empty-state-section alignment="left">Aucun élément disponible.</lu-empty-state-section>
```

## Accessibilité
Assurez-vous que le contenu de l'état vide est informatif et facilement compréhensible pour les utilisateurs, en évitant un langage trop technique.

## Guidelines Prisme
- Évitez d'utiliser des états vides sans fournir d'indications claires sur les actions à entreprendre.
- Ne pas surcharger l'état vide avec trop d'éléments textuels ou graphiques qui pourraient distraire l'utilisateur.