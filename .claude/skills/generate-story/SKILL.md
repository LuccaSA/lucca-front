---
name: generate-story
description: 'Génère une story de documentation Angular (stories/documentation/) pour un composant ou une directive Lucca Front, avec argTypes catégorisés (inputs / outputs / models) et catégories dédiées par composant hôte.'
---

# generate-story

Génère une **story de documentation Angular** dans `stories/documentation/<catégorie>/<composant>/angular/<variante>.stories.ts`.

Hors périmètre : les tables QA (`stories/qa/`) → skill `generate-story-qa` ; les tests d'interaction `play` → skill `generate-e2e-test` ; les variantes `html&css/` (classes CSS pures, sans argTypes).

## 1. Cadrer la demande

Avant d'écrire, déterminer :

1. **Le ou les composants documentés** — souvent plusieurs : le composant métier et son hôte (`lu-text-input` + `lu-form-field`, `lu-simple-select` + `lu-form-field`…).
2. **La catégorie de doc** — dossier existant sous `stories/documentation/` : `actions`, `feedback`, `forms`, `integration`, `listings`, `loaders`, `navigation`, `overlays`, `structure`, `texts`, `toolbox`, `users`, `intl`. Ne pas créer une nouvelle catégorie sans le demander.
3. **La variante** — `Basic` par défaut. Une story par intention (`Basic`, `WithPrefixAndSuffix`, `PasswordVisibility`, `AI`…), pas une story par valeur d'input : les valeurs sont explorées via les Controls.
4. **S'il existe déjà une story** pour ce composant : dans ce cas la compléter plutôt que d'en créer une nouvelle.

Si la variante demandée est ambiguë ou si le composant n'a pas de dossier de doc évident, poser la question avant de générer.

## 2. Lire le contrat d'interface

Explorer `packages/ng/<composant>/` (ou `packages/prisme/<composant>/`) et relever :

- les `input()` / `input.required()` et `@Input()` publics, y compris hérités, leur nom public ou alias, leur type, leur valeur par défaut et leur JSDoc ;
 - les `output()` et `@Output()` publics, y compris hérités, ainsi que le **type émis** (`void` si `output()` sans générique) ;
- les `model()` (two-way) ;
- les constantes d'unions exportées (`FORM_FIELD_SIZE`, `PALETTE`, `INLINE_MESSAGE_STATE`…) : **les réutiliser** via `setStoryOptions()` au lieu de recopier les valeurs à la main ;
- les entrypoints d'import : toujours `@lucca-front/ng/<entrypoint>` ou `@lucca/prisme/<entrypoint>`, jamais un chemin relatif vers `packages/`.

