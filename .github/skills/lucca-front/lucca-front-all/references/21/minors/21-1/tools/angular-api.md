# API Angular hors composants

> Providers, injection tokens, pipes et services exportés par `@lucca-front/ng/*` qui ne sont documentés sur la page d'aucun composant (package sans composant, ou symbole éloigné des composants du package). Extraits du code source au tag `v21.1.4` (JSDoc `@deprecated` inclus).

## api (`@lucca-front/ng/api`)

### Services

#### LuApiV3Service

- `getAll(filters: string[] = []): Observable<T[]>`
- `getPaged(page: number, filters: string[] = []): Observable<T[]>`
- `searchAll(clue: string, filters: string[] = []): Observable<T[]>`
- `searchPaged(clue: string, page: number, filters: string[] = []): Observable<T[]>`

#### LuApiV4Service

- `getAll(filters: string[] = []): Observable<T[]>`
- `getPaged(page = 0, filters: string[] = []): Observable<T[]>`
- `searchAll(clue = '', filters: string[] = []): Observable<T[]>`
- `searchPaged(clue = '', page = 0, filters: string[] = []): Observable<T[]>`
- `count(): Observable<number>`

#### LuApiHybridService

- `getAll(filters: string[] = []): Observable<T[]>`
- `getPaged(page: number, filters: string[] = []): Observable<T[]>`
- `searchAll(clue: string, filters: string[] = []): Observable<T[]>`
- `searchPaged(clue: string, page: number, filters: string[] = []): Observable<T[]>`

### Modules dépréciés

- ⚠️ `LuApiSearcherModule` — use `LuApiPagedSearcherComponent, LuApiSearcherComponent` instead

## core (`@lucca-front/ng/core`)

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_NATIVE_DATE_ADAPTER_OPTIONS` | `ILuNativeDateAdapterOptions` | — |
| `PORTAL_CONTEXT` | `unknown` | — |

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `intlParams` | `IntlParamsPipe` | `(value: string, args: Record<string, string \| number>): string` | — |

### Services

#### LuNativeDateAdapter

- `isParsable(text: string, granularity: LuDateGranularity = ELuDateGranularity.day): boolean`
- `parse(text: string, granularity: LuDateGranularity = ELuDateGranularity.day): Date`
- `format(d: Date, format: string): string`
- `forge(year: number, month: number, date: number): Date`
- `forgeToday(): Date`
- `forgeInvalid(): Date`
- `isValid(d: Date): boolean`
- `clone(d: Date): Date`
- `getYear(d: Date): number`
- `getMonth(d: Date): number`
- `getDate(d: Date): number`
- `getDay(d: Date): number`
- `add(d: Date, count: number, granularity: LuDateGranularity): Date`

#### LuStringDateAdapter

bind to a string with iso 26001 format YYYY-MM-DD

- `forge(year: number, month: number, date: number): string`
- `forgeToday(): string`
- `forgeInvalid(): string`
- `isValid(d: string): boolean`
- `compare(a: string, b: string, granularity: LuDateGranularity): number`
- `isParsable(text: string): boolean`
- `parse(text: string, granularity: LuDateGranularity): string`
- `format(d: string, format: string): string`
- `clone(d: string): string`
- `getYear(d: string): number`
- `getMonth(d: string): number`
- `getDate(d: string): number`
- `getDay(d: string): number`
- `add(d: string, count: number, granularity: LuDateGranularity): string`

## department (`@lucca-front/ng/department`)

### Services

#### LuDepartmentV3Service — ⚠️ Déprécié : use {LuDepartmentService} instead.

- `getTrees()`

#### LuDepartmentV4Service

- `getTrees()`

## dialog/testing (`@lucca-front/ng/dialog/testing`)

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuDialogDataTesting` | `<T = unknown>(data: LuDialogData<T>)` | — |

## establishment (`@lucca-front/ng/establishment`)

### Services

#### LuEstablishmentService

#### LuLegalUnitService

## formly (`@lucca-front/ng/formly`)

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuFormly` | `(): EnvironmentProviders` | — |

### Modules dépréciés

- ⚠️ `LuFormlyModule` — use provideLuFormly() in a lazy loaded route (and stop using formly please)

## forms/rich-text-input/formatters/html (`@lucca-front/ng/forms/rich-text-input/formatters/html`)

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuRichTextHTMLFormatter` | `(): Provider` | — |

## forms/rich-text-input/formatters/markdown (`@lucca-front/ng/forms/rich-text-input/formatters/markdown`)

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuRichTextMarkdownFormatter` | `(transformers?: Transformer[]): Provider` | — |

## forms/rich-text-input/formatters/plain-text (`@lucca-front/ng/forms/rich-text-input/formatters/plain-text`)

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuRichTextPlainTextFormatter` | `(transformers?: PlainTextTransformer[]): Provider` | — |

## input (`@lucca-front/ng/input`)

### Modules dépréciés

- ⚠️ `LuInputClearerModule` — use `ClearComponent` instead
- ⚠️ `LuInputDisplayerModule` — use `LuInputDisplayerDirective` instead
- ⚠️ `LuInputModule` — use `LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent` instead

## number (`@lucca-front/ng/number`)

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luNumber` | `LuNumberPipe` | `(number: number, precision = 2)` | — |

### Modules dépréciés

- ⚠️ `LuNumberModule` — use `LuNumberPipe` instead

## number-format (`@lucca-front/ng/number-format`)

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luNumberFormat` | `LuFormatNumberPipe` | `(value: number, options: NumberFormatOptions)` | — |

