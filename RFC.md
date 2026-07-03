# RFC — LuFormBuilder : formulaires 100 % TypeScript sur Angular Signal Forms

> Statut : proposition — Angular 22.0.5, signal forms **stables** (`@angular/forms/signals`).
> Périmètre : nouvelle secondary entry `@lucca-front/ng/form-builder`, ciblant exclusivement les briques nouvelle génération (`form-field`, `forms/*`, `simple-select`, `multi-select`, `core-select`, `date2`).
> **Hypothèse structurante : toutes les briques formulaire passent au contrat `FormValueControl<T>` / `FormCheckboxControl`** (chantier préalable, §4.4 et plan §10). Le chemin CVA / mirror control ne subsiste que pour la rétro-compat Reactive Forms / `ngModel`.

---

## 1. Contexte et objectifs

On veut pouvoir décrire un formulaire entier depuis le TS (à la formly), sans écrire le template répétitif `lu-form-field` + brique + bindings. Contraintes fortes :

1. **Se baser au maximum sur les API signal forms d'Angular 22** : `form()`, `schema()`, validators natifs (`required`, `email`, `validate`, `validateHttp`…), logique (`hidden`, `disabled`, `readonly`, `applyWhen`, `applyEach`), `submit()`, directive `FormField`. Le builder n'invente **aucun** système de validation, d'état ou de soumission.
2. **Construire sur les briques existantes** : le builder instancie les vrais composants (`TextInputComponent`, `LuSimpleSelectInputComponent`, …) enveloppés dans le vrai `FormFieldComponent`. Zéro composant de rendu parallèle.
3. **Ne pas cacher les inputs/outputs** : la surface de configuration d'un champ EST la surface du composant (typée, dérivée de la classe). Pas de vocabulaire intermédiaire (`props.minLength` à la formly).
4. **Pouvoir accrocher des directives** : les selects sont pilotés par des directives attributs (`apiV4`, `users`, `departments`, `establishments`, `legalUnits`, `jobQualifications`, `occupationCategories`, `withSelectAll`, `totalCount`, `noClue`…). Le builder doit permettre d'attacher n'importe quelle directive, avec ses inputs/outputs typés.

Non-objectifs :

- Pas de config sérialisable JSON (les définitions contiennent des fonctions et des `Type<…>`). Si un besoin "form depuis le back" émerge, ce sera une couche au-dessus.
- Pas de support des briques legacy (`@lucca-front/ng/input`, `select`, `option`, `date`) ni de `@ngx-formly` (l'intégration existante `@lucca-front/ng/formly` reste en l'état, dépréciable à terme).
- Pas de ciblage Reactive Forms : les briques gardent leur chemin `formControl`/`ngModel` pour l'existant (cf. §2.1), mais l'API publique du builder ne parle que signal forms.

---

## 2. État des lieux — sur quoi on construit

### 2.1 Les briques LF et leur contrat

- **`FormFieldComponent`** (`lu-form-field`) : label (`PortalContent` = `string | TemplateRef | Type`), tooltip, inline messages, taille, compteur… Il découvre son contrôle interne de deux façons :
  - **DI** : `InputDirective` (`[luInput]`, présent dans le template interne de chaque wrapper) injecte `FORM_FIELD_INSTANCE` et s'enregistre (`addInput`). **Fonctionne en création dynamique** (l'injecteur d'éléments est hiérarchique au runtime).
  - **Content queries** : `contentChildren(NgControl | RequiredValidator | FormField)` pour la détection required/invalid. **Ne fonctionne PAS en création dynamique** (les content queries sont résolues statiquement à la compilation du template hôte). → évolution nécessaire, cf. §4.4.
