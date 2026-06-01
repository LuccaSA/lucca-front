# Arrondis

# Principes

## Application des radius

Le choix du radius dépend du composant et de sa place ou hiérarchie dans l’interface. Plus un composant est structurant et volumineux, plus le radius appliqué sera important.

Chaque composant du Design System possède un radius défini en fonction de son utilisation principale.

| Token | Utilisation |
| --- | --- |
| `--pr-t-border-radius-structure` | Pour les conteneurs structurants (Index table, Data table, Box, Callout, Popover, etc.). |
| `--pr-t-border-radius-default` | Radius par défaut pour la majorité des composants (Buttons, Form field, etc.). |
| `--pr-t-border-radius-small` | Pour les petits composants (Tooltips, Tags, composants XS). |
| `--pr-t-border-radius-full` | Pour les composants devant être entièrement arrondis (Avatars, Status badges, Gauge, Progress bar, etc.). |
| `--pr-t-border-radius-input` | Pour tous les champs de formulaire. Cela garantit une homogénéité entre tous les types de champs existants. |

### Modification des radius

Certains composants peuvent voir leur radius s’adapter ponctuellement en fonction de leur niveau d’imbrication dans l’interface.

<design figma-url="https://www.figma.com/design/i5JVSEVXAUyXiDewcxWGRp/?node-id=623:17834">

</design>

#### Imbrication d’éléments structurants

Un composant structurant avec un radius de 12px (`--pr-t-border-radius-structure`) peut adopter un radius réduit à 8px (`--pr-t-border-adius-default`) lorsqu’il est imbriqué dans un autre conteneur, pour éviter une accumulation visuelle d’arrondis. C’est par exemple le cas des Highlight data ou des Cards lorsqu’elles sont regroupées ou imbriquées dans un kanban.

- **Do** : Le composant Highlight data peut porter un radius de 8px lorsqu’il est imbriqué dans des éléments structurants d’une interface de 12px.
- **Don't** : N’imbriquons pas des radius de 12px dans des éléments structurants de 12px.

#### Un composant devient un élément structurant

À l’inverse, certains composants habituellement en 8px (`--pr-t-border-radius-default`), peuvent exceptionnellement passer à 12px (`--pr-t-border-radius-structure`) lorsqu’ils prennent une dimension plus structurante dans une interface. C’est notamment le cas du File upload et du Callout.

- **Do** : Le File upload, ici utilisé comme une section à part entière de l’interface, peut porter un radius de 12px. Cela permet d’être harmonieux avec la section d’à côté.
- **Don't** : Le File upload, dans ce contexte, n’est pas un élément structurant. Son radius porte donc sa valeur par défaut, soit 8px.

### Composants non modifiables

Certains composants conservent un radius fixe, quel que soit leur contexte. C’est le cas des boutons, des champs de formulaire ou encore des Filter Pills. Leur radius ne doit donc jamais varier selon l’imbrication ou la disposition.

# Tokens

## Sémantiques

| Token | Valeur |
| --- | --- |
| `--pr-t-border-radius-structure` | `var(--pr-t-border-radius-150)` |
| `--pr-t-border-radius-default` | `var(--pr-t-border-radius-100)` |
| `--pr-t-border-radius-small` | `var(--pr-t-border-radius-75)` |
| `--pr-t-border-radius-full` | 9999px |
| `--pr-t-border-radius-input` | `var(--pr-t-border-radius-default)` |

## Non sémantiques

| Token | Valeur |
| --- | --- |
| `--pr-t-border-radius-0` | 0px |
| `--pr-t-border-radius-25` | 2px |
| `--pr-t-border-radius-50` | 4px |
| `--pr-t-border-radius-75` | 6px |
| `--pr-t-border-radius-100` | 8px |
| `--pr-t-border-radius-150` | 12px |
| `--pr-t-border-radius-200` | 16px |
| `--pr-t-border-radius-300` | 24px |
| `--pr-t-border-radius-400` | 32px |
