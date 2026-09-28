### 21.3.1

#### Fixed

- `Shift` + `Enter` no longer inserts a soft line break inside lists.
- Pending value initialization is handled, so a value set before the editor is ready is no longer lost.

### 21.3.0

#### Fixed

- Already-encoded link URLs are no longer double-encoded.
- Markdown input is no longer sanitized, preserving the authored content.

### 21.2.3

#### Fixed

- Link popover is disabled in `presentation` mode.

### 21.2.1

#### Fixed

- The delete button is removed from the link popover for autolinks.

### 21.1.3

#### Fixed

- Trailing whitespace issues with markdown (Lexical update).
- `!` is now a valid character in URLs.
- Context issues when editing an existing link.

### 21.1.1

#### Fixed

- The editor is no longer marked as touched on initialization.
- Caret position when a tag is added in last position.
- Input typing of the markdown formatter.
- Race condition between the child nodes and the editor.

### 21.1.0

#### Added

- Formatter directives to declare the output format of the editor (`html`, `markdown`, `plain-text`).
- `presentation` display mode support.

#### Removed

- Underline text style from the toolbar.

### 21.0.1

#### Fixed

- The tag plugin and the plain-text formatter no longer depend on `@lexical/markdown`.

### 21.0.0

#### Added

- `hideToolbar` input.
- `focus()` method on the component.
- Markdown shortcuts while typing.
- Autolink plugin, turning typed URLs into links.

### 20.3.3

#### Fixed

- Better handling of an empty editor content.

### 20.3.2

#### Fixed

- Focus is no longer stolen when a tag description is updated.
- Markdown output preserves new lines.

### 20.3.0

#### Added

- Plain-text plugin support.

### 20.2.3

#### Added

- Clickable link popover in the link plugin.

#### Fixed

- The tag plugin imports the `chip` styles it relies on.

### 20.2.2

#### Fixed

- Tags could be displayed as raw keys.

### 20.2.1

#### Added

- Optional `tabindex` parameter.

### 20.2.0

#### Added

- Tag plugin, to insert dynamic tags in the content.

### 20.1.1

#### Fixed

- List buttons state when switching from one list mode to another.

### 19.3.4

#### Fixed

- `class` attributes are sanitized in the HTML output.
- Placeholder is displayed at initialization when there is no content.

### 19.3.1

#### Fixed

- The editor is no longer marked as touched and dirty when an initial value is set.
- Lexical dependency management.

### 19.3.0

#### Added

- `lu-rich-text-input` component with the `placeholder`, `autoResize` and `disableSpellcheck` inputs.
