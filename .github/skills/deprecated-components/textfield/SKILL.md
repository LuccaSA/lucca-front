---
name: replace-deprecated-textfield
description: 'Migre le Deprecated Textfield vers le Textfield Angular moderne de Lucca Front, avec stratégie anti-régression.'
---

# textfield

Ce skill permet de migrer les anciens textfields (markup CSS legacy) vers la version Angular moderne basee sur `lu-form-field` + `lu-text-input`, en minimisant les regressions.

Le composant cible Angular est :
- `FormFieldComponent` depuis `@lucca-front/ng/form-field`
- `TextInputComponent` depuis `@lucca-front/ng/forms`

---

## Objectif

1. Detecter les textfields legacy dans les templates Angular (`.html` et templates inline TS).
2. Migrer automatiquement les cas simples vers `lu-form-field` + `lu-text-input`.
3. Isoler les cas complexes necessitant une intervention humaine.
4. Verifier la non-regression fonctionnelle (binding, validation, accessibilite, UX).

---

## Etape 1 - Detection des usages deprecies

Chercher en priorite les patterns suivants :

### Pattern legacy principal

```html
<label class="textfield ...">
  <input class="textfield-input" ... />
  <span class="textfield-label">...</span>
</label>
```

### Variantes frequentes

- classes `textfield`, `textfield-input`, `textfield-label`, `textfield-messages`
- wrapper `<label class="textfield ...">` avec `input` texte natif
- usage de `formControlName`, `[formControl]`, `[(ngModel)]`, `placeholder`, `aria-required`
- pattern 2 : container legacy `div.textfield` avec composant custom interne (ex: `app-i18n-input`, `app-form-input-*`) et messages `textfield-messages`
- pattern 3 : variantes sans label visible (`mod-noLabel`) ou label masque (`.textfield-label.pr-u-mask`)
- pattern 4 : pattern hybride legacy + nouveau (ex: `lu-form-field` avec `[hiddenLabel]="true"` et `[label]="''"` + `label.textfield-label` externe)

### Cas a exclure de la migration automatique

- champs multiline (`textarea`)
- wrappers contenant une logique supplementaire (control flow, contenu additionnel complexe)

---

## Etape 2 - Migration manuelle guidee

Ne pas utiliser de schematic pour cette migration.

Appliquer directement les regles de transformation ci-dessous, fichier par fichier, pour conserver un controle fin et eviter les regressions.

---

## Etape 3 - Regles de transformation Angular

### 3.1 Template cible de reference

```html
<lu-form-field label="Mon label">
  <lu-text-input [placeholder]="placeholder" formControlName="name" />
</lu-form-field>
```

Preference : ne pas utiliser `ng-template` pour le label quand une chaine simple suffit.
Utiliser `ng-template` uniquement pour un label riche (ex: icone, contenu structure, tooltip complexe).

### 3.2 Mapping minimal sans regression

- `input[type="text"]` legacy -> `lu-text-input`
- `span.textfield-label` -> `label` de `lu-form-field` (chaine directe en priorite)
- si aucun label exploitable n'est disponible : utiliser `hiddenLabel` sur `lu-form-field` avec un label technique non vide
- `placeholder` -> conserver tel quel sur `lu-text-input`
- `formControlName` -> conserver sur `lu-text-input`
- `[formControl]` -> conserver sur `lu-text-input`
- `[(ngModel)]` -> conserver sur `lu-text-input`
- `type` (`text`, `email`, `password`, `url`) -> conserver
- `autocomplete` -> conserver
- `disabled` -> conserver

### 3.3 Couverture des patterns dominants 2, 3, 4

- pattern 2 (composant custom interne) :
	- migrer le composant interne vers un controle Angular LF equivalent quand possible (`lu-text-input`, `lu-number-input`, `lu-textarea-input`)
	- si non possible, conserver le composant interne mais remplacer le wrapper legacy `textfield` par `lu-form-field`
	- conserver strictement les bindings/evenements existants (`[(ngModel)]`, `formControlName`, `(ngModelChange)`, `(blur)`)
