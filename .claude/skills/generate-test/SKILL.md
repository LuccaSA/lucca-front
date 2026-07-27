---
name: generate-test
description: 'Génère des tests unitaires `*.spec.ts` (Vitest + TestBed) pour un composant, une directive, un service, un pipe ou une fonction/utilitaire de Lucca Front, en respectant les conventions du repo.'
---

# Skill : generate-test

Génère un fichier `*.spec.ts` à côté de la cible (composant, directive, service, pipe, fonction utilitaire) en suivant les conventions de test du repository (Vitest + `@analogjs/vite-plugin-angular`, `happy-dom`, `TestBed`, APIs signal-based) et les bonnes pratiques d'[Angular](https://angular.dev/guide/testing).

Le but est de produire des tests **comportementaux** : privilégier ce que la cible garantit (valeur de retour, effet observable, contrat public). Tester un état ou une méthode « interne » est légitime quand c'est le point testable le plus direct — le repo le fait couramment (ex. `form-field.component.spec.ts` appelle `formField()?.isInputRequired()`, `title.service.spec.ts` s'abonne à `title$`). La vraie limite à ne pas franchir : se coupler à un **détail d'implémentation volatil** (ordre d'appels privés, structure DOM interne non contractuelle, propriété privée) qui casserait le test lors d'un refactor sans changement de comportement.

---

## Entrées attendues

Identifier avant de générer :

- **La cible** : fichier + symbole exporté à tester (`packages/ng/<entrypoint>/…` ou `packages/prisme/…`).
- **Son type** : fonction/utilitaire pure, pipe, service, directive, ou composant → détermine le pattern (voir plus bas).
- **Son contrat public** : inputs (`input()` / `input.required()`), outputs (`output()`), méthodes publiques, valeur de retour, effets de bord (HTTP, navigation, DOM, injection).
- **Les dépendances à fournir/mocker** : tokens d'injection, services, `LOCALE_ID`, `provideRouter`, `provideHttpClient`, translate services…
- **Les cas limites** : valeurs nulles/absentes, valeurs par défaut, états `disabled`/`required`/erreur, transitions d'état.

Si le contrat n'est pas clair, **lire le code source de la cible** avant d'écrire quoi que ce soit. Ne jamais inventer un input/output/méthode.

---

## Environnement de test (rappels)

- Runner : **Vitest**, globals activés → `describe` / `it` / `expect` / `beforeEach` sont globaux. `vi` s'importe explicitement : `import { vi } from 'vitest';`.
- Environnement DOM : **happy-dom**. Fuseau forcé à **UTC** (`TZ=UTC`) — pertinent pour tout test de date/heure.
- Convention de nommage du `describe` : préférer `describe(MaCible.name, () => { … })` (un plugin Vite réécrit `.name` pour la découverte statique des tests). `describe('MaCible', …)` reste accepté ; suivre le style du voisinage.
- Fichier nommé `<cible>.spec.ts`, **à côté** du fichier testé (pas de dossier `__tests__`).
- Structure d'un test : commenter en `// Arrange` / `// Act` / `// Assert` quand le test a plusieurs étapes (pattern utilisé dans le repo).

Lancer les tests générés :

```bash
npx vitest run packages/ng/<entrypoint>/<cible>.spec.ts
npx vitest run -t "nom du test"
```

Toujours exécuter le fichier généré et vérifier qu'il passe avant de conclure.

---

## Choisir le pattern selon le type de cible

### 1. Fonction / utilitaire pure

Pas de `TestBed`. Import direct, appel, assertion. Découper par fonction avec un `describe` imbriqué.

```typescript
import { selectionToQueryParams } from './select.utils';

describe('multi-select utils', () => {
	describe('selectionToQueryParams', () => {
		it('should return correct value when "include" selection', () => {
			// Act
			const result = selectionToQueryParams('id', { mode: 'include', values: [{ id: 12 }, { id: 13 }] }, (e) => e.id);
			// Assert
			expect(result).toEqual({ id: '12,13' });
		});
	});
});
```

Couvrir : cas nominal, chaque branche, cas limites (vide, null, valeurs par défaut).

### 2. Pipe

Un pipe pur/sans dépendance se teste en instanciant la classe directement :

```typescript
import { IntlParamsPipe } from './intl-params.pipe';

describe('IntlParamsPipe', () => {
	it('applies params properly', () => {
		const pipe = new IntlParamsPipe();
		expect(pipe.transform('Hello {{param}}', { param: 'World' })).toEqual('Hello World');
	});
});
```

Si le pipe dépend de l'injection (token, `LOCALE_ID`, provider), le tester **dans un template** via un host component (voir §5) et lire `nativeElement.textContent`. Modèle : `packages/ng/user/display/user-display.pipe.spec.ts` (utilise `TestBed.overrideComponent` pour injecter le template et des providers optionnels).

### 3. Service (sans HTTP)

`TestBed.configureTestingModule` avec les providers, puis `TestBed.inject`. Mocker les dépendances avec `useValue` + `vi.fn()`.

```typescript
import { TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

describe('MyService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MyService, { provide: DepToken, useValue: { doThing: vi.fn().mockReturnValue(42) } }],
		});
	});

	it('should delegate to its dependency', () => {
		// Act
		const result = TestBed.inject(MyService).compute();
		// Assert
		expect(result).toBe(42);
	});
});
```

Pour vérifier un appel : `expect(dep.doThing).toHaveBeenCalledExactlyOnceWith(…)`. Pour les valeurs asynchrones (Observables), soit `subscribe` + assertion, soit `await vi.waitFor(() => …)`. Modèle riche (routing, resolvers, tokens de traduction) : `packages/ng/title/title.service.spec.ts`.

