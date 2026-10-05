---
name: generate-e2e-test
description: 'Génère ou complète des tests Storybook (`play`) dans stories/e2e/, en s’appuyant sur les stories de documentation existantes (stories/documentation/) sans les dupliquer.'
---

# Skill : generate-e2e-test

Génère des tests E2E Storybook en respectant les conventions du repository (`createTestStory`, `waitForAngular`, `step`, queries via `within`/`screen`).

## Périmètre

- Les tests e2e vivent **uniquement** dans `stories/e2e/`, avec un dossier par composant testé, sans catégorie ni `angular/` (`stories/e2e/<composant>/<fichier-de-doc>.stories.ts`). Titre `E2E/<Composant>` quand le composant n'a qu'un fichier, `E2E/<Composant>/<Variante>` s'il en a plusieurs (`E2E/Button/Basic`, `E2E/Button/Counter`…). Le composant est celui réellement testé : une story « field » de la doc (`forms/fields/text/`) va sous `text-input/`, `E2E/TextInput`.
- Un test se base **toujours sur une story de documentation existante** : le fichier e2e importe la méta et les stories du fichier de doc (`import meta, { Basic } from '@/stories/…'`) et les enveloppe avec `createTestStory`. On ne réécrit jamais une story (template, args, décorateurs) dans le fichier e2e : cela créerait un doublon qui divergerait de la doc.
- Si la story à tester n'existe pas encore dans la doc, la créer d'abord avec le skill `generate-story`, ou demander à l'utilisateur, plutôt que de la définir dans le fichier e2e. Seule exception : une variante dérivée d'une story de doc pour les besoins du test (args, spies), déclarée non exportée (voir « 1. Analyser la story source »).
- Ne jamais ajouter de `play` ni de story `*TEST` dans `stories/documentation/` ou `stories/qa/`.

Si aucune guideline n'est fournie, demander à l'utilisateur s'il souhaite en fournir une (lien Figma, documentation, texte libre) avant de générer la story, en précisant que cela permettra de couvrir les règles d'usage officielles et les cas limites. Si l'utilisateur confirme qu'il n'en a pas, se baser uniquement sur le contrat d'interface.

---

## Entrées attendues

Pour produire un test fiable, identifier :

- Le fichier de stories de documentation concerné et la story cible (ex. `Basic`, `States`, `WithPopover`).
- Le comportement attendu (état initial, interactions, résultat attendu).
- Les éléments potentiellement hors canvas (overlay CDK, popover, dialog, dropdown).
- Les helpers disponibles dans `stories/helpers/test.ts`.

---

## Workflow

### 1. Analyser la story source

- Réutiliser la story de documentation existante comme base (`createTestStory(Story, play)`) : ne jamais dupliquer une story pour la tester.
- Vérifier les args et données nécessaires au scénario.
- Si le scénario exige une configuration que la doc n'expose pas (args spécifiques, spies, variante désactivée…), dériver une variante **non exportée** dans le fichier e2e (`const DirectiveDisabled: StoryObj = { ...Directive, args: { ...Directive.args, disabled: true } }`) plutôt que d'ajouter une story à la doc.

### 1 bis. Localiser le fichier e2e

Les tests ne vivent **pas** dans `stories/documentation/` mais dans `stories/e2e/<composant>/`. Le fichier garde le nom du fichier de doc (le renommer seulement en cas de collision, ex. `simple-select-field.stories.ts`) :

| Documentation | E2E | Titre |
|---|---|---|
| `stories/documentation/actions/button/angular/button-basic.stories.ts` | `stories/e2e/button/button-basic.stories.ts` | `E2E/Button/Basic` |
| `stories/documentation/actions/button/angular/button-counter.stories.ts` | `stories/e2e/button/button-counter.stories.ts` | `E2E/Button/Counter` |
| `stories/documentation/forms/select/simple-select.stories.ts` | `stories/e2e/simple-select/simple-select.stories.ts` | `E2E/SimpleSelect/Basic` |
| `stories/documentation/forms/fields/simple-select/angular/simple-select.stories.ts` | `stories/e2e/simple-select/simple-select-field.stories.ts` | `E2E/SimpleSelect/Field` |
| `stories/documentation/overlays/modal/modal.stories.ts` | `stories/e2e/modal/modal.stories.ts` | `E2E/Modal` |

Quand un deuxième fichier arrive pour un composant qui n'en avait qu'un, passer le titre existant de `E2E/<Composant>` à `E2E/<Composant>/Basic`.

Si le fichier e2e existe déjà, y ajouter le test. Sinon le créer avec l'en-tête décrit dans « Structure type ».

### 2. Définir le scénario de test

- Couvrir au minimum :
  - rendu initial attendu ;
  - interaction souris principale (clic) ;
  - **interaction clavier équivalente** (tout composant interactif doit être testable au clavier) ;
  - assertion sur le résultat.
- Découper en étapes lisibles avec `step(...)`.

### 3. Implémenter le test

- Appeler `await waitForAngular()` au début.
- Utiliser `within(canvasElement)` pour les éléments dans la story.
- Utiliser `screen` pour les éléments rendus dans l’overlay global.
- Ajouter `await waitForAngular()` après chaque interaction pouvant déclencher une mise à jour asynchrone.

### 4. Vérifier la robustesse

