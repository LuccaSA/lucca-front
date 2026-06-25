# loading — Design

**Mots-clés**chargement, spinner, loader, attente

## Règles d'usage

### Positionnement

#### Chargement

Les indicateurs de progressions sont toujours centrés dans les zones respectives du *layout,* correspondantes aux parties importantes de l’interface.

#### Mise à jour

Les indicateurs sont positionnés par dessus les zones mises à jour, centrés et par dessus un *overlay* blanc semi-transparent.

### Cycle de vie

#### Chargement

Le chargement des composants se fait en deux étapes :

1. Le *layout* est chargé, et on distingue (si possible) les différentes parties de l’interface et dans chaque zones on place un loading rond, petit et indéterminé. La zone la plus importante de l’interface se voit dotée d’un indicateur plus grand que les autres.
2. Les composants finaux apparaissent dans l’interface dès qu’ils sont disponibles (et donc pas forcément au même moment).

#### Chargement enrichi

Si possible, la zone la plus importante de l’interface verra son indicateur rond remplacé par un *skeleton*. Le reste du processus de chargement restant inchangé.
