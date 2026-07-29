# Modernisation LF — mode strict / readonly / signaux

En **usage standard** (bindings dans le template : `[input]="…"`, `(outputChange)="…"`, `#ref` juste pour le layout), la 22 est quasi transparente :

- **Signaux** : le template marche pareil, les outputs se souscrivent comme avant.
- **Readonly** : rien, tant qu'on ne mute pas ce qu'on passe en entrée.
- **Strict** : au pire `strictTemplates` signale un binding potentiellement `null` → un `@if` ou un `??` suffit.

Les schematics Angular officiels s'occupent du code du consommateur (ordre d'exécution : voir l'étape 1 du SKILL).

Ce fichier ne traite que la **mécanique signaux / readonly**. Pour la **nullabilité de l'API publique** (signatures élargies, changements de comportement, ordre d'activation des flags `strict`) → [Strict.md](./Strict.md).

## Usage détourné — accès TS / refs / mutation

| Situation (avant) | À faire (22) |
|---|---|
| Lire une prop de composant en TS (`@ViewChild(Lu*)` → `ref.value`) | La prop est un signal : `ref.value()` avec parenthèses. Idem pour un template ref exportée (`#x="luX"` → `x.value()`, y compris dans le template). |
| Écrire un input par code (`ref.value = …`) | Interdit (input `readonly`) : passer par un `model()` / two-way, ou remonter l'état côté parent. |
| Récupérer une ref (`this.x`) | `viewChild()` renvoie un signal : `this.x()` (disponible après le 1er change detection). |
| Réagir à un changement d'input via `ngOnChanges` | Remplacer par `computed()` / `effect()`. |
| Muter un tableau/objet passé en entrée (`items.push()`, `.sort()` en place) | Ne compile plus (`ReadonlyArray`) : cloner (`[...items].sort()`) et gérer la source de vérité en amont. |
