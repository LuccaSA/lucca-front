# VerticalNavigation

## Quand utiliser ce composant
- Lorsque vous avez besoin d'une navigation verticale dans votre interface.
- Pour organiser des éléments de menu en groupes avec des icônes.
- Pour désactiver des éléments de navigation au besoin.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-verticalnavigation-angular-disabled--docs)
- [Exemple de base avec désactivation](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-disabled--basic)
- [Exemple sans icônes](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-iconless--basic)
- [Exemple de base](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-verticalnavigation-angular-basic--basic)

## Composant Figma
[Consulter le design dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13580-1866) - Composant de navigation verticale avec des options pour afficher ou masquer des icônes.

## Import

```typescript
import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
```

## Usage de base

```html
<lu-vertical-navigation heading="Section">
    <lu-vertical-navigation-group label="Group 1" icon="heart">
        <lu-vertical-navigation-item>
            <a luVerticalNavigationLink href="#">Item 1</a>
        </lu-vertical-navigation-item>
        <lu-vertical-navigation-item>
            <a luVerticalNavigationLink href="#" aria-current="page">Item 2</a>
        </lu-vertical-navigation-item>
        <lu-vertical-navigation-item>
            <a luVerticalNavigationLink href="#">Item 3</a>
        </lu-vertical-navigation-item>
    </lu-vertical-navigation-group>
    <lu-vertical-navigation-item>
        <a luVerticalNavigationLink href="#" icon="heartFilled">Item 4</a>
    </lu-vertical-navigation-item>
</lu-vertical-navigation>
```

## Directive / Composant : `luVerticalNavigation` ou `<lu-vertical-navigation>`

Composant principal de navigation verticale, applicable sur les conteneurs de navigation.

### Valeurs (si directive avec valeurs)

| Valeur   | Description                              |
|----------|------------------------------------------|
| `""`     | Variante par défaut                      |
| `"disabled"` | Désactive le composant.             |
| `"iconless"` | Présente le composant sans icônes. |

```html
<lu-vertical-navigation [disabled]="true">...</lu-vertical-navigation>
```

## Inputs

### `heading`
Type: `string` — Default: `''`

Titre de la section de navigation.

```html
<lu-vertical-navigation [heading]="'Titre de la section'">...</lu-vertical-navigation>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le composant si mis à `true`.

```html
<lu-vertical-navigation [disabled]="true">...</lu-vertical-navigation>
```

### `iconless`
Type: `boolean` — Default: `false`

Affiche le composant sans icônes si mis à `true`.

```html
<lu-vertical-navigation [iconless]="true">...</lu-vertical-navigation>
```

## Patterns courants

### Navigation avec désactivation
```html
<lu-vertical-navigation heading="Navigation">
    <lu-vertical-navigation-item>
        <a luVerticalNavigationLink href="#" disabled>Item désactivé</a>
    </lu-vertical-navigation-item>
</lu-vertical-navigation>
```

## Accessibilité
Assurez-vous que les liens contiennent le texte approprié et, si nécessaire, utilisez `aria-current` pour indiquer l'élément courant.

## Guidelines Prisme
- Suivez les directives de la marque pour la conception et l'accessibilité, vérifiez la documentation sur [Zeroheight](https://lucca-front.lucca.io).