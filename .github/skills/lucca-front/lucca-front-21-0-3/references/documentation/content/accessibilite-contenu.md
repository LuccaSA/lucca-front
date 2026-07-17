# Accessibilité

# Content

## Sens et hiérarchie des informations d’une page

### Sens des informations

**Notre message doit être compréhensible et bien retranscrit par un lecteur d’écran**. Restons donc clairs et concis dans les instructions de configuration du produit, les fonctionnalités de base, les méthodes de saisie.

**Gardons les paragraphes courts et la** **structure des phrases simple**. Lisons le texte à haute voix, ainsi qu'avec un lecteur d'écran.

**Écartons au maximum les références culturelles**, car elles sont difficiles à traduire, à retranscrire.

### Titres et hiérarchie des informations

Organisons les informations d'une manière logique et prévisible, pour offrir une navigation intuitive et fluide.

L’utilisateur doit trouver facilement ce qu'il cherche, d'un simple coup d'œil, grâce à une structure de titres appropriée.

Une structure de titres inappropriée peut entraîner une confusion dans la navigation.

**Dès la phase de wireframing, imaginons pour chaque page une « table des matières ».**

Est-elle toujours logique ? Exhaustive ? 

**Structurons le document en titres et en sous-titres** à l’aide des éléments h1 à h6.

Veillons à ce que la structure ne comporte pas de « trous »: un titre de niveau h2 ne doit pas être suivi d’un titre h4, h5 ou h6, par exemple.

Pour contrôler ce qui est déjà en ligne, on peut utiliser la fonction d’affichage de la table des matières de la page avec certains outils comme HeadingMaps.

**Pourquoi ?** Les titres représentent la base de navigation la plus courante pour les utilisateurs de lecteurs d'écran. Les utilisateurs peuvent naviguer rapidement dans une page. 

*Aperçu obtenu avec l'extension HeadingMaps, qui permet de montrer, parcourir et auditer la hiérarchie de titres.*

*Aperçu de l'interface Cleemy Achats avec une hiérarchie de titres bien réfléchie.*

## Pas de termes indiquant une position

**Ne jamais indiquer « cliquez ici** » : de manière générale, évitons d'utiliser un langage directionnel tel que « au-dessus/en dessous » ou « droite/gauche ». C'est aussi l'indice d'un manque de hiérarchie visuelle ou de contenu.

**Pourquoi ?** Ces éléments directionnels prononcée à haute voix par un lecteur d'écran créent de la confusion. Ils présentent des obstacles pour l'internationalisation, et pour le design sur mobile.

Notons qu'**on peut utiliser des indications** **temporelles** du type « avant », « après », « au début », « à la fin » : les informations présentes dans la page restant ordonnées de façon linéaire.

## Couleurs : soignons-les

**Vérifiez le** **contraste des couleurs**. Dans le cadre des recommandations sur l’accessibilité, nous avons travaillé à la création d’une grille de contraste.

La compréhension de la page doit se faire sans faire allusion à la couleur.Exemple de mauvaise pratique : « les erreurs sont signalées en rouge ».

Idem pour les infographies ou images : l'information ne doit pas passer que par la couleur.

**Pourquoi ?** Les personnes daltoniennes, malvoyantes ne peuvent accéder aux graphiques basés uniquement sur la couleur.

## Vidéo, audio, infographie, graphique

Pour annoncer chaque contenu de type vidéo, audio, infographique, graphique, prévoyons un titre et un résumé.

Lorsque le contenu véhicule beaucoup d’informations, proposons en parallèle une description détaillée au format texte.

### Proposer une transcription

De même, pour les vidéos, si l’insertion de sous-titres ne peut être réalisée, proposons une transcription intégrale.

La transcription, la description du contenu peut être consultable sur la même page, à proximité du contenu riche en informations. Ou bien sur une autre page, disponible depuis un lien hypertexte.

Si l'image donne une information, le *alt text* (qu'on nomme aussi « texte alternatif », « attribut alt de l’image ») doit contenir la description du visuel de l'image.

Si l'image est simplement illustrative, décorative, sans donner d'information, dispensons-nous de l’alternative textuelle.

