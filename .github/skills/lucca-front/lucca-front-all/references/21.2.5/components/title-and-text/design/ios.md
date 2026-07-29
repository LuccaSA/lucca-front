# title-and-text — iOS

## Title and text iOS

```swift
import LuccaSDK
```

Sur tous les textes des maquettes Figma est spécifié un style de texte définit dans Prisme. Ce style décrit une police, une taille, une graisse et une couleur. Afin de simplifier la création des vues `Text("...")`, le SDK propose 3 `ViewModifier` qui appliquent la mise en forme appropriée.

```swift
// Applique la font Lucca, la taille de police, la graisse et la couleur.
.luccaTextStyle(prisme: LuccaTextStyleConstants)

// Applique seulement la font Lucca, la taille de police et la graisse.
.luccaTextFont(prisme: LuccaTextStyleConstants)

// Applique seulement la couleur.
.luccaTextColor(prisme: LuccaTextStyleConstants)

```

### Exemple

```swift
import LuccaSDK

// Affiche le texte "Hello world" avec le style Prisme "Body 1"
// - font & graisse : SourceSansPro-Regular
// - font-size : 16pts
// - couleur: Neutral800
Text("Hello world")
   .luccaTextStyle(prisme: .body1)
```

### Equivalences Prisme vs. LuccaTextStyleConstants

Suivons les [recommandations d'Apple](https://developer.apple.com/design/human-interface-guidelines/typography#Specifications) en matière de lisibilité : appuyons-nous uniquement sur les styles de texte Prisme dispo pour les maquettes destinées à iOS.

| Style de texte Prisme / Figma | constante `prisme` à fournir de type `LuccaTextStyleConstants` | Observation |
| --- | --- | --- |
| Headline | `.headline` |   |
| Title 1	 | `.title1` |   |
| Title 2 | `.title2` |   |
| Title 3 | `.title3` |   |
| Title 4 | `.title4` |   |
| Body 1 | `.body1_17pts` | Seulement si explicitement requis par le designer. |
| Body 1 | `.body1` |   |
| Body 2 | `.body2` |   |
| Title 5 | `.title5` |   |
| Body 3 | `.body3_13pts` | Seulement si explicitement requis par le designer. |
| Body 3 | `.body3` |   |
| Title 6 | `.title6` |   |
