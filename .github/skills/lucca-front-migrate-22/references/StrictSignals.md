# Modernisation LF — signaux

En **usage standard** (bindings dans le template : `[input]="…"`, `(outputChange)="…"`, `#ref` juste pour le layout), la 22 est quasi transparente : le template marche pareil, les outputs se souscrivent comme avant.

Les schematics Angular officiels s'occupent du code du consommateur (ordre d'exécution : voir l'étape 1 du SKILL).

Ce fichier ne traite que la **mécanique signaux**. Voir aussi :

- **nullabilité de l'API publique** (signatures élargies, changements de comportement, flags `strict`) → [Strict.md](./Strict.md) ;
- **propriétés de classe non réassignables** (`readonly` hors signaux) → [Readonly.md](./Readonly.md).

## Usage détourné — accès TS / refs / mutation

| Situation (avant) | À faire (22) |
|---|---|
| Lire une prop de composant en TS (`@ViewChild(Lu*)` → `ref.value`) | La prop est un signal : `ref.value()` avec parenthèses. Idem pour un template ref exportée (`#x="luX"` → `x.value()`, y compris dans le template). |
| Écrire un input par code (`ref.value = …`) | Ne compile plus : un `InputSignal` ne s'assigne pas. Passer par un `model()` / two-way. |
| Récupérer une ref (`this.x`) | `viewChild()` renvoie un signal : `this.x()` (disponible après le 1er change detection). |
| Réagir à un changement d'input via `ngOnChanges` | Remplacer par `computed()` / `effect()`. |
| Muter un tableau/objet passé en entrée (`items.push()`, `.sort()` en place) | Ne compile plus (`ReadonlyArray`) : cloner (`[...items].sort()`) et gérer la source de vérité en amont. |
