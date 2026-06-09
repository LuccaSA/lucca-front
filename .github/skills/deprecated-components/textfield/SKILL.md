---
name: textfield
description: 'Migre le Deprecated Textfield vers le Textfield Angular moderne de Lucca Front, avec stratégie anti-régression.'
---

# textfield

Ce skill migre les anciens textfields (markup CSS legacy) vers les composants Angular modernes Lucca Front, en minimisant les regressions.

Le composant cible Angular est :
- `FormFieldComponent` depuis `@lucca-front/ng/form-field`
- `TextInputComponent` depuis `@lucca-front/ng/forms`
- `NumberInputComponent` depuis `@lucca-front/ng/forms` (pour les champs numeriques)

---

## Objectif

1. Detecter les textfields legacy dans les templates Angular (`.html` et templates inline TS).
2. Migrer automatiquement uniquement les cas simples.
3. Isoler les cas complexes necessitant une intervention humaine.
4. Verifier la non-regression fonctionnelle (binding, validation, accessibilite, UX).

---

## Principes directeurs

- Ne pas utiliser de schematic pour cette migration.
- Migrer fichier par fichier avec un controle fin.
- Ne jamais migrer automatiquement un cas ambigu ou complexe.
- Si un cas est complexe : ne pas modifier le code, annoter et classer en manuel.

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
- wrapper `<label class="textfield ...">` avec `input[type="number"]`
- usage de `formControlName`, `[formControl]`, `[(ngModel)]`, `placeholder`, `aria-required`
- pattern 2 : container legacy `div.textfield` avec composant custom interne (ex: `app-i18n-input`, `app-form-input-*`) et messages `textfield-messages`
- pattern 3 : variantes sans label visible (`mod-noLabel`) ou label masque (`.textfield-label.pr-u-mask`)
- pattern 4 : pattern hybride legacy + nouveau (ex: `lu-form-field` avec `hiddenLabel` et `[label]="''"` + `label.textfield-label` externe)

### Cas a exclure de la migration automatique

- champs multiline (`textarea`)
- wrappers `textfield` contenant un `select` (natif ou composant de selection, incluant `simple-select`, `lu-select`, `multi-select`)
- wrappers `textfield` contenant un selecteur de date (ex: `lu-date-input`, `lu-date-range-input`, `input[type="date"]`, composants date custom)
- wrappers contenant une logique supplementaire (control flow, contenu additionnel complexe)

---

## Etape 2 - Migration manuelle guidee

Appliquer directement les regles de transformation ci-dessous, fichier par fichier, pour conserver un controle fin et eviter les regressions.

---

## Etape 3 - Regles de transformation Angular

### 3.1 Template cible de reference

Cas texte :

```html
<lu-form-field label="Mon label">
  <lu-text-input [placeholder]="placeholder" formControlName="name" />
</lu-form-field>
```

Cas numerique :

```html
<lu-form-field label="Montant">
	<lu-number-input formControlName="amount" [min]="0" [step]="1" />
</lu-form-field>
```

Preference : ne pas utiliser `ng-template` pour le label quand une chaine simple suffit.
Utiliser `ng-template` uniquement pour un label riche (ex: icone, contenu structure, tooltip complexe).

### 3.2 Mapping minimal sans regression

- `input[type="text"]` legacy -> `lu-text-input`
- `input[type="number"]` legacy -> `lu-number-input`
- `span.textfield-label` -> `label` de `lu-form-field` (chaine directe en priorite)
- si aucun label exploitable n'est disponible : utiliser `hiddenLabel` sur `lu-form-field` avec un label technique non vide
- `placeholder` -> conserver tel quel sur le controle cible
- `formControlName` -> conserver sur le controle cible
- `[formControl]` -> conserver sur le controle cible
- `[(ngModel)]` -> conserver sur le controle cible
- `type` (`text`, `email`, `password`, `url`) -> conserver
- `autocomplete` -> conserver
- `disabled` -> conserver
- pour les champs `type="number"`, conserver aussi `min`, `max`, `step` et les bindings associes (si `inputmode` est present et important, classer le cas en migration manuelle : `lu-number-input` ne l’expose pas)
- en cas de classe legacy `mod-search`, utiliser `hasSearchIcon` sur `lu-text-input`
- en cas de classe legacy `mod-compact`, ne pas migrer automatiquement le style ; proposer une migration optionnelle et prevenir explicitement que le rendu UI sera different si l'utilisateur accepte
- lors du remplacement d'un wrapper legacy `textfield`, supprimer la classe `mod-block`,sans ajouter de classe utilitaire de remplacement
- lors du remplacement d'un wrapper legacy `textfield`, supprimer la classe `mod-outlined`
- lors du remplacement d'un wrapper legacy `textfield`, supprimer la classe `palette-neutral`
- lors du remplacement d'un wrapper legacy `textfield`, supprimer la classe `mod-white`

