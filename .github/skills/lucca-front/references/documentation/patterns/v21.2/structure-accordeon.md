# Structure en accordéon

# Content

## Cas d'usage

Cette interaction est utile dans plusieurs contextes :

* **Formulaires longs :** Pour regrouper des sections et ne présenter que les parties pertinentes au bon moment.
* **Menus et navigations secondaires :** Pour proposer des sous-menus sans surcharger l'interface.
* **Affichages détaillés :** Permettre aux utilisateurs de consulter des détails spécifiques uniquement lorsqu'ils en ont besoin.
* **FAQs :** Pour afficher des réponses sur demande sans encombrer l'écran.

## Icône et affordance

Pour assurer une cohérence sur l’ensemble des produits Lucca, l’icône utilisée pour indiquer un comportement d’accordéon est un chevron : `icon-arrowChevronBottom` / `icon-arrowChevronTop`

L’icône indique à l’utilisateur **le mouvement à venir** suite à l’interaction et non pas son état actuel :

* Chevron vers le bas lorsque la section est fermée (indique le mouvement d’expansion).
* Chevron vers le haut lorsque la section est ouverte (indique le mouvement de réduction).

Toutefois, si le panneau s’ouvre vers le haut plutôt que vers le bas, le sens des flèches doit être inversé :

* Chevron vers le haut lorsque la section est fermée (indique le mouvement d’expansion vers le haut).
* Chevron vers le bas lorsque la section est ouverte (indique le mouvement de réduction vers le bas).

Cette convention suit [les recommandations de NNGroup](https://www.nngroup.com/articles/accordion-icons/) afin d’améliorer la compréhension des interactions.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3757:86078">

</design>

## Comportement

### Navigation à la souris

Le survol du panneau déroulant doit indiquer à l’utilisateur l’interactivité et l’aspect cliquable. Au clic, le panneau s’ouvre ou se ferme.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3751:25424">

</design>

### Navigation au clavier

De la même manière qu’au survol, il doit être possible de plier/déplier un panneau en naviguant au clavier. Le touche “Entrée” permet d’agir sur le panneau.Utiliser les attributs ARIA (`aria-expanded`, `aria-controls`) pour informer les lecteurs d’écran.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3751:25434">

</design>

### Groupes d’accordéons

Chaque section peut être ouverte ou fermée indépendamment des autres. Si des informations complémentaires sont présentes ans plusieurs sections, cela simplifie l’expérience de l’utilisateur.

<design figma-url="https://www.figma.com/design/4vzJER8uY9Mh5wntlaLylH/?node-id=3751:1377">

</design>
