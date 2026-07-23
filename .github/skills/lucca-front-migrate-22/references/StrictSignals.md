# Modernisation LF — mode strict / readonly / signaux

En **usage standard** (bindings dans le template : `[input]="…"`, `(outputChange)="…"`, `#ref` juste pour le layout), la 22 est quasi transparente :

- **Signaux** : le template marche pareil, les outputs se souscrivent comme avant.
- **Readonly** : rien, tant qu'on ne mute pas ce qu'on passe en entrée.
- **Strict** : au pire `strictTemplates` signale un binding potentiellement `null` → un `@if` ou un `??` suffit.

Les schematics Angular officiels s'occupent du code du consommateur.

## Usage détourné — accès TS / refs / mutation

| Situation (avant) | À faire (22) |
|---|---|
| Lire une prop de composant en TS (`@ViewChild(Lu*)` → `ref.value`) | La prop est un signal : `ref.value()` avec parenthèses. Idem pour une template ref exportée (`#x="luX"` → `x.value()`, y compris dans le template). |
| Écrire un input par code (`ref.value = …`) | Interdit (input `readonly`) : passer par un `model()` / two-way, ou remonter l'état côté parent. |
| Récupérer une ref (`this.x`) | `viewChild()` renvoie un signal : `this.x()` (disponible après le 1er change detection). |
| Réagir à un changement d'input via `ngOnChanges` | Remplacer par `computed()` / `effect()`. |
| Muter un tableau/objet passé en entrée (`items.push()`, `.sort()` en place) | Ne compile plus (`ReadonlyArray`) : cloner (`[...items].sort()`) et gérer la source de vérité en amont. |

## Mode strict

Activer les flags **empilés, un à la fois** — jamais d'un bloc :

```
noImplicitAny → strictNullChecks → strictTemplates
```

Ils font ressortir les `any` implicites (`$event`, items non typés) et les accès potentiellement nuls sur les APIs LF. Retirer les `as any` qui « passaient » avant.

> C'est une problématique côté consommateur, pas directement liée à LF : l'aide ici est du diagnostic (comprendre l'erreur de compilation et proposer la correction), pas un codemod.

## Ordre des schematics Angular officiels

```
signal-input-migration → signal-queries-migration → output-migration → cleanup-unused-imports
```
