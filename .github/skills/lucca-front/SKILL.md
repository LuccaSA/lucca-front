---
name: lucca-front
description: >
  Design system Lucca Front / Prisme (Angular) : renvoie vers la documentation livrée avec la version installée
  de @lucca-front/ng (node_modules/@lucca-front/ng/llms.txt) — API et exemples des composants, dépréciations,
  changelog, tokens CSS, guidelines de design et de rédaction. À charger avant d'écrire ou de modifier un template,
  un composant ou du SCSS dans un projet qui dépend de @lucca-front/ng ou @lucca-front/scss, ou dès qu'un fichier
  contient des sélecteurs lu-*, des classes pr-* ou des directives lu (luButton, luTooltip, luForm), même si la
  demande ne nomme ni Lucca Front ni le composant (« avec le composant du design system », « comme ailleurs dans
  l'app »). L'API change à chaque mineure : ne t'appuie jamais sur ta mémoire. Pas pour @lucca/cdk, qui a sa
  propre skill.
---

# Design System Prisme — Lucca Front

Avant d'écrire ou de modifier du code qui touche `lu-*`, `luX` ou `pr-*`, lis la documentation du composant **à la
version installée**. Ce que tu sais de Lucca Front date d'une autre version : d'une mineure à l'autre, des inputs sont
dépréciés ou renommés et des composants apparaissent, et du code écrit de mémoire compile souvent tout en utilisant
l'ancienne forme.

## Où lire

Chaque version de `@lucca-front/ng` embarque sa documentation pour les LLM, alignée sur le code installé :

1. Trouve le `node_modules/@lucca-front/ng/` le plus proche en remontant depuis le fichier édité (souvent sous
   `front/` ; dans un workspace, il peut être hissé à la racine).
2. Lis `llms.txt` : c'est l'index des composants et de la documentation transverse.
3. Pour chaque composant utilisé, lis `llms/references/components/<slug>/<slug>.md` (API, dépréciations, section
   `## Changelog`) et `<slug>.component.md` (exemples) avant d'écrire le template : c'est dans le changelog
   qu'apparaissent les inputs ajoutés ou dépréciés depuis la version que tu connais.

Pour le design, les tokens CSS ou la rédaction, `llms/SKILL.md` dit quoi lire selon la tâche (son tableau « Quand
consulter quoi ») ; pour du code de composant, l'index et les pages du composant suffisent.

## Choisir le composant

L'index ne donne que des noms de dossier, et plusieurs composants peuvent répondre au même besoin (`callout` et
`inlinemessage` affichent tous deux un message de statut, par exemple). Quand plus d'un candidat convient, ouvre la
page API de chacun avant de choisir : la description des inputs dit à quoi sert le composant, son nom ne le dit pas.

## Comment lire

Ouvre les fichiers par leur chemin absolu avec l'outil Read, plutôt qu'avec `cd … && cat`. Une commande composée qui
change de répertoire demande une approbation : refusée d'office en mode non interactif, elle interrompt l'utilisateur
en mode interactif, et dans les deux cas elle coûte un tour pour rien.

## Si `llms.txt` est absent

Le package installé est antérieur à la documentation embarquée, ou n'est pas installé :

1. Prends la version de `@lucca-front/ng` dans `node_modules/@lucca-front/ng/package.json`, à défaut dans le lockfile,
   à défaut dans `package.json` (et dis alors qu'elle est déclarée, pas installée).
2. Lis la documentation déployée de cette version : `https://lucca-front.lucca.io/v<version>/storybook/llms.txt`.
3. Si elle n'existe pas, les types du package (`node_modules/@lucca-front/ng/**/*.d.ts`) font foi pour les inputs ; ne
   complète pas avec ta mémoire.