- **Wrappers `forms/*`, selects et `date2` — état cible (hypothèse de cette RFC)** : chaque brique implémente le contrat signal forms natif.
  - `lu-text-input`, `lu-textarea-input`, `lu-number-input`, `lu-date-input`, selects… → `FormValueControl<T>` : `value = model<T>(…)`, `touch = output<void>()` (émis au blur — rend `debounce('blur')` fonctionnel), et les inputs optionnels du contrat que la directive `FormField` alimente automatiquement : `disabled`, `readonly`, `errors`, `required`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `name`, `invalid`, `touched`. Méthodes optionnelles `focus()` / `reset()`.
  - `lu-checkbox-input`, `lu-switch-input` → `FormCheckboxControl` : `checked = model<boolean>(false)` (le contrat interdit d'avoir `value`).
  - `lu-radio-group-input` → `FormValueControl<T>` porté par le **groupe** (les `lu-radio` enfants restent des présentateurs).
  - Types de valeur exacts par brique : `FormValueControl<string>` pour text/textarea, `<number | null>` pour number, `<Date | null>` pour date, `<T | null>` pour simple-select, `<T[]>` pour multi-select.
- **Rétro-compat** : le chemin actuel (`NoopValueAccessorDirective` + `injectNgControl()` pour les wrappers, CVA direct pour selects/date2) est **conservé en parallèle** pour `formControl` / `formControlName` / `ngModel`. La directive `FormField` privilégie le contrat `FormValueControl` quand il est implémenté ; `generateMirrorControl()` (le pont signal forms actuel, `@experimental`) devient inutile et sera supprimé.
- **Selects** : options fournies par `[options]`, `[dataSource]`, les directives sources (liste ci-dessus) ou `*luOption` ; displayers via `[luDisplayer]` / `[luMultiDisplayer]` (templates → utilisables aussi en TS via les models `optionTpl`/`valueTpl`/`valuesTpl` qui acceptent un `Type<…>`).

### 2.2 Signal forms v22 — ce qu'on consomme

```ts
const model = signal<Employee>({ lastName: '', email: '', departmentId: null });
const employeeForm = form(
  model,
  (p) => {
    required(p.lastName);
    email(p.email);
    hidden(p.departmentId, ({ valueOf }) => valueOf(p.lastName) === '');
  },
  { submission: { action: async (f) => saveEmployee(f().value()) } },
);

employeeForm.email; // FieldTree<string> — nœud navigable
employeeForm.email(); // FieldState : value, errors(), touched(), required(), hidden(), disabled()…
```

Points exploités par le builder :

- `FieldTree` est **l'identifiant naturel d'un champ** : navigable, typé, porte tout l'état.
- `required()`, `min()`, `max()`, `minLength()`, `maxLength()`, `pattern()` sont des **metadata réactives auto-alimentées par les validators** → le `lu-form-field` peut afficher l'astérisque requis et les briques recevoir leurs contraintes sans re-déclaration.
- `hidden()` / `disabled()` / `readonly()` sont déclarés dans le schema → le renderer les applique (retrait du DOM, propagation disabled) sans API dédiée.
- `errors()` renvoie `{ kind, message?, fieldTree }` → mapping i18n centralisé possible (§4.5).
- `FormRoot` (`[formRoot]`) + `submit()` gèrent la soumission et les erreurs serveur.

### 2.3 Le chaînon manquant côté Angular core

Angular 22 permet la création dynamique **avec directives et bindings réactifs** — c'est ce qui rend le builder possible sans template intermédiaire ni `@switch` géant :

```ts
viewContainerRef.createComponent(LuMultiSelectInputComponent, {
  directives: [
    { type: FormField, bindings: [inputBinding('formField', () => this.field)] },
    { type: LuCoreSelectUsersDirective, bindings: [inputBinding('enableFormerEmployees', () => true)] },
  ],
  bindings: [inputBinding('placeholder', () => 'Choisir…'), outputBinding('panelOpened', () => this.trackOpen())],
});
```

- `inputBinding(name, () => value)` : binding **réactif** (la closure est réévaluée dans un contexte réactif → les signals dedans re-déclenchent le binding).
- `outputBinding(name, handler)`, `twoWayBinding(name, writableSignal)` pour les `model()`.
- `directives: (Type | DirectiveWithBindings)[]` : applique des directives explicitement, indépendamment de leur sélecteur — donc `apiV4`, `users`, etc. s'attachent en TS pur.

---

## 3. Principes de design

1. **Le schema signal forms est écrit par le consommateur, en API native.** Le builder ne wrappe jamais `required()`/`validate()`/`applyWhen()` derrière son propre vocabulaire (au pire il les _replace_ syntaxiquement, Design A).
2. **Un champ = (FieldTree, Type de brique, inputs typés, outputs typés, directives typées, options de wrapper).** Rien de plus. Tout ce que le composant sait faire est accessible.
3. **Le renderer est bête** : il instancie `lu-form-field` + brique + directives, branche `FormField`, lit `hidden()`. Toute l'intelligence (validation, conditionnels, arrays) vit dans signal forms.
4. **Échappatoires partout** : accès au `ComponentRef` créé, insertion de composants/templates arbitraires, rendu champ-par-champ possible hors renderer global.

---

## 4. Socle technique commun (identique quel que soit le design d'API retenu)

### 4.1 Typage passthrough des inputs/outputs

```ts
type UnwrapInput<T> =
  T extends InputSignalWithTransform<unknown, infer W>
    ? W
    : T extends InputSignal<infer V>
      ? V
      : T extends ModelSignal<infer V>
        ? V
        : never;

/** Valeur statique, ou fonction réactive (re-bindée quand ses signals changent). */
type BindableValue<T> = T | (() => T);

export type LuInputsOf<C> = {
  [K in keyof C as C[K] extends InputSignal<unknown> | InputSignalWithTransform<unknown, unknown> | ModelSignal<unknown>
    ? K
    : never]?: BindableValue<UnwrapInput<C[K]>>;
};

export type LuOutputsOf<C> = {
  [K in keyof C as C[K] extends OutputRef<unknown> ? K : never]?: (event: C[K] extends OutputRef<infer E> ? E : never) => void;
};

export type LuModelsOf<C> = {
  [K in keyof C as C[K] extends ModelSignal<unknown> ? K : never]?: WritableSignal<C[K] extends ModelSignal<infer V> ? V : never>;
};

/** Type de valeur d'une brique, dérivé du contrat signal forms — clef de voûte du typage du builder. */
export type LuValueOf<C> = C extends FormValueControl<infer V> ? V : C extends FormCheckboxControl ? boolean : never;
```

- `inputs.placeholder: 'Rechercher…'` → `inputBinding('placeholder', () => 'Rechercher…')`.
- `inputs.loading: () => this.isLoading()` → binding réactif.
- `models.calendarMode: this.calendarMode` (un `WritableSignal`) → `twoWayBinding`.
- Autocomplete et vérification de type **complètes** dans l'IDE : c'est littéralement la classe du composant qui est la source. Un input renommé côté brique = erreur de compilation côté consommateur. **C'est voulu** (pas de couche d'isolation → pas d'API cachée).

### 4.2 Attachement de directives

```ts
export interface LuDirectiveDef<D> {
  type: Type<D>;
  inputs?: LuInputsOf<D>;
  outputs?: LuOutputsOf<D>;
}

export function attach<D>(type: Type<D>, opts?: Omit<LuDirectiveDef<D>, 'type'>): LuDirectiveDef<D> {
  return { type, ...opts };
}
```

Exemple : `attach(LuCoreSelectApiV4Directive, { inputs: { apiV4: '/organization/structure/api/departments', sort: '+name' } })`.

Compilé en `DirectiveWithBindings` pour `createComponent`. La directive `FormField` d'Angular est toujours ajoutée en première position par le renderer (avec `inputBinding('formField', () => def.field)`), les directives utilisateur ensuite.

### 4.3 Moteur de rendu

Composant interne `LuFieldHostComponent` (un par champ), dont le template contient le **vrai** `lu-form-field` :

```html
@if (!fieldState().hidden()) {
 <lu-form-field
  [label]="def.label"
  [field]="def.field"                       <!-- nouvel input, cf. §4.4 -->
  [tooltip]="wrapper.tooltip ?? null"
  [size]="wrapper.size ?? null"
  [inlineMessage]="wrapper.inlineMessage ?? null" …>
  <ng-container #controlOutlet />
 </lu-form-field>
}
```

- La brique est créée dans `controlOutlet` (`ViewContainerRef.createComponent` + directives + bindings). L'injecteur d'éléments place la brique **sous** le `lu-form-field` → `InputDirective` s'enregistre via `FORM_FIELD_INSTANCE` comme aujourd'hui (id, aria-labelledby, aria-describedby : inchangés).
- `hidden()` : champ retiré du DOM (comportement signal forms : un champ hidden ne valide pas et ne compte pas dans la validité parent — cohérent).
- `disabled()`/`readonly()`/`required()`/`errors()` : propagés par la directive `FormField` via le contrat `FormValueControl` ; le builder n'a rien à faire.
- Le renderer public (`lu-form-renderer`) itère la liste de nœuds (champ, fieldset, row, custom) avec `@for (node of nodes; track node.id)`.
- Cleanup : destruction des `ComponentRef` à la destruction du host / au retrait conditionnel.
- `onRendered?: (ref: ComponentRef<C>) => void` sur chaque def : échappatoire pour les cas tordus (accès à l'instance, appel de méthodes publiques comme `focus`).

### 4.4 Évolutions requises des briques

1. **Migration `FormValueControl` / `FormCheckboxControl` de toutes les briques** — le prérequis (phase 1 du plan). Détail par famille :
   - **Wrappers `forms/*`** : ajout de `value = model<T>()` (`checked` pour checkbox/switch), `touch = output<void>()`, et des inputs optionnels du contrat (`disabled`, `readonly`, `errors`, `required`, `min`, `max`, `minLength`, `maxLength`, `pattern`…) branchés sur l'UI interne (attributs natifs, astérisques, états). Le template interne cesse de dépendre d'un `FormControl` miroir pour le chemin signal forms ; `injectNgControl()` + `NoopValueAccessorDirective` restent pour `formControl`/`ngModel`. Les deux chemins convergent vers les mêmes signals internes (`linkedSignal` sur la source active).
   - **Selects (`ALuSelectInputComponent`)** : le `value` getter/setter actuel devient `value = model<TValue>()` (le `valueSignal` interne existe déjà — c'est essentiellement une promotion d'API). `LuSimpleSelectInputComponent<T>` implémente `FormValueControl<T | null>`, `LuMultiSelectInputComponent<T>` implémente `FormValueControl<T[]>`. Les directives sources (`apiV4`, `users`, …) ne touchent pas au canal valeur → inchangées.
   - **`date2`** : `FormValueControl<Date | null>` (`DateRange` pour le range). Les erreurs de saisie côté contrôle (date non parsable) passent par le mécanisme signal forms dédié (`ParseResult`/`transformedValue` — à instruire en phase 1, cf. §11) au lieu de l'interface `Validator` actuelle ; `min`/`max` sont reçus du schema via les inputs du contrat (`minDate`/`maxDate` alimentent `field().min()`/`max()`).
   - **Radio group** : `FormValueControl<T>` sur le groupe ; les `lu-radio` restent des présentateurs pilotés par `RADIO_GROUP_INSTANCE`.
2. **`FormFieldComponent.field = input<FieldTree<unknown> | null>(null)`** — quand fourni :
   - `required` ← `field().required()` (metadata auto des validators) ;
   - invalid ← `field().invalid() && field().touched()` ;
   - erreurs ← `field().errors()` rendues automatiquement dans le `lu-inline-message` d'erreur (mapping messages §4.5), sauf si `errorInlineMessage` est fourni (priorité au consommateur).
     Remplace la détection par content queries, inopérante en dynamique. Utile aussi hors builder (usage template classique avec signal forms).

La rétro-compat est préservée (`formControl`/`ngModel`/content queries continuent de fonctionner) ; seul `generateMirrorControl()` disparaît, remplacé par le contrat natif.

### 4.5 Messages d'erreur et i18n

Signal forms fournit `{ kind, message? }`. Politique de résolution du message affiché, dans l'ordre :

1. `error.message` s'il est non vide (posé par le schema : `required(p.lastName, { message: '…' })` ou erreur custom `{ kind, message }`) ;
2. map locale du champ : `errorMessages: { [kind]: PortalContent | ((error) => string) }` dans la def ;
3. bundle global `LU_SIGNAL_FORM_ERROR_MESSAGES` (InjectionToken, pattern `getIntl`/`intlInputOptions` existant) fournissant les défauts traduits pour les kinds natifs (`required`, `email`, `min`, `max`, `minLength`, `maxLength`, `pattern`, `minDate`, `maxDate`) — surchargeables par app via provider.

Les erreurs serveur (retour de `submit()`) transitent par le même canal (`field().errors()`), rien de spécifique à faire.

---

## 5. Design A — « Config-first » (arbre de config adossé au modèle)

**Philosophie** : un seul objet décrit le formulaire ; le builder appelle `form()` pour toi et compile la partie validation. Le plus proche de formly.

### 5.1 API

```ts
function luForm<TModel>(model: WritableSignal<TModel>, config: LuFormConfig<TModel>): LuBuiltForm<TModel>;

interface LuFormConfig<TModel> {
  /** Schema signal forms natif, appliqué en plus des validate par champ (cross-field, applyWhen…). */
  schema?: SchemaFn<TModel>;
  fields: LuFieldsConfig<TModel>; // clés = clés du modèle (typé), récursif sur les objets
  layout?: LuLayoutNode<TModel>[]; // défaut : ordre de déclaration, un champ par ligne
  submission?: FormSubmitOptions<TModel>; // passé tel quel à form()
}

function luField<C extends FormValueControl<unknown> | FormCheckboxControl>(
  component: Type<C>,
  def: {
    label: PortalContent;
    /** Validation locale au champ, en API signal forms native. */
    validate?: (p: SchemaPath<LuValueOf<C>>) => void;
    inputs?: LuInputsOf<C>;
    outputs?: LuOutputsOf<C>;
    models?: LuModelsOf<C>;
    directives?: LuDirectiveDef<unknown>[];
    wrapper?: LuWrapperOptions; // tooltip, size, inlineMessage, hiddenLabel, width…
    errorMessages?: LuErrorMessages;
  },
): LuFieldConfig<C>;
// La clé du modèle doit porter un type assignable à LuValueOf<C> — vérifié par le type LuFieldsConfig<TModel>.

interface LuBuiltForm<TModel> {
  readonly form: FieldTree<TModel>; // le FieldTree natif — PAS caché
  readonly nodes: LuRenderNode[]; // consommé par <lu-form-renderer>
  submit(): Promise<boolean>; // délègue à submit(this.form)
}
```

### 5.2 Exemple complet

```ts
interface EmployeeModel {
  lastName: string;
  email: string;
  birthDate: Date | null;
  departmentId: number | null;
  managerIds: number[];
  contractType: 'cdi' | 'cdd' | null;
  remote: boolean;
}

@Component({
  selector: 'app-employee-form',
  imports: [LuFormRenderer, FormRoot, ButtonComponent],
  template: `
    <form luForm [formRoot]="ef.form">
      <lu-form-renderer [form]="ef" />
      <button luButton type="submit" [disabled]="ef.form().submitting()">Enregistrer</button>
    </form>
  `,
})
export class EmployeeFormComponent {
  readonly #api = inject(EmployeeApi);
  readonly model = signal<EmployeeModel>({
    lastName: '',
    email: '',
    birthDate: null,
    departmentId: null,
    managerIds: [],
    contractType: null,
    remote: false,
  });

  readonly ef = luForm(this.model, {
    // cross-field / conditionnel : API signal forms native, non wrappée
    schema: (p) => {
      hidden(p.managerIds, ({ valueOf }) => valueOf(p.departmentId) === null);
      applyWhen(
        p,
        ({ value }) => value().contractType === 'cdd',
        (pp) => {
          // …règles spécifiques CDD
        },
      );
    },
    fields: {
      lastName: luField(TextInputComponent, {
        label: 'Nom',
        validate: (p) => {
          required(p);
          maxLength(p, 100);
        },
        inputs: { placeholder: 'Dupont', hasClearer: true },
        outputs: { blur: () => this.trackBlur('lastName') },
      }),
      email: luField(TextInputComponent, {
        label: 'Email',
        validate: (p) => {
          required(p);
          email(p);
        },
        inputs: { type: 'email' },
        errorMessages: { email: 'Adresse invalide (ex : jean@lucca.fr)' },
      }),
      birthDate: luField(DateInputComponent, {
        label: 'Date de naissance',
        validate: (p) => maxDate(p, new Date()),
        inputs: { clearable: true },
      }),
      departmentId: luField(LuSimpleSelectInputComponent<LuDepartment>, {
        label: 'Département',
        validate: (p) => required(p),
        inputs: { clearable: true, placeholder: 'Choisir un département…' },
        directives: [attach(LuCoreSelectDepartmentsDirective)],
      }),
      managerIds: luField(LuMultiSelectInputComponent<LuUser>, {
        label: 'Managers',
        inputs: { keepSearchAfterSelection: true },
        directives: [
          attach(LuCoreSelectUsersDirective, { inputs: { enableFormerEmployees: false } }),
          attach(LuMultiSelectWithSelectAllDirective),
        ],
        outputs: { panelOpened: () => this.trackOpen('managers') },
      }),
      contractType: luField(RadioGroupInputComponent, {
        label: 'Contrat',
        validate: (p) => required(p),
        inputs: { framed: true },
        wrapper: { layout: 'fieldset' },
        // options de radio : cf. §9.4 (host interne @for → lu-radio)
        radioOptions: [
          { value: 'cdi', label: 'CDI' },
          { value: 'cdd', label: 'CDD' },
        ],
      }),
      remote: luField(SwitchInputComponent, { label: 'Télétravail' }),
    },
    layout: [
      luFieldset('Identité', ['lastName', 'email', 'birthDate']),
      luFieldset('Organisation', [luRow('departmentId', 'managerIds'), 'contractType', 'remote']),
    ],
    submission: {
      action: async (f) => {
        const res = await this.#api.save(f().value());
        return res.ok ? undefined : { kind: 'server', message: res.error };
      },
    },
  });
}
```

### 5.3 Analyse

| ✅                                                                                                      | ❌                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Une seule déclaration, lisible top-down, très proche de formly (migration mentale facile)               | `validate` par champ + `schema` global = **deux endroits** pour la validation ; la frontière (cross-field → schema) doit être apprise                                       |
| Le builder possède tout le cycle (il peut optimiser, générer le layout par défaut, dériver des stories) | `form()` est appelé par le builder → le `FieldTree` existe _après_ la config ; impossible de référencer `this.ef.form.email` _dans_ la config (d'où les clés string typées) |
| Clés du modèle vérifiées par le compilateur (`fields: { lastNam: … }` = erreur)                         | Champs non-feuilles (objets imbriqués) : la config devient récursive, le typage aussi — coût de maintenance du type `LuFieldsConfig`                                        |
| `layout` par références de clés = compact                                                               | Toute la souplesse "je mets ce que je veux où je veux" passe par des nœuds spéciaux (`luCustom`, `luTemplate`)                                                              |

**Verdict si retenu seul** : bonne DX de départ, mais le double canal de validation et la config récursive typée sont les points durs. La réponse ferme : viable, à condition d'assumer `validate` = sucre optionnel et de documenter "dès que c'est cross-field → `schema`".

---

## 6. Design B — « Signal-forms-first » (form natif + vue séparée)

**Philosophie** : le consommateur écrit `form()` **exactement comme la doc Angular**. Le builder n'est qu'une _vue_ : une liste ordonnée de champs, chacun pointant un `FieldTree`. Zéro recouvrement avec signal forms.

### 6.1 API

```ts
function luField<C extends FormValueControl<unknown> | FormCheckboxControl>(
  field: FieldTree<LuValueOf<C>>,
  component: Type<C>,
  def: {
    label: PortalContent;
    inputs?: LuInputsOf<C>;
    outputs?: LuOutputsOf<C>;
    models?: LuModelsOf<C>;
    directives?: LuDirectiveDef<unknown>[];
    wrapper?: LuWrapperOptions;
    errorMessages?: LuErrorMessages;
    onRendered?: (ref: ComponentRef<C>) => void;
  },
): LuFieldNode<C>;
// FieldTree<Date | null> + TextInputComponent (FormValueControl<string>) = erreur de compilation.

/** Nœuds de structure : mêmes briques de layout que Design A. */
function luFieldset(heading: PortalContent, children: LuRenderNode[], opts?: FieldsetOptions): LuRenderNode;
function luRow(...children: LuRenderNode[]): LuRenderNode;
function luCustom<C>(component: Type<C>, opts?: { inputs?: LuInputsOf<C>; outputs?: LuOutputsOf<C> }): LuRenderNode;
function luTemplate(tpl: TemplateRef<unknown>): LuRenderNode;
function luRepeat<T>(field: FieldTree<T[]>, item: (itemField: FieldTree<T>, index: Signal<number>) => LuRenderNode[]): LuRenderNode;

/** La vue : simple fonction (ré)évaluée réactivement — permet les listes dynamiques. */
function luFormView(nodes: LuRenderNode[] | (() => LuRenderNode[])): LuFormViewDef;
```

Template : `<lu-form-renderer [view]="view" />` — le renderer ne connaît pas le `form`, seulement des nœuds.

### 6.2 Exemple complet (même formulaire)

```ts
@Component({
  selector: 'app-employee-form',
  imports: [LuFormRenderer, FormRoot, ButtonComponent],
  template: `
    <form luForm [formRoot]="employeeForm">
      <lu-form-renderer [view]="view" />
      <button luButton type="submit" [disabled]="employeeForm().submitting()">Enregistrer</button>
    </form>
  `,
})
export class EmployeeFormComponent {
  readonly #api = inject(EmployeeApi);
  readonly model = signal<EmployeeModel>({
    /* … */
  });

  // ── 1. Le form : 100 % API Angular, rien de Lucca ─────────────────────────
  readonly employeeForm = form(
    this.model,
    (p) => {
      required(p.lastName);
      maxLength(p.lastName, 100);
      required(p.email);
      email(p.email);
      maxDate(p.birthDate, new Date());
      required(p.departmentId);
      required(p.contractType);
      hidden(p.managerIds, ({ valueOf }) => valueOf(p.departmentId) === null);
    },
    {
      submission: {
        action: async (f) => {
          const res = await this.#api.save(f().value());
          return res.ok ? undefined : { kind: 'server', message: res.error };
        },
      },
    },
  );

  // ── 2. La vue : liste de briques LF pointant les FieldTree ────────────────
  readonly view = luFormView([
    luFieldset('Identité', [
      luField(this.employeeForm.lastName, TextInputComponent, {
        label: 'Nom',
        inputs: { placeholder: 'Dupont', hasClearer: true },
        outputs: { blur: () => this.trackBlur('lastName') },
      }),
      luField(this.employeeForm.email, TextInputComponent, {
        label: 'Email',
        inputs: { type: 'email' },
        errorMessages: { email: 'Adresse invalide (ex : jean@lucca.fr)' },
      }),
      luField(this.employeeForm.birthDate, DateInputComponent, {
        label: 'Date de naissance',
        inputs: { clearable: true },
      }),
    ]),
    luFieldset('Organisation', [
      luRow(
        luField(this.employeeForm.departmentId, LuSimpleSelectInputComponent<LuDepartment>, {
          label: 'Département',
          inputs: { clearable: true, placeholder: 'Choisir un département…' },
          directives: [attach(LuCoreSelectDepartmentsDirective)],
        }),
        luField(this.employeeForm.managerIds, LuMultiSelectInputComponent<LuUser>, {
          label: 'Managers',
          inputs: { keepSearchAfterSelection: true },
          directives: [
            attach(LuCoreSelectUsersDirective, { inputs: { enableFormerEmployees: false } }),
            attach(LuMultiSelectWithSelectAllDirective),
          ],
        }),
      ),
      luRadioGroup(this.employeeForm.contractType, {
        label: 'Contrat',
        inputs: { framed: true },
        options: [
          { value: 'cdi', label: 'CDI' },
          { value: 'cdd', label: 'CDD' },
        ],
      }),
      luField(this.employeeForm.remote, SwitchInputComponent, { label: 'Télétravail' }),
    ]),
  ]);
}
```

À noter :

- Le conditionnel `hidden(p.managerIds, …)` est déclaré **dans le schema** ; le renderer retire simplement le champ du DOM quand `field().hidden()` est vrai. Pas d'API "condition" côté vue.
- `luFormView(() => [...])` (variante fonction) couvre les vues dont la **structure** dépend d'un signal (ex. champs générés depuis un référentiel chargé en `resource()`), avec diffing par `track` sur l'identité du `FieldTree`.

### 6.3 Analyse

| ✅                                                                                                                                             | ❌                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Zéro API de validation/état inventée** — la doc Angular s'applique mot pour mot, y compris les évolutions futures (on ne court pas derrière) | Deux blocs à écrire (schema + vue) ; l'ordre des champs est répété entre le modèle et la vue                                                                         |
| Le `FieldTree` est déjà là → autocomplete réel (`this.employeeForm.dep…`), refactoring safe, navigation IDE                                    | Un champ oublié dans la vue ne provoque pas d'erreur de compilation (mitigable : assertion dev-mode du renderer « fields du form non couverts par la vue », opt-out) |
| La vue est une simple liste → composable, découpable en fonctions privées, réutilisable (sous-vues partagées entre create/edit)                | Verbosité unitaire un peu plus élevée que A (le nom du champ apparaît deux fois : schema + vue)                                                                      |
| Renderer trivial (aucune compilation de config), surface de bug minimale                                                                       | —                                                                                                                                                                    |

**Verdict si retenu seul** : le plus aligné avec les contraintes (§1). La verbosité se traite par la couche C ci-dessous, pas en réintroduisant une config.

---

## 7. Design C — DSL par brique (couche sucre, compatible A et B)

**Philosophie** : des factories **par brique** qui fixent le composant et le type de valeur attendu. Les options gardent la même forme que `luField` (`inputs`/`wrapper`/`outputs` séparés, toujours dérivés des vrais inputs — pas de renommage ni d'aplatissement). Les directives s'attachent via des **features** (pattern `provideHttpClient(withInterceptors(…))`) exportées par l'entry de chaque directive — `form-builder` n'importe **aucune** directive. C'est une couche au-dessus du `luField` générique, jamais un remplacement : `luField` reste l'échappatoire universelle.

### 7.1 API (extraits)

```ts
// Options communes : même forme que luField (def sans le composant), jamais aplaties.
interface LuFieldOptions<C> {
  label: PortalContent;
  inputs?: LuInputsOf<C>;
  outputs?: LuOutputsOf<C>;
  models?: LuModelsOf<C>;
  wrapper?: LuWrapperOptions;
  errorMessages?: LuErrorMessages;
  onRendered?: (ref: ComponentRef<C>) => void;
}

// Chaque factory contraint le type du FieldTree accepté :
function luText(field: FieldTree<string>, opts: LuFieldOptions<TextInputComponent>): LuFieldNode;
function luNumber(field: FieldTree<number | null>, opts: LuFieldOptions<NumberInputComponent>): LuFieldNode;
function luCheckbox(field: FieldTree<boolean>, opts: LuFieldOptions<CheckboxInputComponent>): LuFieldNode;
function luSwitch(field: FieldTree<boolean>, opts: LuFieldOptions<SwitchInputComponent>): LuFieldNode;
function luDate(field: FieldTree<Date | null>, opts: LuFieldOptions<DateInputComponent>): LuFieldNode;
function luTextarea(field: FieldTree<string>, opts: LuFieldOptions<TextareaInputComponent>): LuFieldNode;
function luRadioGroup<T>(
  field: FieldTree<T>,
  opts: LuFieldOptions<RadioGroupInputComponent> & { options: LuRadioOption<T>[] },
): LuFieldNode;

// Selects : sources et comportements attachés par features (rest params)
function luSelect<T>(
  field: FieldTree<T | null>,
  opts: LuFieldOptions<LuSimpleSelectInputComponent<T>>,
  ...features: LuSelectFeature<T>[]
): LuFieldNode;
function luMultiSelect<T>(
  field: FieldTree<T[]>,
  opts: LuFieldOptions<LuMultiSelectInputComponent<T>>,
  ...features: LuMultiSelectFeature<T>[]
): LuFieldNode;

/** Une feature = un paquet de LuDirectiveDef pré-typés, rien d'autre. Défini dans form-builder. */
interface LuSelectFeature<T> {
  directives: LuDirectiveDef<unknown>[];
  /** phantom brand : rend T invariant (sinon LuSelectFeature<LuUser> serait assignable par covariance) */
  __value?: (v: T) => T;
}
interface LuMultiSelectFeature<T> extends LuSelectFeature<T> {
  __multi?: true;
}
```

Les features sont exportées par **l'entry de leur directive**, pas par `form-builder` :

```ts
// @lucca-front/ng/core-select/user
export function withUsers(opts?: LuInputsOf<LuCoreSelectUsersDirective>): LuSelectFeature<LuUser> {
  return { directives: [attach(LuCoreSelectUsersDirective, { inputs: opts })] };
}
// @lucca-front/ng/core-select/api
export function withApiV4<T>(url: BindableValue<string>, opts?: LuInputsOf<LuCoreSelectApiV4Directive>): LuSelectFeature<T>;
// @lucca-front/ng/multi-select
export function withSelectAll<T>(): LuMultiSelectFeature<T>;
export function withTotalCount<T>(): LuMultiSelectFeature<T>;
// idem withDepartments, withEstablishments, withLegalUnits, withJobQualifications, withOccupationCategories…
```

Conséquences structurelles :

- **Dépendance inversée** : `form-builder` ne dépend d'aucune entry core-select ; chaque directive dépend (types seulement) de `form-builder` pour `LuSelectFeature`. Une nouvelle directive livre sa feature dans sa propre entry — aucun fichier central à patcher.
- **Tree-shaking réel** : seules les features importées par l'app embarquent leur directive. Le builder chaînable (méthode par source sur une interface) aurait figé toutes les directives dans le bundle du builder.
- Une feature peut embarquer **plusieurs** directives ou pré-câbler des inputs (ex. `withUsers` pourrait aussi poser le displayer user par défaut) — impossible proprement avec des méthodes chaînées.
- Échappatoire inchangée : `attach()` accepté à côté des features (`luSelect(f, opts, withUsers(), attach(MaDirective, …))` — `LuDirectiveDef` est traité comme une feature à une directive).

### 7.2 Le même bloc « Organisation » avec la couche C

```ts
luFieldset('Organisation', [
 luRow(
  luSelect(this.employeeForm.departmentId, { label: 'Département', inputs: { clearable: true, placeholder: 'Choisir…' } },
   withDepartments(),
  ),
  luMultiSelect(this.employeeForm.managerIds, { label: 'Managers', inputs: { keepSearchAfterSelection: true } },
   withUsers({ enableFormerEmployees: false }),
   withSelectAll(),
  ),
 ),
 luRadioGroup(this.employeeForm.contractType, {
  label: 'Contrat',
  inputs: { framed: true },
  options: [{ value: 'cdi', label: 'CDI' }, { value: 'cdd', label: 'CDD' }],
 }),
 luSwitch(this.employeeForm.remote, { label: 'Télétravail' }),
]),
```

### 7.3 Typage

Toutes les briques implémentant `FormValueControl<T>`/`FormCheckboxControl`, le lien statique `FieldTree<V>` ↔ brique est porté par le contrat lui-même (`LuValueOf<C>`, §4.1) : le `luField` générique est **déjà** type-safe. Les factories C conservent la même garantie, avec des messages d'erreur plus directs (le type attendu est fixé par la factory, pas inféré) :

```ts
luText(this.employeeForm.birthDate, { label: '…' })
// ❌ erreur de compilation : FieldTree<Date | null> n'est pas assignable à FieldTree<string>

luSelect(this.employeeForm.managerIds, …)
// ❌ FieldTree<number[]> → il faut luMultiSelect

luMultiSelect(this.employeeForm.managerIds, { label: '…' }, withUsers())
// ❌ withUsers() est un LuSelectFeature<LuUser> : exige FieldTree<LuUser[]> (ou surcharge id-based si LF en fournit une)

luSelect(this.employeeForm.departmentId, { label: '…' }, withSelectAll())
// ❌ withSelectAll() est un LuMultiSelectFeature — refusé sur un simple select
```

### 7.4 Analyse

| ✅                                                                                                | ❌                                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Densité maximale ; features tree-shakables, zéro dépendance de `form-builder` vers les directives | Une factory par brique + une feature par directive à maintenir (mais triviales : ~10 lignes chacune, options = types dérivés)                                                               |
| Erreurs de type plus lisibles que le générique (type attendu fixé par la factory / la feature)    | Un cran plus verbeux qu'un objet aplati (`inputs: {…}` explicite) — assumé : zéro collision de noms brique/wrapper, et même forme d'options que `luField` (une seule grammaire à apprendre) |
| Purement additif : émet des `LuFieldNode` standards, mixable librement avec `luField` générique   | Découvrabilité moindre qu'un builder chaînable (pas de `.` qui liste les sources) — mitigée par la convention de nommage `withX` et l'export depuis l'entry déjà connue de la directive     |

---

## 8. Comparatif et recommandation

| Critère                                   | A (config-first)                                    | B (signal-forms-first)      | C (DSL briques)             |
| ----------------------------------------- | --------------------------------------------------- | --------------------------- | --------------------------- |
| Alignement signal forms                   | Moyen (validation replacée)                         | **Maximal**                 | = B (couche au-dessus)      |
| Rien de caché (inputs/outputs/directives) | Oui                                                 | Oui                         | Oui (types dérivés)         |
| Verbosité                                 | Faible                                              | Moyenne                     | **Minimale**                |
| Typage valeur↔brique                      | Oui (contrat)                                       | Oui (contrat)               | Oui (contrat + factories)   |
| Coût d'implémentation / maintenance       | Élevé (config récursive typée, compilation schema)  | **Faible**                  | Moyen (n factories simples) |
| Risque de divergence future avec Angular  | Réel (chaque nouveauté schema doit être re-exposée) | Nul                         | Nul                         |
| Champ oublié détecté à la compilation     | Oui (clés du modèle)                                | Non (assertion runtime dev) | Non (idem B)                |

**Recommandation : B comme socle + C comme couche publique principale.** Le duo donne la densité de A sans dupliquer la validation, et chaque étage reste utilisable seul (`luField` générique → brique exotique ou composant maison ; `luFormView` → structure dynamique). A n'est pas retenu : son seul avantage exclusif (exhaustivité des clés vérifiée à la compilation) est obtenable en B par un check dev-mode, alors que son coût (deuxième grammaire de validation + config récursive) est permanent.

Si le choix se portait quand même sur A : implémenter B d'abord de toute façon — le renderer et le socle §4 sont identiques, et A se compile en nœuds B. A = une fonction `luForm()` de plus, pas une autre architecture. Les deux réponses convergent donc sur la même fondation ; seule la surface publique diffère.

---

## 9. Sujets transverses (spécifiés une fois, valables pour tous les designs)

### 9.1 Tableaux de champs

Signal forms : `applyEach` pour les règles, mutation du signal modèle pour la structure. Côté vue :

```ts
readonly addressesForm = form(this.model, p => {
 applyEach(p.addresses, addr => {
  required(addr.street);
  required(addr.city);
 });
});

luRepeat(this.employeeForm.addresses, (addr, index) => [
 luRow(
  luText(addr.street, { label: 'Rue' }),
  luText(addr.city, { label: 'Ville' }),
 ),
 luCustom(RemoveAddressButton, { outputs: { remove: () => this.removeAddress(index()) } }),
]),
// Ajout : this.model.update(m => ({ ...m, addresses: [...m.addresses, emptyAddress()] }))
```

Le renderer s'appuie sur les identités de tracking des items de `FieldTree` (fournies par signal forms) pour préserver l'état DOM lors des réordonnancements.

### 9.2 Conditionnels

Toujours `hidden()` / `disabled()` / `readonly()` / `applyWhen()` dans le schema — jamais dans la vue. La vue reflète, le schema décide. (Rappel doc Angular : préférer modèle statique + `hidden` plutôt que structures dynamiques, pour ne pas perdre les valeurs saisies.)

### 9.3 Layout

`luFieldset` → `FieldsetComponent` (`lu-fieldset`), `luRow` → `GridComponent`/classes de grille existantes, défaut = pile verticale. Le formulaire hôte reste `form[luForm]` (mode `presentation` propagé aux `lu-form-field` : le rendu lecture seule existant fonctionne sans rien faire).

### 9.4 Radio group

`RadioGroupInputComponent` implémente `FormValueControl<T>` (§4.4) et attend des `lu-radio` projetés. Le builder passe par un host interne (`LuRadioGroupHostComponent`) dont le template fait `@for (o of options)` sur des `lu-radio` — les `RadioComponent` retrouvent `RADIO_GROUP_INSTANCE` par DI. Exposé via `luRadioGroup()` uniquement (pas de `luField(RadioGroupInputComponent)` direct documenté).

### 9.5 Soumission

Rien d'inventé : `<form luForm [formRoot]="f">` + option `submission.action` de `form()`. Erreurs serveur → `{ kind, message, fieldTree }` retournés par l'action, affichées par le canal standard (§4.5). `onInvalid` natif pour le focus du premier champ en erreur (`errorSummary()[0]?.fieldTree().focusBoundControl()`).

### 9.6 Accessibilité

Inchangée par construction : c'est le vrai `lu-form-field` qui rend label/aria/ids, le vrai `InputDirective` qui s'enregistre. Le point de vigilance est le §4.4-2 (required/invalid via `field` input) — à couvrir par les tests a11y existants + stories dédiées.

### 9.7 Stories & tests

- Une story Storybook par design retenu (form complet type « employé », avec selects branchés sur les mocks apiV4 existants), une par sujet transverse (repeat, conditionnels, erreurs serveur).
- Tests : renderer (création/destruction/hidden/bindings réactifs), contrat `FormValueControl` par brique (valeur, touch, contraintes, erreurs), tests croisés double stack (`formControl` vs `[formField]`), mapping erreurs/i18n.

### 9.8 Packaging

- Nouvelle secondary entry **`@lucca-front/ng/form-builder`** (pattern existant : dossier + `ng-package.json` + `public-api.ts`).
- `peerDependencies` du package : `@angular/core ^22`, `@angular/forms ^22` (le builder importe `@angular/forms/signals`) — la montée LF 22.0 est donc un prérequis (faite dans cette branche).
- Aucune dépendance nouvelle.
- Sens des dépendances entre entries : `form-builder` n'importe aucune entry de briques/directives ; les entries de directives qui livrent une feature (§7.1) importent `form-builder` (types `LuSelectFeature`/`LuDirectiveDef` + `attach`). Pas de cycle : `form-builder` ne référence jamais les entries de directives.

---

## 10. Plan d'implémentation

1. **Phase 0 (prérequis, cette branche)** : Angular 22 + build vert. ✔
2. **Phase 1 — contrat `FormValueControl` dans les briques** (§4.4-1) : wrappers `forms/*` (dont checkbox/switch en `FormCheckboxControl`), selects (`value` → `model()`), `date2`, radio group ; suppression de `generateMirrorControl` ; évolution `FormFieldComponent.field` (§4.4-2) ; bundle d'erreurs (§4.5). Chaque brique migrée gagne une story « signal forms » (usage template, indépendamment du builder) — la migration a de la valeur seule.
3. **Phase 2 — socle builder** : types passthrough (§4.1), `attach` (§4.2), `LuFieldHostComponent` + `lu-form-renderer` (§4.3). `luField` générique + nœuds de layout (API Design B). Briques couvertes : toutes celles de la phase 1 + directives core-select.
4. **Phase 3 — DSL** : factories C (text/number/checkbox/switch/date/textarea/radio/select/multiselect), `luRepeat`, `luCustom`/`luTemplate`, assertion dev-mode « champs non couverts ».
5. **Phase 4 — dépréciation `@lucca-front/ng/formly`** (guide de migration, éventuel schematic).

## 11. Risques et questions ouvertes

- **Double stack par brique** (contrat `FormValueControl` + chemin CVA/`injectNgControl` conservé pour Reactive Forms) : source de vérité interne unique à imposer (un signal, les deux ponts convergent dessus), sinon divergences d'état. À verrouiller par des tests croisés (même brique pilotée en `formControl` puis en `[formField]`).
- **`value` public des selects** : la promotion getter/setter → `model()` touche l'API publique de `ALuSelectInputComponent` (consommateurs qui font `select.value = x`). `WritableSignal` reste appelable/settable différemment → breaking change à annoncer sur le cycle 22 (label `:boom:`).
- **Erreurs de parse `date2`** : valider que `ParseResult`/`transformedValue` couvre « saisie non parsable » + `min`/`max` côté contrôle ; sinon définir le fallback (erreur custom poussée dans le schema ? kind dédié ?). À instruire en début de phase 1 — c'est la seule inconnue API réelle.
- **Contrainte du contrat** : `FormValueControl` exige l'absence de `checked`, `FormCheckboxControl` l'absence de `value` — audit de nommage des inputs existants par brique avant migration (collisions → renommages breaking).
- **Bindings dynamiques sur les `model()`** (`optionTpl`, `calendarMode`…) : `twoWayBinding` exige un `WritableSignal` — OK, mais à vérifier brique par brique (certains models sont initialisés avec des composants par défaut).
- **Interception du Enter dans les selects** (panel ouvert) déjà gérée par les briques ; à re-tester sous `FormRoot` (qui soumet via `submit()`).
- **Ordre d'application des directives** dans `createComponent` : `FormField` est ajoutée en premier ; vérifier qu'aucune directive core-select ne dépend d'un ordre d'instanciation particulier vis-à-vis du canal valeur.
- **Filter pills** : plusieurs briques implémentent `FilterPillInputComponent` — hors périmètre v1, mais le socle (création dynamique + directives) est réutilisable pour un futur builder de filter bar.
