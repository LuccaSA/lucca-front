### 21.3.1

#### Added

- `departments`: use a dedicated API call to fetch the total count of departments.

#### Fixed

- `overlay`: keep connected overlay panels out of the `pushPanel` zone so the panel positions correctly.
- `search`: allow `Ctrl`/`Cmd` + `V` paste in the search field.

### 21.3.0

#### Added

- `impersonation`: new boolean input that displays the select in impersonation mode (keeps the search icon and hides the clear/chevron affordances).

#### Fixed

- `highlight`: fix option highlighting when mixing mouse hover and keyboard navigation.
- `accessibility`: expose the selected value through `aria-labelledby` so assistive technologies announce it correctly.

### 21.2.4

#### Fixed

- `users`: fix the response type used to read the total count of the users directive.

### 21.2.3

#### Fixed

- `departments`: no longer load infinitely when the API returns a multiple of `pageSize` items.

### 21.2.2

#### Fixed

- `loading`: fix the panel loading state display.

### 21.2.1

#### Removed

- `former employees`: remove the `panelHeader` setting used to display the former employees clue.

### 21.1.3

#### Fixed

- `presentation`: display an empty value the same way as other inputs in presentation mode.
- `optionComparer`: do not compare options when the value is nil.

### 21.1.1

#### Fixed

- `intl`: the `intl` inputs are now public.

### 21.1.0

#### Added

- `presentation`: support the form-field presentation display mode, rendering the current value through `*luPresentationDisplay`.
- `intl`: new input to override the component's translations.

### 21.0.4

#### Fixed

- `highlight`: take panel elements into account when computing the highlighted option.

### 21.0.3

#### Fixed

- `panel`: keep an 8px margin from the viewport edges so the panel no longer overflows the screen.

### 21.0.2

#### Changed

- `addOption`: the add-option action now sticks to the bottom of the panel.
- `api directives`: select directives are consolidated around a common implementation.

### 21.0.0

#### Added

- `prefix`: new input to display a prefix (template or icon) inside the field.
- `placeholder`: display a default placeholder when none is provided.
- `occupation-category`: new select directive, with its mock data.

#### Changed

- `emptyState`: show a distinct message (`emptyOptions`) when there are no options versus no search results (`emptyResults`).

### 20.3.2

#### Fixed

- `grouping`: fix a change detection issue on the grouping property.
- `grouping`: wait for establishment grouping calls to be fetched before fetching options.

### 20.3.1

#### Fixed

- `panel`: improve the panel placement update logic.

### 20.2.3

#### Fixed

- `departments`: fix an `optionComparer` crash.

### 20.2.1

#### Fixed

- `accessibility`: fix the `aria-selected` status of options.
- `users`: add the missing `uniqueOperationIds` for the `me` lookup.

### 20.2.0

#### Added

- `tree`: support tree mode to display and select nested options.

### 20.1.3

#### Fixed

- `autocomplete`: fix the DOM attribute type and keep `off` as the default.

### 20.1.2

#### Fixed

- `homonyms`: additional data was missing when searching.

### 20.1.0

#### Added

- `accessibility`: keyboard navigation for the add-option action and support for custom panel headers and footers.

#### Changed

- `autocomplete`: the input now defaults to `off`.

### 19.3.4

#### Added

- `optionComparer`: can be overridden for the API v4 directives.

### 19.3.2

#### Fixed

- `focus`: focus the input again after the panel is closed.

### 19.3.0

#### Added

- `users`: support a custom user option template.

#### Removed

- `LuSimpleSelectApiV3Directive`: removed, use `LuCoreSelectApiV3Directive` from `@lucca-front/ng/core-select/api` instead.

### 19.2.6

#### Fixed

- `clearable`: hide the clear button when the select is used in filter pill mode.

### 19.2.5

#### Fixed

- `keyboard`: fix the space key not opening the panel properly.

### 19.2.4

#### Fixed

- `grouping`: fix the option id when grouping.
- `focus`: don't focus the checkbox when the panel is opened.
- `api v4`: improve the initialization logic to prevent useless API calls.

### 19.2.1

#### Changed

- `inputs`: accept readonly arrays.

### 19.2.0

#### Added

- `filterPill`: support filter pill mode so the select can be used inside `lu-filter-pill`.
- `search`: display a search icon when the field is searchable.
- `noClue`: new directive to disable the API v3/v4 search.

### 19.1.5

#### Added

- `api directives`: new `uniqueOperationIds` input on the establishments and users directives.

### 18.3.3

#### Changed

- `overlay`: the select no longer overrides the overlay container.

#### Fixed

- `search`: fix search when using `luOptionGroup`.

### 18.3.0

#### Added

- `users`: support `enableFormerEmployees` on the users select directive.

#### Fixed

- `portal`: handle nullish portal values.

### 18.1.2

#### Fixed

- `highlight`: fix the missing highlighted option issue.
- `highlight`: fix the missing highlighted item after the search clue changes.
- `clearable`: hide the clear button when the select is disabled.
