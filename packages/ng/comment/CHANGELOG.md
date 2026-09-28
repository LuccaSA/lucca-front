### 21.3.0

#### Fixed

- `.comment-content-text` now wraps long unbreakable strings such as links using `overflow-wrap: anywhere`.

### 21.2.0

#### Added

- `noInfos` input on `lu-comment` to hide the comment header (avatar, author name and date).
- `lu-comment` can now be used standalone, outside of a `lu-comment-block`.

#### Changed

- `content` input on `lu-comment` is now required and accepts a `PortalContent` (string, `TemplateRef` or component) instead of only a `string`.

### 20.3.0

#### Added

- `datePipeFormat` input on `lu-comment` to force the date pipe to display the date with a specific format.

### 20.1.0

#### Removed

- `.comment-content-textContainer` deprecated CSS class.

### 18.3.1

#### Fixed

- `.comment-content-textContainerOptional` CSS class renamed from the misspelled `.comment-content-textContainerOptionnal`.

### 18.3.0

#### Added

- `lu-comment`, `lu-comment-block` and `lu-comment-chat` Angular components wrapping the comment styles.

### 18.1.5

#### Fixed

- `.comment-infos-content` spacing and small (`S`) size styling.

### 18.1.0

#### Added

- `comment` SCSS component.