- pattern 3 (noLabel / label masque) :
	- si label masque (`.textfield-label.pr-u-mask`) existe, reutiliser son contenu comme `label` de `lu-form-field`
	- si `mod-noLabel`, migrer vers `hiddenLabel` avec un label technique non vide
- pattern 4 (hybride legacy + nouveau) :
	- supprimer les doublons de label et ne garder qu'une seule source de verite : `label` de `lu-form-field`
	- remplacer `[label]="''" [hiddenLabel]="true"` + label externe par `label="..." [hiddenLabel]="true`
	- retirer les `label.textfield-label` externes devenus redondants

### 3.4 Imports TypeScript

Ajouter si necessaire :

```ts
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
```

En standalone Angular, ajouter ces composants dans `imports` du composant.

### 3.5 Cas sans label visible

Quand le textfield legacy n'a pas de label exploitable, la migration reste possible :

```html
<lu-form-field label="Champ sans label visible" [hiddenLabel]="true">
	<lu-text-input [placeholder]="placeholder" formControlName="name" />
</lu-form-field>
```

Regles pour ce cas :
- ne jamais laisser `label` vide
- utiliser un texte de label technique pertinent pour l'accessibilite
- conserver le placeholder existant, mais ne pas s'en servir comme substitut de label
- si un label masque existe deja (`pr-u-mask`), le reutiliser en priorite comme label technique

---

## Etape 4 - Regles anti-regression

Toujours respecter les contraintes suivantes :

1. Ne jamais supprimer ou modifier la logique de formulaire existante (`FormControl`, `FormGroup`, validators, observables).
2. Ne pas changer les noms de controles (`formControlName`) ni les modeles (`ngModel`).
3. Conserver les attributs fonctionnels (`placeholder`, `type`, `autocomplete`, `disabled`, `readonly`, `name`, `id`).
4. Ne pas migrer automatiquement les `textarea` vers `lu-text-input`.
5. Si le label visuel est absent, activer `hiddenLabel` et renseigner un label technique non vide.
6. Conserver les messages d'erreur et d'aide :
	- si possible mapper vers `inlineMessage` / `errorInlineMessage` de `lu-form-field`
	- sinon laisser la structure existante et annoter le cas pour revue manuelle.
7. Si prefix/suffix legacy est complexe (icone custom, DOM conditionnel), ne pas forcer le mapping automatique.
8. Pour les composants custom internes (`app-i18n-input`, `app-form-input-*`), conserver la semantique de validation/evenements lors de la migration du wrapper.
9. Pour les labels masques (`pr-u-mask`), conserver l'intention accessibilite en la transferant dans `label` + `hiddenLabel` si necessaire.
10. Pour les patterns hybrides, supprimer les labels externes `textfield-label` apres migration pour eviter les divergences.

---

## Etape 5 - Cas complexes a traiter manuellement

Marquer comme manuel si l'un des points suivants est detecte :

- plusieurs noeuds enfants non triviaux dans le wrapper textfield
- presence de `@if`, `@for`, `@switch`, `@defer` au coeur du textfield legacy
- transformation ambiguë des messages d'etat/validation
- prefix/suffix iconographiques non standards
- composant custom interne dont l'equivalent LF n'est pas clairement etabli
- label resolu dynamiquement et non determinable statiquement

Annotation recommandee a ajouter a proximite du code :

```html
<!--
  IA replace-deprecated-textfield
  migration partielle : verification manuelle requise
-->
```

---

## Etape 6 - Validation obligatoire

Apres migration, executer ces controles :

1. Compilation TypeScript/Angular (`ng build` ou equivalent).
2. Verification lint (`npm run lint` si disponible).
3. Verification UX des formulaires impactes :
	- saisie clavier
	- focus
	- affichage erreur/inline message
	- clear/search/password visibility si utilises
4. Verification reactive forms et template-driven forms sur les vues migrées.

---

## Format de reporting attendu

Produire un rapport en 3 sections :

1. Migrations automatiques
	- liste des fichiers modifies
	- nombre de textfields migrés

2. Migrations partielles
	- fichiers impactes
	- decisions prises pour eviter les regressions

3. Migrations manuelles restantes
	- fichier + raison du blocage
	- action recommandee
