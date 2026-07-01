# card — Content

## Card HTML

Classe CSS : `.card`

```css
@forward '@lucca-front/scss/src/components/card';
```

## Règles d’usage

### Titre

* Les cartes doivent toujours disposer d’un titre, court, clair, et facilement scannable.
* Les titres ne doivent être composés que d’une simple phrase, sans ponctuation.

### Carte cliquable

Si une carte donne accès à un contenu supplémentaire au clic, celle-ci doit faire apparaître un ombrage au survol.

### Illustration

Une carte peut être illustrée. Dans ce cas, le visuel sera placé en haut de la carte et prendra toute la largeur.

### Footer

Un footer peut être ajouté si la carte dispose d’actions importantes comme accepter ou refuser une action. Les boutons sont alignés à droite et respectent les [règles d’usage des bouton](https://zeroheight.com/94310e217/p/129a38-boutons).

### Actions secondaires

Il est possible d’ajouter des actions secondaires grâce aux [icônes d’actions](https://zeroheight.com/94310e217/p/31f133-icnes-daction). Dans ce cas, ces actions seront placés sur la droite de la carte, centrées verticalement et n’apparaitront qu’au survol de celle-ci. Il est possible d’ajouter des actions secondaires sur une carte cliquable. Dans ce cas, il faut veiller à ce que les deux actions ne soient pas activées simultanément.