#### 3.2.1 Correspondance width : Deprecated textfield -> `lu-form-field`

Les largeurs legacy textfield sont definies en `rem`.
Les largeurs `lu-form-field` sont discretes via `width` (`20`, `30`, `40`, `50`, `60`) et correspondent a :
- `20` -> `10rem`
- `30` -> `15rem`
- `40` -> `20rem`
- `50` -> `25rem`
- `60` -> `30rem`

Table de migration recommandee (valeur la plus proche visuellement) :

| Deprecated textfield | Largeur legacy | `lu-form-field` `width` | Largeur cible |
| --- | --- | --- | --- |
| `mod-shortest` | `3rem` | `20` | `10rem` |
| `mod-shorter` | `6rem` | `20` | `10rem` |
| `mod-short` | `9rem` | `20` | `10rem` |
| `mod-standard` / `mod-default` | `13rem` | `30` | `15rem` |
| `mod-long` | `17rem` | `30` | `15rem` |
| `mod-longer` | `22rem` | `40` | `20rem` |
| `mod-longest` | `28rem` | `60` | `30rem` |

Regles pratiques :
- supprimer les classes legacy de width (`mod-shortest`, `mod-shorter`, `mod-short`, `mod-standard`, `mod-default`, `mod-long`, `mod-longer`, `mod-longest`) apres migration
- porter la largeur sur `lu-form-field` via l'input `width` (ex: `<lu-form-field width="30" ...>`)

Cas particulier `mod-compact` :
- detecter la presence de `mod-compact` et ouvrir une decision explicite avec l'utilisateur
- proposer 2 options :
	- option A (recommandee anti-regression visuelle) : conserver le markup legacy pour ce champ et annoter en migration manuelle
	- option B (migration acceptee) : migrer vers `lu-form-field` + controle LF en supprimant `mod-compact`
- avant d'appliquer l'option B, afficher un avertissement clair : "Le rendu visuel sera different apres suppression de `mod-compact`"

#### 3.2.2 Cas des textfields de type number

Pour les champs numeriques, tenir compte des references Prisme suivantes :
- https://prisme.lucca.io/94310e217/p/459eda-textfield/b/284b5f
- https://prisme.lucca.io/94310e217/p/459eda-textfield/b/394429

Regles de migration pour `type="number"` :
- migrer vers `lu-number-input` (et non `lu-text-input`)
- conserver les contraintes numeriques : `min`, `max`, `step`
- conserver les bindings/attributs fonctionnels (`formControlName`, `[formControl]`, `[(ngModel)]`, `disabled`, `readonly`, `name`, `id`)
- conserver la logique de validation existante (messages, etat invalide, required)
- en cas d'ambiguite fonctionnelle par rapport aux variantes Prisme ci-dessus, ne pas migrer automatiquement et classer le cas en manuel

#### 3.2.3 Cas des textfields de type textarea

Pour les champs multiline, tenir compte de la reference Prisme suivante :
- https://prisme.lucca.io/94310e217/p/60990a-textarea/b/65eb4b

Regles de migration pour `textarea` :
- ne jamais migrer un `textarea` vers `lu-text-input`
- utiliser `lu-textarea-input` quand la migration est validee manuellement
- conserver les attributs et bindings utiles (`formControlName`, `[formControl]`, `[(ngModel)]`, `placeholder`, `rows`, `maxlength`, `disabled`, `readonly`, `name`, `id`)
- conserver la logique de validation existante (messages, etat invalide, required)
- en cas d'ambiguite fonctionnelle (auto-resize, comportement specifique non couvert, prefix/suffix complexe), classer le cas en migration manuelle

### 3.3 Couverture des patterns dominants 2, 3, 4

- pattern 2 (composant custom interne) :
	- si le composant interne est un selecteur (`select`, `simple-select`, `lu-select`, `multi-select`) ou un selecteur de date, ne pas migrer et classer en manuel
	- migrer le composant interne vers un controle Angular LF equivalent quand possible (`lu-text-input`, `lu-number-input`, `lu-textarea-input`)
	- si non possible, conserver le composant interne mais remplacer le wrapper legacy `textfield` par `lu-form-field`
	- en cas de classe legacy `mod-search`, ajouter `hasSearchIcon` sur le `lu-text-input` migre
	- supprimer `mod-block` du wrapper legacy lors de la migration
	- supprimer `mod-outlined` du wrapper legacy lors de la migration
	- supprimer `palette-neutral` du wrapper legacy lors de la migration
	- supprimer `mod-white` du wrapper legacy lors de la migration
	- conserver strictement les bindings/evenements existants (`[(ngModel)]`, `formControlName`, `(ngModelChange)`, `(blur)`)