- Préférer des assertions explicites (`toBeVisible`, `toHaveTextContent`, `toHaveAttribute`, etc.).
- Éviter les sélecteurs fragiles (sélecteurs CSS trop spécifiques, texte ambigu quand un rôle accessible existe).

---

## Format attendu

### Convention de nommage

- Le test d’une story `Basic` s’appelle `BasicTEST`.
- Le suffixe `TEST` est obligatoire.

### Structure type

Partir du fichier de référence **`stories/e2e/_sample/basic.stories.ts`** (titre `E2E/Sample`), qui est exécuté en CI comme les autres tests. Il montre :

- l'import de la méta (export par défaut) et des stories du fichier de documentation via l'alias `@/stories/*` (→ `stories/documentation/*`) ;
- la réexportation de la méta avec un titre `E2E/…` et le tag `!autodocs` (pas de page de doc pour les tests) ;
- une variante dérivée d'une story de doc, non exportée, pour un besoin propre au test ;
- un parcours partagé entre plusieurs tests ;
- des tests exportés via `createTestStory`, suffixés `TEST`, découpés en `step`.

Le sample se base sur une story de doc sans vrai composant : les interactions souris/clavier sont décrites dans « Interactions clavier » et « Patterns fréquents » ci-dessous.

### Règles

0. Les tests vont dans `stories/e2e/`, jamais dans `stories/documentation/`. Seuls les tests (`*TEST`) sont exportés du fichier e2e ; ne pas réexporter les stories de doc (elles seraient indexées deux fois). Pour partager une donnée de la doc (fixture, helper), ne pas l'exporter depuis le fichier de doc — tout export nommé d'un fichier CSF devient une story — mais la redéclarer dans le fichier e2e ou la sortir dans un fichier utilitaire sans suffixe `.stories`. Les types (`interface`, `type`) peuvent être exportés sans risque et importés avec `type`.

1. Toujours démarrer le `play` avec `await waitForAngular()`.
2. Toujours encapsuler les actions/attendus métier dans des `step` nommés.
3. Utiliser `within(canvasElement)` par défaut ; basculer sur `screen` uniquement pour les overlays globaux.
4. Ajouter `await waitForAngular()` après les interactions asynchrones (`click`, `keyboard`, sélection de date, etc.).
5. Réutiliser les helpers de `stories/helpers/test.ts` avant de créer une logique ad hoc.
6. Garder des assertions métier : tester le comportement utilisateur visible, pas l'implémentation interne.
7. **Tout composant interactif doit inclure un step clavier** en plus du step souris : au minimum l'ouverture/confirmation (`{Enter}` ou `{ArrowDown}`) et la fermeture (`{Escape}`).

---

## Interactions clavier

### Mettre le focus sur un élément

Utiliser `.focus()` directement sur l'élément DOM (pas via `userEvent`) pour positionner le focus avant une séquence clavier :

```typescript
const button = canvas.getByRole('button');
button.focus();
await expect(button).toHaveFocus();
```

### Touches courantes

| Touche | Usage |
|---|---|
| `{Enter}` | Confirmer, valider, ouvrir un overlay focalisé |
| `{Space}` | Activer un bouton, cocher une case |
| `{Escape}` | Fermer un overlay, annuler |
| `{ArrowDown}` / `{ArrowUp}` | Naviguer dans une liste, ouvrir un select |
| `{ArrowLeft}` / `{ArrowRight}` | Naviguer entre segments (timepicker, etc.) |
| `{Tab}` | Avancer le focus (via `userEvent.tab()`) |

### Tab pour déplacer le focus

```typescript
await userEvent.tab();
await expect(canvas.getByRole('textbox')).toHaveFocus();
```

### Naviguer dans une liste avec les flèches

```typescript
const input = canvas.getByRole('combobox');
input.focus();
await userEvent.keyboard('{ArrowDown}');
await waitForAngular();
await expect(screen.getByRole('listbox')).toBeVisible();
await userEvent.keyboard('{Enter}');
await waitForAngular();
```

### Répéter une touche plusieurs fois

Utiliser le helper `repeatKeyboardUserEvent` de `stories/helpers/test.ts` :

```typescript
import { repeatKeyboardUserEvent, waitForAngular } from '@/helpers/test';

await repeatKeyboardUserEvent('{ArrowUp}', 3);
await waitForAngular();
```

### Assertions d'accessibilité associées

Après une interaction clavier, vérifier les attributs ARIA reflétant l'état du composant :

```typescript
await expect(trigger).toHaveAttribute('aria-expanded', 'true');
await expect(option).toHaveAttribute('aria-selected', 'true');
await expect(trigger).toHaveFocus(); // le focus revient au déclencheur après fermeture
```

---

## Patterns fréquents

### Popover / Modal (overlay)

	```typescript
await step('Open popover', async () => {
	await userEvent.click(canvas.getByRole('button'));
	await waitForAngular();
	const popover = screen.getByRole('dialog');
	await expect(popover).toBeVisible();
});
```

### Interaction clavier

	```typescript
await step('Escape closes popover', async () => {
	await userEvent.keyboard('{Escape}');
	await waitForAngular();
	await expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

### Réutilisation d’un parcours commun

	```typescript
const commonPlay = async (context) => {
	// ...
};

export const BasicTEST = createTestStory(Basic, commonPlay);
export const VariantTEST = createTestStory(Variant, async (context) => {
	await commonPlay(context);
	// assertions spécifiques
});
```
