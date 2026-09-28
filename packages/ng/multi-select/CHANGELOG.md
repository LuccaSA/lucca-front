### 21.3.1

#### Added

- `departments`: use a dedicated API call to fetch the total count of departments.

#### Fixed

- `panel overlay`: keep connected overlays out of the push-panel zone so the panel is positioned correctly.
- `search`: allow `Ctrl`/`Cmd` + `V` paste in the search field.

### 21.3.0

#### Fixed

- `displayer`: fix the value displayer rendering.
- `option highlight`: keep the highlighted option consistent when navigating with both mouse and keyboard.
- `select-all header`: do not display the select-all header when there are no values.
- `assistive technologies`: fix the value announced to assistive technologies.

### 21.2.4

#### Fixed

- `users`: fix the response type used to read the total count of the users directive.

### 21.2.3

#### Fixed

- `departments`: no longer load infinitely when the API returns a multiple of `pageSize` items.

### 21.2.2

#### Fixed

- `panel`: fix the loading state of the panel.

### 21.2.1

#### Removed

- `former employees`: remove the `panelHeader` setting used to display the former employees clue.

### 21.1.3

#### Fixed

- `displayer`: fix ellipsis on the multi-value displayer.
- `empty value`: display the empty value the same way as other inputs.
- `optionComparer`: do not compare options when the value is nil.

### 21.1.1

#### Fixed

- `intl`: the `intl` inputs are now public.

### 21.1.0

#### Added

- `intl`: allow overriding translations per instance through the `intl` input.
- `presentation`: support the presentation display mode when used inside a form field.

#### Fixed

- `presentation`: fix typo and tooltip in presentation mode.

### 21.0.4

#### Fixed

- `option highlight`: take panel elements into account when computing the highlighted option.

### 21.0.3

#### Changed

- `panel`: constrain the panel to a max width aligned with the input.

#### Fixed

- `placeholder`: keep the input focused and hide the placeholder when all options are selected.

### 21.0.2

#### Changed

- `api directives`: select directives are consolidated around a common implementation.

#### Fixed

- `select-all`: do not open the panel when `withSelectAll` is set on init.

### 21.0.0

#### Added

- `lu-multi-select-content-displayer`: new displayer component that projects arbitrary content for the selected values.
- `placeholder`: add a default placeholder for the multi-select.
- `occupation-category`: new select directive, with its mock data.

#### Changed

- `select-all displayer`: render selected values with `lu-chip`.
- `no result`: show a more specific message when a search returns no result.

### 20.3.3

#### Fixed

- `select-all displayer`: fix the numeric badge not showing when the displayer uses text.

### 20.3.2

#### Fixed

- `grouping`: wait for establishment grouping calls before fetching options.
- `grouping`: fix a change detection issue on the grouping property.

### 20.3.1

#### Fixed

- `select-all displayer`: fix the wrong total count shown in the displayer.
- `filter pill`: fix the filter pill displayer when using select-all.
- `panel`: improve panel placement update logic.

### 20.2.2

#### Fixed

- `select-all`: properly handle toggling options of disabled groups.
- `panel header`: `luSelectPanelHeader` now works with `lu-multi-select`.
- `departments`: fix the total count in tree mode.

### 20.2.1

#### Fixed

- `users`: add the missing `uniqueOperationIds` for the `me` lookup.

### 20.2.0

#### Added

- `tree mode`: display options as a tree, with `Ctrl+Enter` to select the parent only and `Shift+Enter` to select children only.

#### Fixed

- `a11y`: accessibility audit fixes.

### 20.1.2

#### Fixed

- `homonyms`: additional data was missing when searching.

### 20.1.1

#### Fixed

- `filter pill`: make the displayed value match the selected value.

### 20.1.0

#### Added

- `panel header / footer`: support custom panel headers and footers, with accessibility for the select-all control.

#### Changed

- `autocomplete`: turn browser autocomplete off by default on the search field.

### 19.3.4

#### Added

- `optionComparer`: can be overridden for the API v4 directives.

### 19.3.0

#### Added

- `users`: support a custom user option template.

### 19.2.6

#### Fixed

- `grouping`: fix the group template not being displayed when a clue was used.
- `filter pill`: make the filter pill clearable.

### 19.2.4

#### Fixed

- `api v4`: improve the initialization logic to prevent useless API calls.
- `grouping`: fix the option id when grouping.

### 19.2.2

#### Fixed

- `displayer`: fix ellipsis on the displayer.

### 19.2.1

#### Changed

- `inputs`: accept readonly arrays.

### 19.2.0

#### Added

- `filter pill mode`: integrate with filter pills, including a `filterPillLabelPlural` input for the pill label.
- `noClue`: new directive to disable the API v3/v4 search.

#### Changed

- `search icon`: display a search icon when the component is searchable.
- `select-all displayer`: option to disable the numeric badge tooltip.

#### Fixed

- `placeholder`: remove the placeholder when the search input is not used.

### 19.1.6

#### Fixed

- `select-all`: fix wrong selection/unselection when manually selecting or unselecting all options.

### 19.1.5

#### Added

- `api directives`: new `uniqueOperationIds` input on the establishments and users directives.

### 19.1.4

#### Fixed

- `numeric badge`: fix the multi-establishment numeric badge in size S.
- `users`: fix the wrong API used for the users count, and stop overriding `panelHeaderTpl`.

### 19.1.0

#### Added

- `LuMultiSelectionValidators`: new `required` validator for the multi-selection control.

### 18.3.3

#### Changed

- `overlay`: the select no longer overrides the overlay container.

#### Fixed

- `panel`: fix the searchable state when using `luOptionGroup`.

### 18.3.2

#### Added

- `keepSearchAfterSelection`: new input to keep the search clue after a value is selected instead of clearing it.

#### Fixed

- `select-all`: emit mode `none` when selecting all then unselecting each option.
- `displayer`: fix error display and ARIA attributes on the displayer.

### 18.3.1

#### Fixed

- `initial value`: take initial values into account.
- `select-all`: multiple select-all fixes.

### 18.3.0

#### Added

- `withSelectAll`: new `lu-multi-select[withSelectAll]` directive (`LuMultiSelectWithSelectAllDirective`) enabling a select-all mode, with the `lu-multi-select-all-displayer` and `lu-multi-select-all-header` components.
- `users`: support `enableFormerEmployees` on the users select directive.

### 18.2.3

#### Fixed

- `ui`: multi-select UI fixes.

### 18.1.2

#### Fixed

- `option highlight`: fix the no-highlighted-option issue.
- `option highlight`: fix the highlighted item not updating after a clue change.

### 18.1.0

#### Added

- `lu-multi-select-counter-displayer`: new displayer component showing a counter of selected values.

#### Fixed

- `chip`: fix the "+N" chip in size S.
