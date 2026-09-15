---
title: Skip links
description: Skip links (Accès rapides) permet d'accéder aux contenus principaux plus rapidement lors d'une navigation clavier.
---

# Design et Angular

**Mots-clés**

liens d'évitement, accessibilité, a11y

## Design

En navigant uniquement au clavier, il est nécessaire de passer par chaque élément des différents menus avant d'arriver au contenu, ce qui peut parfois demander des dizaines d'actions. L'accès rapide permet de cibler plus rapidement chaque section générale avant d'accéder plus rapidement au contenu souhaité.

Le composant reste masqué visuellement tant qu'il n'a pas le focus : il n'apparaît qu'au premier `tab`, et disparaît dès que le focus le quitte. Il n'a donc aucun impact sur le rendu de l'interface pour un utilisateur à la souris.

<callout background="2">

ℹ️ Pour tester l'accès rapide, cliquez sur le coin supérieur gauche du composant ci-dessous, puis naviguez avec tab et entrée.

</callout>

[Basic](https://lucca-front.lucca.io/master/storybook/iframe.html?id=documentation-navigation-skiplinks-basic--basic)

## Mise en place

Le composant se déclare une seule fois, dans `app.component.html`, **avant** le menu principal et le menu secondaire. Il doit être le premier élément focusable de la page :

```html
<lu-skip-links />

<lu-app-layout>
  <!-- banner, navside, contenu… -->
</lu-app-layout>

```

### Sections cibles intégrées

Les trois liens intégrés s'appuient sur les identifiants suivants : 

| Lien | Identifiant attendu |
| --- | --- |
| Menu principal | `#lucca-banner-solutions-container` |
| Menu secondaire | `#navSide` |
| Contenu principal | `#main-content` (à ajouter manuellement si nécessaire) |

### Ajouter un accès rapide `v21.3`

La directive `luSkipLinkTarget` se pose sur l'élément à atteindre : le lien correspondant est alors ajouté automatiquement au composant SkipLinks. L'identifiant utilisé pour l'ancre est généré automatiquement si aucune valeur n'est passée à la directive.

L'input `luSkipLinkLabel` est obligatoire : il renseigne l'intitulé du lien affiché dans SkipLinks.

```html
<div luSkipLinkTarget luSkipLinkLabel="Aller au tableau des collaborateurs">…</div> 
```

# Changelog

## Skip links changelog

### 21.3.0

#### Added

- `[luSkipLinkTarget]` directive with the `luSkipLinkTarget` and `luSkipLinkLabel` inputs, to append skip links to the ones already declared on the component.

### 18.2.0

#### Changed

- Translations are now managed in Lokalise.
