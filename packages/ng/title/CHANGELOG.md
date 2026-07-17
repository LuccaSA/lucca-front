### 21.3.1

#### Fixed

- `LuTitleService` no longer leaks its RxJS subscriptions, which are now torn down when the service is destroyed.

### 21.3.0

#### Added

- `readTitleByLiveAnnouncer` option in `provideLuTitleStrategy` to announce page title changes through the CDK `LiveAnnouncer`.

### 20.3.0

#### Added

- `mod-elementAfterText` modifier to display an element next to the title text using a flex layout with column spacing.

### 19.3.3

#### Added

- `namingStrategy` option (`'product' | 'other'`) in `provideLuTitleStrategy` to choose how the application name is appended to the title.

#### Changed

- Product titles now end with `Lucca <appTitle>` instead of `<appTitle> – Lucca`.

### 19.3.0

#### Added

- `provideLuTitleStrategy` function to set up the title strategy (app title, translate service) in a single provider call.

#### Changed

- `ILuTitleTranslateService.translate` can now return an `Observable<string>` in addition to a plain `string`.

#### Deprecated

- `APP_TITLE` injection token, use `provideLuTitleStrategy` instead.

### 19.2.0

#### Changed

- Titles no longer apply default vertical spacing (margin and padding) unless the deprecated spacings flag is enabled.