- pattern 3 (noLabel / label masque) :
	- si label masque (`.textfield-label.pr-u-mask`) existe, reutiliser son contenu comme `label` de `lu-form-field`
	- si `mod-noLabel`, migrer vers `hiddenLabel` avec un label technique non vide
- pattern 4 (hybride legacy + nouveau) :
	- supprimer les doublons de label et ne garder qu'une seule source de verite : `label` de `lu-form-field`
	- remplacer `[label]="''" hiddenLabel` + label externe par `label="..." hiddenLabel`
	- retirer les `label.textfield-label` externes devenus redondants

### 3.4 Imports TypeScript

Ajouter si necessaire :

```ts
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { NumberInputComponent, TextInputComponent, TextareaInputComponent } from '@lucca-front/ng/forms';
```

En standalone Angular, ajouter ces composants dans `imports` du composant.

### 3.5 Cas sans label visible

Quand le textfield legacy n'a pas de label exploitable, la migration reste possible :

```html
<lu-form-field label="Champ sans label visible" hiddenLabel>
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
4. Ne pas migrer automatiquement les `textarea` vers `lu-text-input` ; utiliser `lu-textarea-input` uniquement en migration validee.
5. Si le label visuel est absent, activer `hiddenLabel` et renseigner un label technique non vide.
6. Conserver les messages d'erreur et d'aide :
	- si possible mapper vers `inlineMessage` / `errorInlineMessage` de `lu-form-field`
	- sinon laisser la structure existante et annoter le cas pour revue manuelle.
7. Si prefix/suffix legacy est complexe (icone custom, DOM conditionnel), ne pas forcer le mapping automatique.
8. Pour les composants custom internes (`app-i18n-input`, `app-form-input-*`), conserver la semantique de validation/evenements lors de la migration du wrapper.
9. Pour les labels masques (`pr-u-mask`), conserver l'intention accessibilite en la transferant dans `label` + `hiddenLabel` si necessaire.
10. Pour les patterns hybrides, supprimer les labels externes `textfield-label` apres migration pour eviter les divergences.
11. Pour les champs legacy `mod-compact`, ne migrer vers le rendu moderne qu'apres validation explicite de l'utilisateur, avec avertissement sur le changement visuel.
12. Pour tout wrapper `textfield` contenant un selecteur (`select`, `simple-select`) un selecteur de date ou un selecteur angular de type `lu-*`, ne faire aucune modification automatique.
13. Pour tout cas complexe ou ambigu, ne pas transformer le markup : laisser le code tel quel et basculer en migration manuelle.

---

## Etape 5 - Cas complexes a traiter manuellement

Marquer comme manuel si l'un des points suivants est detecte :

- plusieurs noeuds enfants non triviaux dans le wrapper textfield
- presence de `@if`, `@for`, `@switch`, `@defer` au coeur du textfield legacy
- transformation ambiguë des messages d'etat/validation
- prefix/suffix iconographiques non standards
- composant custom interne dont l'equivalent LF n'est pas clairement etabli
- label resolu dynamiquement et non determinable statiquement
- champ legacy avec `mod-compact` non valide explicitement par l'utilisateur
- wrapper `textfield` contenant un `select` (natif ou composant de selection, incluant `simple-select`)
- wrapper `textfield` contenant un selecteur de date
- champ `type="number"` ambigu par rapport aux references Prisme `284b5f` et `394429`
- champ `textarea` ambigu par rapport a la reference Prisme `65eb4b`

Regle stricte pour ces cas :
- ne pas migrer automatiquement
- demander explicitement a l'utilisateur : "Ce cas est complexe ([raison courte]). Souhaitez-vous tenter la migration malgre tout, ou laisser ce code tel quel avec une annotation ?"
- si l'utilisateur repond non (ou ne sait pas) : laisser le code intact et ajouter uniquement l'annotation ci-dessous
- si l'utilisateur repond oui : tenter une migration au mieux en signalant clairement les points incertains, puis demander a l'utilisateur de verifier le resultat

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
4. Verification specifique des champs numeriques :
	- bornes `min`/`max`
	- pas `step`
	- comportement saisie/clavier
5. Verification specifique des champs multiline (`textarea`) :
	- comportement de saisie multi-ligne
	- `rows`/`maxlength`/`readonly`
	- affichage des messages d'erreur
6. Verification reactive forms et template-driven forms sur les vues migrees.

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