## option (`@lucca-front/ng/option`)

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TREE_OPTION_ITEM_TRANSLATIONS` | `unknown` | — |
| `LU_OPTION_SELECT_ALL_TRANSLATIONS` | `unknown` | — |
| `LU_OPTION_PLACEHOLDER_TRANSLATIONS` | `unknown` | — |

### Modules dépréciés

- ⚠️ `LuOptionItemModule` — use `LuOptionItemComponent` instead
- ⚠️ `LuTreeOptionItemModule` — use `LuTreeOptionItemComponent` instead
- ⚠️ `LuOptionPickerModule` — use `LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent` instead
- ⚠️ `LuTreeOptionPickerModule` — Déprécié.
- ⚠️ `LuOptionFeederModule` — use `LuOptionFeederComponent` instead
- ⚠️ `LuTreeOptionFeederModule` — use `LuTreeOptionFeederComponent` instead
- ⚠️ `LuForOptionsModule` — use `LuForOptionsDirective` instead
- ⚠️ `LuForTreeOptionsModule` — use `LuForTreeOptionsDirective` instead
- ⚠️ `LuOptionPagerModule` — use `LuOptionPagerComponent` instead
- ⚠️ `LuOptionSearcherModule` — use `LuOptionSearcherComponent` instead
- ⚠️ `LuTreeOptionSearcherModule` — use `LuTreeOptionSearcherComponent` instead
- ⚠️ `LuTreeOptionOperatorModule` — use `LuTreeOptionFeederComponent, LuForTreeOptionsDirective, LuTreeOptionPagerComponent, LuTreeOptionSearcherComponent` instead
- ⚠️ `LuOptionSelectAllModule` — use `LuOptionSelectAllComponent` instead
- ⚠️ `LuOptionModule` — use `LuOptionItemComponent, LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionPagerComponent, LuOptionFeederComponent, LuOptionSearcherComponent, LuForOptionsDirective, LuForGroupsDirective, LuOptionSelectAllComponent, LuOptionPlaceholderComponent` instead
- ⚠️ `LuTreeOptionModule` — use `LuTreeOptionSelectAllComponent` instead

## popup (`@lucca-front/ng/popup`)

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_POPUP_REF_FACTORY` | `ILuPopupRefFactory` | — |
| `LU_POPUP_DATA` | `unknown` | Injection token that can be used to access the data that was passed in to a dialog. |
| `LU_POPUP_CONFIG` | `ILuPopupConfig` | — |

### Services

#### LuPopupRefFactory

- `forge<T, D, R>(component: ComponentType<T>, config: ILuPopupConfig)`

#### LuPopup

- `open<T, D, R>(component: ComponentType<T>, data: D = undefined, config: Partial<ILuPopupConfig> = {}): ILuPopupRef<D, R>`

### Modules dépréciés

- ⚠️ `LuPopupModule` — use `OverlayModule` imports && `LuPopup, { provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig }, { provide: LU_POPUP_REF_FACTORY, useClass: LuPopupRefFactory }` providers instead

## safe-content (`@lucca-front/ng/safe-content`)

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luSafeExternalSvg` | `LuSafeExternalSvgPipe` | `(url: string): SafeHtml` | — |
| `luSafeHtml` | `LuSafeHtmlPipe` | `(value: string, config?: SanitizerConfig): SafeHtml` | — |

### Modules dépréciés

- ⚠️ `LuSafeContentModule` — use `LuSafeHtmlPipe` instead

## sidepanel (`@lucca-front/ng/sidepanel`)

### Services

#### LuSidepanel — ⚠️ Déprécié : Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.

- `open<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuSidepanelRef<D, LuModalContentResult<T>>`

### Modules dépréciés

- ⚠️ `LuSidepanelModule` — Use LuModal with `modal.open(component, data, { mode: 'sidepanel' })` instead.

## title (`@lucca-front/ng/title`)

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuTitleStrategy` | `(options: LuTitleStrategyOptions): Provider[]` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TITLE_TRANSLATE_SERVICE` | `ILuTitleTranslateService` | — |

### Services

#### LuTitleService — ⚠️ Déprécié : use Title strategy instead

- `init(applicationNameTranslationKey: string)`
- `prependTitle(title: string | ObservableInput<string>)`
- `overrideFirstTitlePart(title: string | ObservableInput<string>)`

#### LuTitleStrategy

- `updateTitle(routerState: RouterStateSnapshot)`
- `prependTitle(title: string | ObservableInput<string>)`
- `overrideFirstTitlePart(title: string | ObservableInput<string>)`

### Modules dépréciés

- ⚠️ `LuTitleModule` — use title streatgy instead

## user (`@lucca-front/ng/user`)

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DEFAULT_DISPLAY_POLICY` | `LuDisplayFormat` | Injection token that can be used to change the default displayed user format. |
| `LU_USER_SEARCHER_TRANSLATIONS` | `unknown` | — |

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luUserDisplay` | `LuUserDisplayPipe` | `(user: T, options?: Partial<LuUserDisplaySingleOptions>)` | Displays a user name according to specified format. Supported formats: f for first name, F for first initial, l for last name, L for last initial. |

### Services

#### LuUserHomonymsService

- `extractHomonyms(users: U[]): U[]`
- `enrichHomonyms(homonyms: U[]): Observable<U[]>`

#### LuUserV3Service

- `getMe(): Observable<U>`

### Modules dépréciés

- ⚠️ `LuUserDisplayModule` — use `LuUserDisplayPipe` imports && `LuUserDisplayPipe` providers instead
- ⚠️ `LuUserMeOptionModule` — use `LuUserMeOptionDirective` instead
- ⚠️ `LuUserSearcherModule` — use `LuUserPagedSearcherComponent` instead
