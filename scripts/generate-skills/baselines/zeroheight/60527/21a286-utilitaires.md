---
title: Utilitaires
description: Les utilitaires sont des classes universelles à ajouter sur vos composants pour simplifier leur mise en forme.
---

# Textes

## Tailles

Les utilitaires de tailles sont basés sur les tokens "[Shorthands](https://prisme.lucca.io/94310e217/p/73bd2f-typographie/t/9c01d01bdf)" et agissent donc sur les propriétés `font-size`, `line-height`, `font-weight` et `font-family`.

[Text Size](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-textsize--text-size)

## Graisse

```css
.pr-u-fontWeightRegular
.pr-u-fontWeightSemiBold
.pr-u-fontWeightBold
.pr-u-fontWeightBlack

```

## Couleurs

[Text Color](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-textcolor--text-color)

### Couleurs produits

Applique la couleur produit à un texte. Nécessite une [configuration](https://prisme.lucca.io/94310e217/v/0/p/15e774-couleurs/t/d8c9d5cd94).

```css
.pr-u-textPagga
.pr-u-textPoplee
.pr-u-textCoreHR
.pr-u-textTimmi
.pr-u-textCleemy
.pr-u-textCc
```

## Typographie

```css
.pr-u-fontFamily
.pr-u-fontFamilyBrand
.pr-u-fontFamilyCursive
```

## Style

[Text Style](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-textstyle--text-style)

<callout background="2" fullWidth="true">

Attention à faire la distinction entre les styles visuels et la sémantique en utilisant les bons éléments HTML si nécessaire : `<a href="#">link</a>`, `<s>delete</s>` and `<ins>new</ins> <del>old</del>`.

</callout>

## Ellipses

Cache une partie du texte. Une largeur est nécessaire sur le conteneur pour que l'ellipse fonctionne.

[Ellipsis](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-ellipsis--ellipsis)

# Spacings

## Margins

```css
/* All */
.pr-u-marginAuto
.pr-u-margin0
.pr-u-margin25
.pr-u-margin50
.pr-u-margin75
.pr-u-margin100
.pr-u-margin150
.pr-u-margin200
.pr-u-margin300
...
.pr-u-margin800

/* Bottom */
.pr-u-marginBottomAuto
.pr-u-marginBottom0
.pr-u-marginBottom25
.pr-u-marginBottom50
.pr-u-marginBottom75
.pr-u-marginBottom100
.pr-u-marginBottom150
.pr-u-marginBottom200
.pr-u-marginBottom300
...
.pr-u-marginBottom800

/* Top */
.pr-u-marginTopAuto
.pr-u-marginTop0
.pr-u-marginTop25
.pr-u-marginTop50
.pr-u-marginTop75
.pr-u-marginTop100
.pr-u-marginTop150
.pr-u-marginTop200
.pr-u-marginTop300
...
.pr-u-marginTop800

/* Right */
.pr-u-marginRightAuto
.pr-u-marginRight0
.pr-u-marginRight25
.pr-u-marginRight50
.pr-u-marginRight75
.pr-u-marginRight100
.pr-u-marginRight150
.pr-u-marginRight200
.pr-u-marginRight300
...
.pr-u-marginRight800

/* Left */
.pr-u-marginLeftAuto
.pr-u-marginLeft0
.pr-u-marginLeft25
.pr-u-marginLeft50
.pr-u-marginLeft75
.pr-u-marginLeft100
.pr-u-marginLeft150
.pr-u-marginLeft200
.pr-u-marginLeft300
...
.pr-u-marginLeft800

/* Inline */
.pr-u-marginInlineAuto
.pr-u-marginInline0
.pr-u-marginInline25
.pr-u-marginInline50
.pr-u-marginInline75
.pr-u-marginInline100
.pr-u-marginInline150
.pr-u-marginInline200
.pr-u-marginInline300
.pr-u-marginInline800

/* Inline start */
.pr-u-marginInlineStartAuto
.pr-u-marginInlineStart0
.pr-u-marginInlineStart25
.pr-u-marginInlineStart50
.pr-u-marginInlineStart75
.pr-u-marginInlineStart100
.pr-u-marginInlineStart150
.pr-u-marginInlineStart200
.pr-u-marginInlineStart300
...
.pr-u-marginInlineStart800

/* Inline end */
.pr-u-marginInlineEndAuto
.pr-u-marginInlineEnd0
.pr-u-marginInlineEnd25
.pr-u-marginInlineEnd50
.pr-u-marginInlineEnd75
.pr-u-marginInlineEnd100
.pr-u-marginInlineEnd150
.pr-u-marginInlineEnd200
.pr-u-marginInlineEnd300
...
.pr-u-marginInlineEnd800

/* Block */
.pr-u-marginBlockAuto
.pr-u-marginBlock0
.pr-u-marginBlock25
.pr-u-marginBlock50
.pr-u-marginBlock75
.pr-u-marginBlock100
.pr-u-marginBlock150
.pr-u-marginBlock200
.pr-u-marginBlock300
...
.pr-u-marginBlock800

/* Block start */
.pr-u-marginBlockStartAuto
.pr-u-marginBlockStart0
.pr-u-marginBlockStart25
.pr-u-marginBlockStart50
.pr-u-marginBlockStart75
.pr-u-marginBlockStart100
.pr-u-marginBlockStart150
.pr-u-marginBlockStart200
.pr-u-marginBlockStart300
...
.pr-u-marginBlockStart800

/* Block end */
.pr-u-marginBlockEndAuto
.pr-u-marginBlockEnd0
.pr-u-marginBlockEnd25
.pr-u-marginBlockEnd50
.pr-u-marginBlockEnd75
.pr-u-marginBlockEnd100
.pr-u-marginBlockEnd150
.pr-u-marginBlockEnd200
.pr-u-marginBlockEnd300
...
.pr-u-marginBlockEnd800
```

## Paddings

```css
/* All */
.pr-u-padding0
.pr-u-padding25
.pr-u-padding50
.pr-u-padding75
.pr-u-padding100
.pr-u-padding150
.pr-u-padding200
.pr-u-padding300
...
.pr-u-padding800

/* Bottom */
.pr-u-paddingBottom0
.pr-u-paddingBottom25
.pr-u-paddingBottom50
.pr-u-paddingBottom75
.pr-u-paddingBottom100
.pr-u-paddingBottom150
.pr-u-paddingBottom200
.pr-u-paddingBottom300
...
.pr-u-paddingBottom800

/* Top */
.pr-u-paddingTop0
.pr-u-paddingTop25
.pr-u-paddingTop50
.pr-u-paddingTop75
.pr-u-paddingTop100
.pr-u-paddingTop150
.pr-u-paddingTop200
.pr-u-paddingTop300
...
.pr-u-paddingTop800

/* Right */
.pr-u-paddingRight0
.pr-u-paddingRight25
.pr-u-paddingRight50
.pr-u-paddingRight75
.pr-u-paddingRight100
.pr-u-paddingRight150
.pr-u-paddingRight200
.pr-u-paddingRight300
...
.pr-u-paddingRight800

/* Left */
.pr-u-paddingLeft0
.pr-u-paddingLeft25
.pr-u-paddingLeft50
.pr-u-paddingLeft75
.pr-u-paddingLeft100
.pr-u-paddingLeft150
.pr-u-paddingLeft200
.pr-u-paddingLeft300
...
.pr-u-paddingLeft800

/* Inline */
.pr-u-paddingInline0
.pr-u-paddingInline25
.pr-u-paddingInline50
.pr-u-paddingInline75
.pr-u-paddingInline100
.pr-u-paddingInline150
.pr-u-paddingInline200
.pr-u-paddingInline300
...
.pr-u-paddingInline800

/* Inline start */
.pr-u-paddingInlineStart0
.pr-u-paddingInlineStart25
.pr-u-paddingInlineStart50
.pr-u-paddingInlineStart75
.pr-u-paddingInlineStart100
.pr-u-paddingInlineStart150
.pr-u-paddingInlineStart200
.pr-u-paddingInlineStart300
...
.pr-u-paddingInlineStart800

/* Inline end */
.pr-u-paddingInlineEnd0
.pr-u-paddingInlineEnd25
.pr-u-paddingInlineEnd50
.pr-u-paddingInlineEnd75
.pr-u-paddingInlineEnd100
.pr-u-paddingInlineEnd150
.pr-u-paddingInlineEnd200
.pr-u-paddingInlineEnd300
...
.pr-u-paddingInlineEnd800

/* Block */
.pr-u-paddingBlock0
.pr-u-paddingBlock25
.pr-u-paddingBlock50
.pr-u-paddingBlock75
.pr-u-paddingBlock100
.pr-u-paddingBlock150
.pr-u-paddingBlock200
.pr-u-paddingBlock300
...
.pr-u-paddingBlock800

/* Block start */
.pr-u-paddingBlockStart0
.pr-u-paddingBlockStart25
.pr-u-paddingBlockStart50
.pr-u-paddingBlockStart75
.pr-u-paddingBlockStart100
.pr-u-paddingBlockStart150
.pr-u-paddingBlockStart200
.pr-u-paddingBlockStart300
...
.pr-u-paddingBlockStart800

/* Block end */
.pr-u-paddingBlockEnd0
.pr-u-paddingBlockEnd25
.pr-u-paddingBlockEnd50
.pr-u-paddingBlockEnd75
.pr-u-paddingBlockEnd100
.pr-u-paddingBlockEnd150
.pr-u-paddingBlockEnd200
.pr-u-paddingBlockEnd300
...
.pr-u-paddingBlockEnd800
```

## Gaps

```css
/* Gap */
.pr-u-gap0
.pr-u-gap25
.pr-u-gap50
.pr-u-gap75
.pr-u-gap100
.pr-u-gap150
.pr-u-gap200
.pr-u-gap300
...
.pr-u-gap800

/* Row gap */
.pr-u-rowGap0
.pr-u-rowGap25
.pr-u-rowGap50
.pr-u-rowGap75
.pr-u-rowGap100
.pr-u-rowGap150
.pr-u-rowGap200
.pr-u-rowGap300
...
.pr-u-rowGap800

/* Column gap */
.pr-u-columnGap0
.pr-u-columnGap25
.pr-u-columnGap50
.pr-u-columnGap75
.pr-u-columnGap100
.pr-u-columnGap150
.pr-u-columnGap200
.pr-u-columnGap300
...
.pr-u-columnGap800
```

# Bordures et ombres

## Border radius

[Border Radius](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-borderradius--border-radius)

## Suppression de bordures

[Border](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-border--border)

# Display

## Changement de display

```css
.pr-u-displayNone
.pr-u-displayContents
.pr-u-displayBlock
.pr-u-displayInline
.pr-u-displayInlineBlock
.pr-u-displayFlex
.pr-u-displayInlineFlex
.pr-u-displayGrid
.pr-u-displayInlineGrid
```

## Cacher un élément responsive  

```css
/* Media min */
.pr-u-displayNoneAtMediaMinXXXS
.pr-u-displayNoneAtMediaMinXXS
.pr-u-displayNoneAtMediaMinXS
.pr-u-displayNoneAtMediaMinS
.pr-u-displayNoneAtMediaMinM
.pr-u-displayNoneAtMediaMinL
.pr-u-displayNoneAtMediaMinXL
.pr-u-displayNoneAtMediaMinXXL
.pr-u-displayNoneAtMediaMinXXXL

/* Media max */
.pr-u-displayNoneAtMediaMaxXXXS
.pr-u-displayNoneAtMediaMaxXXS
.pr-u-displayNoneAtMediaMaxXS
.pr-u-displayNoneAtMediaMaxS
.pr-u-displayNoneAtMediaMaxM
.pr-u-displayNoneAtMediaMaxL
.pr-u-displayNoneAtMediaMaxXL
.pr-u-displayNoneAtMediaMaxXXL
.pr-u-displayNoneAtMediaMaxXXXL

/* Container min */
.pr-u-displayNoneAtContainerMinXXXS
.pr-u-displayNoneAtContainerMinXXS
.pr-u-displayNoneAtContainerMinXS
.pr-u-displayNoneAtContainerMinS
.pr-u-displayNoneAtContainerMinM
.pr-u-displayNoneAtContainerMinL
.pr-u-displayNoneAtContainerMinXL
.pr-u-displayNoneAtContainerMinXXL
.pr-u-displayNoneAtContainerMinXXXL

/* Container max */
.pr-u-displayNoneAtContainerMaxXXXS
.pr-u-displayNoneAtContainerMaxXXS
.pr-u-displayNoneAtContainerMaxXS
.pr-u-displayNoneAtContainerMaxS
.pr-u-displayNoneAtContainerMaxM
.pr-u-displayNoneAtContainerMaxL
.pr-u-displayNoneAtContainerMaxXL
.pr-u-displayNoneAtContainerMaxXXL
.pr-u-displayNoneAtContainerMaxXXXL
```

## Flex

```css
/* Direction */
.pr-u-flexDirectionColumn
.pr-u-flexDirectionColumnReverse
.pr-u-flexDirectionRow
.pr-u-flexDirectionRowReverse

/* Wrap */
.pr-u-flexWrapWrap
.pr-u-flexWrapNowrap
.pr-u-flexWrapReverse

/* Justify Content */
.pr-u-justifyContentFlexStart
.pr-u-justifyContentFlexEnd
.pr-u-justifyContentCenter
.pr-u-justifyContentSpaceAround
.pr-u-justifyContentSpaceBetween
.pr-u-justifyContentSpaceEvenly

/* Align Items */
.pr-u-alignItemsFlexStart
.pr-u-alignItemsFlexEnd
.pr-u-alignItemsBaseline
.pr-u-alignItemsCenter
.pr-u-alignItemsStretch

/* Align Self */
.pr-u-alignSelfFlexStart
.pr-u-alignSelfFlexEnd
.pr-u-alignSelfBaseline
.pr-u-alignSelfCenter
.pr-u-alignSelfStretch

/* Flex Grow/Shrink */
.pr-u-flexGrow0
.pr-u-flexGrow1
.pr-u-flexShrink0
.pr-u-flexShrink1

/* Flex Basis */
.pr-u-flexBasis0
.pr-u-flexBasisAuto

/* Order — Réordonne un élément à la fin ou au début d'un groupe flex */
.pr-u-order1
.pr-u-orderMinus1

/* Gap — Ajoute un espace vertical et horizontal à un élément flex ou grid */
.pr-u-gap0
.pr-u-gapXXS
.pr-u-gapXS
.pr-u-gapS
.pr-u-gapM
.pr-u-gapL
.pr-u-gapXL
.pr-u-gapXXL

/* Column gap — Ajoute un espace horizontal à un élément flex ou grid */
.pr-u-columnGap0
.pr-u-columnGapXXS
.pr-u-columnGapXS
.pr-u-columnGapS
.pr-u-columnGapM
.pr-u-columnGapL
.pr-u-columnGapXL
.pr-u-columnGapXXL

/* Row gap — Ajoute un espace vertical à un élément flex ou grid */
.pr-u-rowGap0
.pr-u-rowGapXXS
.pr-u-rowGapXS
.pr-u-rowGapS
.pr-u-rowGapM
.pr-u-rowGapL
.pr-u-rowGapXL
.pr-u-rowGapXXL
```

## Masquer un élément

Masque un élément visuellement sans le supprimer de la couche sémantique. Ceci est très souvent utilisé pour aider à rendre accessible des contenus.

```css
.pr-u-mask
```

## Visibilité

Modifie la visibilité d'un élément.

```css
.pr-u-visibilityVisible
.pr-u-visibilityHidden
.pr-u-visibilityCollapse
```

## Print

Modifie le display d'un élément pour l'impression.

```css
.pr-u-onlyPrintDisplayBlock
.pr-u-onlyPrintDisplayFlex
.pr-u-onlyPrintDisplayGrid
.pr-u-onlyPrintDisplayInline
.pr-u-onlyPrintDisplayInlineFlex
.pr-u-onlyPrintDisplayInlineBlock
.pr-u-onlyPrintDisplayInlineGrid
.pr-u-onlyPrintDisplayContents
.pr-u-onlyPrintDisplayNone
.pr-u-onlyPrintDisplayContents
.pr-u-onlyPrintDisplayInlineGrid
.pr-u-onlyPrintDisplayInlineBlock
.pr-u-onlyPrintDisplayInlineFlex
.pr-u-onlyPrintDisplayInline
.pr-u-onlyPrintDisplayGrid
.pr-u-onlyPrintDisplayFlex
.pr-u-onlyPrintDisplayBlock
```

# Positionnement

## Block

Change l'alignement des contenus de type block.

[Float](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-float--float)

Vous pouvez stopper le float en utilisant un utilitaire clear :

```css
.pr-u-clear
.pr-u-clearRight
.pr-u-clearLeft
.pr-u-clearInlineStart
.pr-u-clearInlineEnd
```

`<div class="pr-u-clear"></div>`

## Inline

Change l'alignement des contenus de type inline.

[Vertical Align](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-verticalalign--vertical-align)

## Vertical

Change l'alignement vertical de certains contenus 

```css
.pr-u-verticalAlignMiddle
.pr-u-verticalAlignTop
.pr-u-verticalAlignBottom
.pr-u-verticalAlignTextTop
.pr-u-verticalAlignTextBottom
.pr-u-verticalAlignBaseline
.pr-u-verticalAlignSub
.pr-u-verticalAlignSuper
```

## Position

```css
.pr-u-positionAbsolute
.pr-u-positionRelative
.pr-u-positionStatic
.pr-u-positionFixed
.pr-u-positionSticky
```

## Tailles

# Animations

Ajoute une animation lors de l'apparition de l'élément. Pour des animations plus complète, notamment avant la suppression d'un élément, consultez le module d'[animations Angular](https://prisme.lucca.io/94310e217/p/85c178-animations). 

```css
/* Fade */
.pr-u-animatedFadeIn
.pr-u-animatedFadeOut 

/* Slide */
.pr-u-animatedSlideInLeft
.pr-u-animatedSlideOutLeft
.pr-u-animatedSlideInBottom
.pr-u-animatedSlideOutBottom
.pr-u-animatedSlideInRight
.pr-u-animatedSlideOutRight
.pr-u-animatedSlideIn
.pr-u-animatedSlideInTop
.pr-u-animatedSlideOut
.pr-u-animatedSlideOutTop 

/* Scale */
.pr-u-animatedScaleInLeft
.pr-u-animatedScaleOutLeft
.pr-u-animatedScaleInBottom
.pr-u-animatedScaleOutBottom
.pr-u-animatedScaleInRight
.pr-u-animatedScaleOutRight
.pr-u-animatedScaleInTop
.pr-u-animatedScaleOutTop
.pr-u-animatedScaleIn
.pr-u-animatedScaleOut

/* Divers */
.pr-u-animatedShake
.pr-u-animatedPulse
```

# Reset

Réinitialise l’affichage des listes et des boutons.

[Reset](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-reset--reset)

# Divers

## White Space

Modifie la manière dont les retours à la ligne sont réalisés.

```css
.pr-u-whiteSpaceNowrap
.pr-u-whiteSpaceNormal
.pr-u-whiteSpacePreLine
```

## Spin

Retire les flèches incrémentales d'un input number.

[Spin](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-spin--spin)

## Aide

Permet de créer le style et l'espacement nécessaire aux icônes d'aide inline.

[Help](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-help--help)

## Pointer event

Active ou désactive la gestion des événements de la souris.

```css
.pr-u-pointerEventsNone
.pr-u-pointerEventsAuto
```

## Overflow

Permet de gérer le dépassement du contenu d'un élément dans son bloc.

```css
.pr-u-overflowHidden
.pr-u-overflowAuto
.pr-u-overflowVisible
.pr-u-overflowScroll
```

## Hauteur et largeur

Permet d'adapter la hauteur ou la largeur d'un élément.

```css
/* Largeur */
.pr-u-inlineSize100%
.pr-u-inlineSizeFitContent
.pr-u-minInlineSize0
.pr-u-maxInlineSize100%
.pr-u-maxInlineSizeFitContent

/* Hauteur */
.pr-u-blockSize100%
.pr-u-blockSizeFitContent
.pr-u-minBlockSize0
```

## Focus `v19.3`

Permet d'appliquer le style focus commun.

```css
.pr-u-focusVisible
```

## Data content

Permet d'ajouter du contenu généré par CSS au début ou à la fin d'un élément.

[Content](https://lucca-front.lucca.io/storybook/iframe.html?id=documentation-integration-utilities-content--content)

## Curseur

```css
.pr-u-cursorPointer
.pr-u-cursorAuto
.pr-u-cursorDefault
.pr-u-cursorText
```