### 4. Service avec HttpClient

Utiliser `provideHttpClient()` + `provideHttpClientTesting()` et piloter les réponses avec `HttpTestingController`.

```typescript
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

describe('MyApiService', () => {
	let service: MyApiService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [MyApiService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(MyApiService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => httpMock.verify()); // aucune requête en attente

	it('should GET items', () => {
		let result: Item[] | undefined;
		service.getItems().subscribe((r) => (result = r));

		const req = httpMock.expectOne('/api/items');
		expect(req.request.method).toBe('GET');
		req.flush([{ id: 1 }]);

		expect(result).toEqual([{ id: 1 }]);
	});
});
```

### 5. Composant

Le pattern canonique du repo est un **host component wrapper** qui pilote la cible via ses inputs et un template, puis on inspecte l'état ou le DOM. Pour les inputs signal, utiliser `fixture.componentRef.setInput('name', value)` — **jamais** en affectant la propriété directement.

```typescript
import { ChangeDetectionStrategy, Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MyComponent } from './my.component';

@Component({
	selector: 'lu-my-test',
	imports: [MyComponent],
	template: `<lu-my [label]="label" />`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class HostComponent {
	label = 'hello';
	cmp = viewChild.required(MyComponent);
}

describe(MyComponent.name, () => {
	let fixture: ComponentFixture<HostComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({ imports: [HostComponent] });
		fixture = TestBed.createComponent(HostComponent);
	});

	it('should render the label', () => {
		// Act
		fixture.detectChanges();
		// Assert
		expect((fixture.nativeElement as HTMLElement).textContent).toContain('hello');
	});

	it('should react to an input change', async () => {
		// Arrange
		fixture.detectChanges();
		// Act
		fixture.componentRef.setInput('label', 'world'); // si l'input est sur le host, réassigner puis detectChanges
		fixture.detectChanges();
		// Assert
		await vi.waitFor(() => expect((fixture.nativeElement as HTMLElement).textContent).toContain('world'));
	});
});
```

Pour un composant simple, un smoke test suffit à démarrer (voir `packages/ng/button/button.spec.ts`) :

```typescript
button = TestBed.createComponent(ButtonComponent).componentInstance;
expect(button).not.toBeUndefined();
```

Notes composant :

- Requêtes DOM : `(fixture.nativeElement as HTMLElement).querySelector('[data-testid="…"]')`, ou `fixture.debugElement.query(By.css(…))`. Préférer les sélecteurs de rôle/`data-testid` aux classes CSS internes.
- Après une mutation : `fixture.detectChanges()`. Pour l'asynchrone : `await fixture.whenStable()`, `await vi.waitFor(() => …)`, ou `fakeAsync` + `tick()` quand il faut contrôler le temps (timers, debounce). Modèle `fakeAsync` : `packages/ng/date2/date-input/date-input.component.spec.ts`.
- Formulaires : monter la cible avec un `FormControl` dans le host (`ReactiveFormsModule`) et asserter `formControl.value` / `formControl.errors` (voir `form-field.component.spec.ts`, `date-input.component.spec.ts`).
- Pour des scénarios orientés interaction/accessibilité, `@testing-library/angular` (`render`, `screen`, `userEvent`) et `jest-axe` (`axe`) sont disponibles (voir `packages/ng/api/api.spec.ts`).

### 6. Directive

Comme un composant : un host applique la directive, on pilote via inputs (`setInput`) et on vérifie l'effet sur le DOM ou le host. Modèle : `packages/ng/core/portal/portal.directive.spec.ts`.

---

## Workflow

1. **Lire la cible** et déterminer son type (§« Choisir le pattern »). Lister inputs/outputs/méthodes publiques et dépendances.
2. **Cartographier les cas de test** : cas nominal, chaque branche/variante, valeurs par défaut, cas limites (null/vide), transitions d'état, gestion d'erreur. Privilégier peu de tests ciblés et lisibles.
3. **Écrire le `*.spec.ts`** à côté de la cible avec le pattern adapté ; imports depuis les entrypoints publics (`@lucca-front/ng/<name>`) quand on croise un autre entrypoint, jamais en relatif inter-entrypoints.
4. **Exécuter** `npx vitest run <chemin>` et corriger jusqu'au vert.
5. **Relire** : chaque test a une intention claire, assertions explicites, aucun test d'implémentation privée, aucune fuite d'état entre tests.

---

## Règles

1. Un test = un comportement observable ; nom `it('should …')` décrivant l'attendu.
2. Assertions explicites (`toEqual`, `toBe`, `toBeNull`, `toHaveBeenCalledWith`, `toContain`…), jamais un simple `toBeTruthy` quand une valeur précise est attendue.
3. Inputs signal → `fixture.componentRef.setInput(...)`. Ne pas configurer le `TestBed` après `createComponent`.
4. Mocker les dépendances externes (HTTP, services Lucca, tokens) ; ne pas taper sur le réseau ni sur des I/O réelles.
5. Isolation : réinitialiser via `beforeEach` ; `httpMock.verify()` en `afterEach` pour les services HTTP.
6. Respecter le fuseau UTC pour les dates ; construire les dates de façon déterministe (`new Date('2024-01-01T00:00:00.000Z')`).
7. Réutiliser un spec voisin comme référence quand la cible ressemble à un composant déjà testé — cohérence avant originalité.
8. Ne pas éditer de traductions ni de code de production pour « faire passer » un test ; si la cible a un bug, le signaler plutôt que d'adapter l'assertion.