Pour déterminer la meilleure façon de communiquer les informations d'une image à un utilisateur de lecteur d'écran, se référer à [l'arbre de décision ](https://www.w3.org/WAI/tutorials/images/decision-tree/)*[alt text](https://www.w3.org/WAI/tutorials/images/decision-tree/)* de l'organisme de standardisation W3C (en anglais).

**Pourquoi ?** Le texte alternatif sur les images permet aux technologies d'assistance telles que les lecteurs d'écran de retranscrire le but d'une image ou de l'ignorer si elle est purement illustrative.

À noter : lorsque les lecteurs d'écran rencontrent des images, des graphiques et des icônes sans attribut alt, ils "prononcent" par défaut le nom du fichier.

### Rédiger un bon *alt text*

Votre alt text doit être bref, concis.

Il ne doit pas contenir :

* Ni les mots « bouton », « lien » ou « image » - car les lecteurs d'écran fournissent ces informations.
* Ni des nombreux mots-clefs destinés au référencement.
* Ni des informations sur les droits d'utilisation de l'image, ou des crédits.

Consulter les [règles pour l'accessibilité des contenus Web](https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html) (WCAG) 2.0 pour plus d'informations.

## Liens hypertexte et boutons

Chaque libellé de lien ou de bouton décrit la fonction ou la nature du contenu vers lequel il pointe.

Partageons des descriptifs explicites lorsqu'un lien est mentionné.

**Pourquoi ?** L'utilisateur doit comprendre l'action possible en cliquant sur le bouton, vers quoi le lien le redirige, ce que mentionne la page en lien ou bien ce qui est à télécharger, le cas échéant.

## Texte

* La largeur d'un texte ne doit pas dépasser 80 caractères (espaces compris).
Ou 40 caractères ou moins si le texte est chinois, japonais ou coréen.
Une bonne pratique recommandée par [l'organisme de standardisation W3C](https://www.w3.org/WAI/tutorials/page-structure/styling/), ainsi que par d'[autres sources](http://webtypography.net/2.1.2).
**Pourquoi ?** Ce calibre de 80 caractères maximum aide les utilisateurs souffrant de certains handicaps visuels ou de lecture, qui ont des difficultés de visualisation lorsqu'ils lisent de longues lignes de texte.
* Le texte ne doit pas être justifié.
**Pourquoi ?** Le texte justifié ajoutant de l'espace entre les mots, cela peut rendre la lecture difficile pour certains utilisateurs dyslexiques. Idem pour les personnes qui utilisent le redimensionnement de texte ou le zoom.
* L'utilisation de blocs de texte répartis dans une liste à puces peut aider à la lisibilité, tout comme à la structuration des pages. On peut par exemple détailler ainsi les caractéristiques principales d'un même sujet.
**Pourquoi ?** Les listes à puces sont idéales pour attirer l’attention sur trois éléments ou plus.

## Accents sur les lettres en capitale

Oublier un accent constitue une faute d’orthographe, mais c’est aussi une source d’inaccessibilité.

**Pourquoi ?** Les accents sur les majuscules facilitent la prononciation correcte des mots lors des synthèses vocales utilisées par les personnes aveugles ou malvoyantes.

## Format web de l’information

Rendre accessible l'information sous format web plutôt que sous formats téléchargeables (.pdf, .jpeg).

**Pourquoi ?** Le HTML est un format natif du web conçu pour être accessible et interprétable par les navigateurs et technologies d'assistance (lecteurs d'écran, synthèses vocales, etc.) utilisées par les personnes handicapées.

Rendre un PDF accessible nécessite des efforts de balisage et de structuration. Alors que le HTML accessible peut être produit dès la conception du contenu.

## Ressources sur l’accessibilité 

* [RGAA: Référentiel général d'amélioration de l'accessibilité](https://accessibilite.numerique.gouv.fr/). Depuis 2012, en France, tous les sites publics doivent être accessibles et conformes à l’ensemble des critères du RGAA.
* Les [excellentes affiches](https://github.com/UKHomeOffice/posters/tree/master/accessibility/dos-donts/posters_fr) (en français, en anglais, en espagnol) imaginées par le gouvernement du Royaume-Uni. Elles figurent d'ailleurs aux murs des bureaux Lucca.
* En anglais, se référer au [Progressive's Styleguide](https://s3.amazonaws.com/s3.sumofus.org/images/SUMOFUS_PROGRESSIVE-STYLEGUIDE.pdf) : un guide linguistique inclusif qui aborde les recommandations pour de multiples domaines (âge, économie, handicap...).
* En anglais (bis), les articles très bien conçus de l'[agence de design Sparck](https://sparck.io/journal/tag/accessibility).*Luccasien·ne, avez-vous des questions, des remarques, un témoignage ?* 
*Envoyez un DM sur Slack à Anne-Laure ou sur #ux-writing.*
