# Responsive design

# Introduction

⏱ **TL;DR**

Un design responsive...

* ... est une interface qui s'adapte au plus de contextes possibles, utilisable sur un grand nombre de supports.
* ... permet une expérience plus proche des attentes de la plupart de nos utilisateurs.
* ... améliore l'image de marque et réduit les coûts de maintenance et de développement.

## Le design responsive, c'est quoi ?

Quand on parle de design responsive, on pense souvent à l'adaptation des interfaces pour un écran de téléphone. Ce n'est pourtant qu'une petite partie du responsive.

Un design responsive est **une interface qui sait s’adapter aux différents contextes de ses utilisateurs**.

L'interface peut s'adapter aux contextes suivants : 

* la hauteur et la largeur de la zone d’affichage ;
* le niveau de zoom appliqué à la zone d’affichage ;
* le périphérique utilisé pour interagir avec l’interface (souris, clavier, tactile) ;
* les préférences concernant les contrastes, les transparences ou les animations.

Le responsive design se distingue d’une approche dite **«** mobile natif **»** en se reposant sur le web pour **proposer des solutions utilisables sur un grand nombre de supports**, ce qui présente plusieurs avantages que nous présentons ci-dessous.

## Pourquoi c'est important ?

### D’un point de vue utilisateur

Tous les utilisateurs n'ont pas le même équipement de bureautique, et le panel d'équipements différents est très grand. Par exemple, la largeur d'un périphérique peut aller de 320px (iPhone SE) à 2560px (LG 21:9 UltraWide™ Monitor). 

De plus, les nouvelles générations entrant dans la vie active sont plus habituées à utiliser des appareils mobiles que des ordinateurs. Permettre d’utiliser nos services sur ordinateur ou smartphone offrira donc à nos clients **une expérience plus proche de leurs attentes personnelles**.

**L'importance du responsive peut varier selon le produit et l'interface.** Le type de personas (Collaborateur ou Administrateur) et la complexité de l'interface (Accueil ou Paramétrage) sont des facteurs à prendre en compte pour prioriser les interfaces à adapter.

### D'un point de vue stratégique

Proposer des solutions utilisables dans un maximum de contextes nous permettra de toucher un plus grand nombre d’utilisateurs et potentiellement d’**améliorer l’image de marque en évitant certaines frustrations**.

Se reposer sur le web pour proposer des applications compatibles avec un maximum d’appareils permet aussi de se rendre moins dépendants des plateformes de Google et Apple.

### D'un point de vue technique

Avoir une application exploitable dans un maximum de contextes d’utilisation permet de réduire les coûts de maintenance et de développement par rapport au déploiement de plusieurs applications spécifiques à différents contextes. Proposer des applications web, iOS et Android présente également des problèmes de coordination pour la sortie et la maintenance de nouvelles fonctionnalités.

S’adapter à un maximum de contextes d’utilisation rendra nos produits plus robustes face à des demandes futures de nos utilisateurs. De plus, concevoir dès le départ les interfaces de cette manière sera moins coûteux que de les adapter à postériori.

# Implémentation

⏱ **TL;DR**

* Les interfaces doivent être conçues et intégrées pour supporter un affichage à partir d'une largeur de 320px.
* Il est recommandé de concevoir des maquettes mobile, desktop large, et tablette (par ordre d'importance) pour les écrans les plus prioritaires.
* Le designer et le Developer UI peuvent utiliser la méthode *mobile-first* pour concevoir des interfaces si le besoin s'en ressent. Le choix doit être commun.

### Pour les Dev UI

Les interfaces doivent être implémentés de manière à supporter un affichage sur tous les écrans à partir d'une largeur de 320px. La liste des breakpoints LF est présentée ci-dessous, et visualisable sur ce [Codepen.](https://codepen.io/vincent-valentin/pen/abdKBLz)

```css
:root {
  --breakpoints-XXXS-breakAt: 320px;
  --breakpoints-XXS-breakAt: 480px;
  --breakpoints-XS-breakAt: 640px;
  --breakpoints-S-breakAt: 800px;
  --breakpoints-M-breakAt: 1024px;
  --breakpoints-L-breakAt: 1280px;
  --breakpoints-XL-breakAt: 1366px;
  --breakpoints-XXL-breakAt: 1600px;
  --breakpoints-XXXL-breakAt: 1920px;
}
```

Ces variables permettent de définir des conditions liées à la largeur du *viewport*. Elles peuvent également être appelées via des *mixins*.

Des composants de type *atome*, *molécule* et *organisme* répondant à ce besoin seront fournis par Lucca Front pour faciliter l'adoption du responsive par l'ensemble des projets.

Si une interface nécessite un composant qui n'est pas fourni par Lucca Front, celui-ci devra être réalisé par l'intégrateur soit au sein de son projet, soit dans Lucca Front, si le besoin est transverse.

### Pour les designers

Même s'il est impossible de concevoir des maquettes pour toutes les dimensions d'écrans, il est recommandé de proposer une déclinaison pour les écrans les plus prioritaires, sur les résolutions suivantes (triées par ordre d'importance) :

1. Mobile (360px x 800px)
2. Desktop large (1920px x 1080px)
3. Tablette (744px x 1133px)

Concevoir en amont les maquettes ou *wireframes* sur des résolutions d'écrans différentes permet d'anticiper différents problèmes tels que l'organisation du contenu, le comportement du texte sur des petits écrans, etc. La charge de travail de l'intégrateur sera allégée.

Le composant *Soft - Page* sur Figma contient 3 variantes correspondant aux tailles d'écrans citées ci-dessus, pour vous aider à construire vos pages plus rapidement.

Le travail continue ensuite pendant ces deux étapes :

* Durant l'intégration de la maquette, où le designer doit pouvoir répondre aux questions potentielles de l'intégrateur sur le comportement dans différentes résolutions.
* Après l'intégration, où le designer doit s'assurer que le responsive est bien implémenté (en testant notamment lors des recettes sur différents appareils et/ou résolutions). Si ce n'est pas le cas, un échange est fait avec l'intégrateur pour corriger les problèmes.

### Mobile ou desktop-first ?

Même si la majorité des interfaces des applications Lucca sont destinées à être utilisées sur un format *desktop*, il est possible de concevoir ses maquettes en *mobile-first.* Cette méthode a plusieurs bénéfices :

* Pour le designer, le besoin de hiérarchiser clairement l’information pour optimiser l’utilisation de l’espace disponible
* Pour l'intégrateur, une réduction du code *CSS* à maintenir en faisant évoluer depuis un gabarit mobile (généralement simple) vers un gabarit plus complexe sur desktop (apparition de colonnes et donc de grilles plus complexes).

C'est au designer et à l'intégrateur de choisir ou non la méthode *mobile-first*, selon leurs préférences. Attention, il faut que ce choix soit une décision commune, et il ne justifie pas de négliger les écrans plus larges. Les affichages intermédiaires ne doivent pas non plus devenir le parent pauvre du design.
