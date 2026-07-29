---
name: generate-e2e-test
description: 'Génère ou complète des tests Storybook (`play`) pour les stories Lucca Front.'
---

# Skill : generate-e2e-test

Génère des tests E2E Storybook en respectant les conventions du repository (`createTestStory`, `waitForAngular`, `step`, queries via `within`/`screen`).

Si aucune guideline n'est fournie, demander à l'utilisateur s'il souhaite en fournir une (lien Figma, documentation, texte libre) avant de générer la story, en précisant que cela permettra de couvrir les règles d'usage officielles et les cas limites. Si l'utilisateur confirme qu'il n'en a pas, se baser uniquement sur le contrat d'interface.

---

## Entrées attendues

Pour produire un test fiable, identifier :

- Le fichier de stories concerné et la story cible (ex. `Basic`, `States`, `WithPopover`).
- Le comportement attendu (état initial, interactions, résultat attendu).
- Les éléments potentiellement hors canvas (overlay CDK, popover, dialog, dropdown).
- Les helpers disponibles dans `stories/helpers/test.ts`.

---

## Workflow

### 1. Analyser la story source

- Réutiliser la story existante comme base (`createTestStory(Story, play)`).
- Vérifier les args et données nécessaires au scénario.

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

	```typescript
import { createTestStory } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { expect, userEvent, within } from 'storybook/test';

export const MyStoryTEST = createTestStory(MyStory, async ({ canvasElement, step }) => {
	// 1. Wait for Angular to stabilize
	await waitForAngular();

	const canvas = within(canvasElement);

	// 2. Use steps to organize interactions and assertions
	await step('Initial state check', async () => {
		const button = canvas.getByRole('button');
		await expect(button).toBeVisible();
	});

	await step('Interaction test', async () => {
		const button = canvas.getByRole('button');
		await userEvent.click(button);
		await waitForAngular(); // Wait after interactions if they trigger async changes
		// Add assertions here
	});
});
```

### Règles

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