Les descriptions des argTypes sont **en français** (c'est de la doc produit, lue par les designers et les devs produit) ; le code, les commentaires et les noms de story restent en anglais.

## 3. Catégoriser les argTypes (convention obligatoire)

Chaque argType porte un `table.category`. C'est ce qui regroupe les contrôles dans le panneau Controls de Storybook.

| Nature                                         | `table.category`                 | Complément                                                            |
| ---------------------------------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `input()` du composant principal               | `'inputs'`                       | —                                                                     |
| `output()` du composant principal              | `'outputs'`                      | `action: '<nom>'`, `control: false`, `table.type.summary` = type émis |
| `model()` du composant principal               | `'models'`                       | `control: false` si piloté dans le template, sinon garder un contrôle |
| `input()` d'un **autre** composant de la story | `'inputs (<selector-sans-lu->)'` | ex. `'inputs (form-field)'`                                           |
| `output()` d'un autre composant                | `'outputs (<nom>)'`              | idem                                                                  |

Règles :

- Le composant **principal** (celui que la story documente) garde les catégories nues `inputs` / `outputs` / `models`. Seuls les composants **secondaires** (wrapper, hôte) sont suffixés. Pour une story `TextField`, `placeholder` et `hasClearer` sont en `inputs`, `label` / `size` / `inlineMessage` en `inputs (form-field)`.
- `generateInputs()` n'émet que les args dont la catégorie **commence par `inputs`** (`stories/helpers/stories.ts`). Les catégories suffixées fonctionnent donc, mais `outputs` / `models` sont volontairement ignorées : elles se branchent à la main dans le template.
- Un argType qui porte un `table` **sans** `category` est aussi ignoré par `generateInputs()` — c'est le mécanisme de `HiddenArgType`. Ne pas mettre `table: { defaultValue }` sans y remettre `category: 'inputs'`.
- Un arg qui n'est pas une vraie API du composant (helper de story : `content`, `actions`, `showFooter`…) va dans une catégorie explicite `'story'` — et donc n'est pas émis par `generateInputs()`, il est consommé dans le `render`.

### Forme canonique d'un argType

```typescript
argTypes: {
	// input()
	neutral: {
		description: 'Applique un fond gris.',
		table: { category: 'inputs' },
	},
	// input() typé par une union exportée
	size: {
		description: 'Modifie la taille du champ.',
		options: setStoryOptions(FORM_FIELD_SIZE),
		control: { type: 'select' },
		table: { category: 'inputs (form-field)', defaultValue: { summary: 'M' } },
	},
	// output()
	killed: {
		description: 'Événement déclenché lorsque la box est fermée.',
		action: 'killed',
		// `output()` sans type émet `void` (aucune valeur).
		// Pour un `output<T>()`, reprendre `T` ici (ex. `'string'`, `'FileList'`…).
		table: { category: 'outputs', type: { summary: 'void' } },
		control: false,
	},
	// model()
	layout: {
		description: 'Disposition du champ. Two-way.',
		options: setStoryOptions(FORM_FIELD_LAYOUT),
		control: { type: 'select' },
		table: { category: 'models', type: { summary: 'FormFieldLayout' } },
	},
}
```

Autres options utiles :

- `if: { arg: 'removable', truthy: true }` pour masquer un contrôle dépendant d'un autre.
- `HiddenArgType` (`@/helpers/common-arg-types`) pour neutraliser, dans une story dérivée, un contrôle hérité du `meta`.
- `PaletteArgType` / `PaletteAllArgType` / `stateArgType` pour les argTypes récurrents.
- Préfixer la description d'un ajout récent par la version : `'[v20.3] Indique que…'`.

## 4. Structure du fichier

```typescript
import { FormsModule } from '@angular/forms';
import { BoxComponent } from '@lucca-front/ng/box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate, generateInputs } from '@/helpers/stories';

export default {
  title: 'Documentation/Structure/Box/Angular/Basic',
  decorators: [
    moduleMetadata({
      imports: [BoxComponent, FormsModule],
    }),
  ],
  argTypes: {/* cf. §3 */},
  render: ({ killed, ...args }, { argTypes }) => {
    return {
      props: {
        ...args,
        onKilled: () => killed?.(),
      },
      template: cleanupTemplate(`<lu-box ${generateInputs(args, argTypes)} (killed)="onKilled()">Lorem ipsum dolor sit amet</lu-box>`),
    };
  },
} as Meta;

export const Basic: StoryObj<BoxComponent> = {
  args: {
    neutral: false,
    killable: false,
  },
};
```

Règles de forme :

- `title: 'Documentation/<Catégorie>/<Composant>/Angular/<Variante>'` — chaque segment en Capitalized, espaces autorisés pour les noms composés (`'Callout Popover'`). Le titre doit refléter l'arborescence de fichiers.
- Le `meta` porte `decorators`, `argTypes` et le `render` commun ; chaque export nommé ne porte que ses `args` (et son `render` s'il diffère). Un `render` spécifique par story est acceptable quand le template change vraiment.
- `imports` du `moduleMetadata` : tous les composants/directives/modules du template. `BrowserAnimationsModule` (ou `applicationConfig({ providers: [provideAnimations()] })`) dès qu'il y a une animation/overlay ; `FormsModule` dès qu'il y a un `ngModel`.
- `applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] })` quand la story affiche du texte i18n ou des dates.
- `component: XComponent` sur le `meta` uniquement si on veut la table d'API compodoc en plus des argTypes.
- Template dans `cleanupTemplate(...)` (nettoie les lignes vides et les trous laissés par les attributs optionnels, pour l'intégration ZeroHeight). Indentation du template avec des tabs, comme du vrai code copiable-collable : la story est aussi un exemple d'usage.
- Pas de valeur en dur pour les styles inline d'une story : utiliser les tokens (`var(--pr-t-spacings-400)`). Les styles de mise en page de la story passent par `styles: [...]` dans le retour du `render`.

## 5. Générer le template

- **Inputs** → `generateInputs(args, argTypes)`. Ne jamais écrire les attributs à la main quand ils viennent d'un contrôle : `generateInputs` gère les booleanAttributes (`hasClearer` au lieu de `[hasClearer]="true"`) et omet les valeurs par défaut / vides, ce qui garde le code affiché minimal.
- **Multi-composants** → destructurer les args par hôte et appeler `generateInputs` une fois par hôte :

```typescript
render: (args, { argTypes }) => {
	const { label, tooltip, inlineMessage, inlineMessageState, size, ...inputArgs } = args;
	const model = useStoryModel('Example value');
	return {
		props: { model },
		template: cleanupTemplate(`<lu-form-field ${generateInputs({ label, tooltip, inlineMessage, inlineMessageState, size }, argTypes)}>
	<lu-text-input ${generateInputs(inputArgs, argTypes)} [(ngModel)]="model.example" />
</lu-form-field>
<pr-story-model-display>{{ model.example }}</pr-story-model-display>`),
	};
},
```

- **Outputs** → destructurer l’arg et exposer un handler dans `props`. Pour `output<void>()`, utiliser `onKilled: () => killed?.()` et `(killed)="onKilled()"`. Pour `output<T>()`, transmettre la valeur avec `onChanged: (value: T) => changed?.(value)` et `(changed)="onChanged($event)"`, afin que l’onglet Actions reçoive aussi le payload.
- **Two-way / `ngModel`** → `useStoryModel(valeurInitiale)` et bind `[(ngModel)]="model.example"` : le modèle survit à un changement de contrôle (sinon une valeur passée dans `props` est réinitialisée à chaque rerender). Si la valeur est elle-même pilotée par un contrôle, utiliser `useControlledStoryModel(args.maValeur)`.
- Afficher la valeur du modèle avec `<pr-story-model-display>{{ model.example }}</pr-story-model-display>` (`StoryModelDisplayComponent` de `@/helpers/story-model-display.component`) — c'est aussi le point d'ancrage des tests (`data-testid="pr-ng-model"`, helper `expectNgModelDisplay`).

## 6. `args` par défaut

- Renseigner un `args` pour **chaque** argType contrôlable, y compris les `false` : c'est ce qui rend le contrôle exploitable dans le panneau et qui fixe la valeur affichée dans le code source.
- Contenus d'exemple : `'Label'`, `'Placeholder'`, `'Helper text'`, `'Lorem ipsum dolor sit amet'`, `'Je suis un message d’aide'`. Texte en français, apostrophes typographiques (`’`).
- Pas de données réelles ni de PII. Les listes d'exemple existantes (légumes, users mock) sont réutilisables.

## 7. Vérifier

1. `npx prettier --write <fichier>` puis `npm run lint:es -- <fichier>`.
2. `npm start` et ouvrir la story : vérifier que **chaque** contrôle modifie bien le rendu et apparaît dans la bonne catégorie du panneau Controls, et que le code source affiché est copiable tel quel.
3. Onglet Actions : vérifier que chaque output émet.
4. Onglet Accessibility (`addon-a11y`) : aucune violation sur la story.
