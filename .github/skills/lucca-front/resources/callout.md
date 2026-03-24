# Callout

## Quand utiliser ce composant
- Pour afficher des informations importantes et attirer l'attention de l'utilisateur sur des contenus spécifiques.
- Lorsqu'il est nécessaire de fournir des retours d'événements utilisateur (par exemple, en cas de succès, d'avertissement ou d'erreur).
- Pour présenter des suggestions ou des actions à l'utilisateur dans le cadre d'interactions plus complexes.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-feedback-callout-angular-ai--docs)
- [Action](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--action)
- [Event](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--event)
- [Suggestion](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--suggestion)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-ai--basic)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-feedback-callout-angular-basic--template)

## Composant Figma
[Visuel du composant pr-Callout sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=6053-35275) — Ce composant propose diverses variantes en fonction de la taille et de la palette, offrant une flexibilité dans l'affichage des messages.

## Import

```typescript
import { CalloutComponent } from '@lucca-front/ng/callout';
// ou
import { CalloutActionsComponent } from '@lucca-front/ng/callout';
```

## Usage de base

```html
<lu-callout>Contenu du callout ici...</lu-callout>
```

## Directive / Composant : `lu-callout` ou `<lu-callout>`

Composant principal pour afficher des messages callout. Applicable sur n'importe quel élément pour un affichage d'informations contextuelles.

### Valeurs (si directive avec valeurs)

| Valeur        | Description                  |
|---------------|------------------------------|
| `""` (vide)   | Variante par défaut          |
| `"success"`   | Affiche un message de succès |
| `"warning"`   | Affiche un message d'avertissement |
| `"critical"`  | Affiche un message critique   |
| `"neutral"`   | Affiche un message neutre    |
| `"product"`   | Affiche un message produit    |
| `"ai"`        | Affiche un message AI        |

```html
<lu-callout size="M" palette="success">Contenu du callout ici...</lu-callout>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Détermine la taille du callout.

```html
<lu-callout [size]="'S'">Contenu du callout ici...</lu-callout>
```

### `palette`
Type: `'Critical' | 'Success' | 'Neutral' | 'Warning' | 'AI' | 'Product'` — Default: `'Neutral'`

Définit la palette visuelle du callout.

```html
<lu-callout [palette]="'Critical'">Contenu du callout ici...</lu-callout>
```

## Patterns courants

### Callout avec action
```html
<lu-callout>
  <lu-callout-actions>
    <button type="button">Action</button>
  </lu-callout-actions>
  Contenu avec action.
</lu-callout>
```

### Liste de feedback
```html
<lu-callout>
  <ul lu-callout-feedback-list>
    <li lu-feedback-item-description>Feedback 1</li>
    <li lu-feedback-item-description>Feedback 2</li>
  </ul>
</lu-callout>
```

## Accessibilité
S'assurer que tous les messages sont clairs et qu'ils incluent des descriptions significatives pour les lecteurs d'écrans. Éviter l'utilisation de termes trop techniques sans explications.

## Guidelines Prisme
Respecter la documentation de style concernant l'usage des couleurs et des tailles pour garantir une cohérence visuelle au sein de l'application.