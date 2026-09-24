### 22.0.0

#### Added

- `lu-file-entry-wrapper` component to group several `lu-file-entry` in a single display block.
- `structure` input on `lu-multi-file-upload`, to display the structured variant already available on `lu-single-file-upload`.

#### Changed

- `size` input of the file upload components and of `lu-file-entry` now accepts `L` instead of `S`: the compact variant became the default (unset) size and `L` is the large one. `FILE_UPLOAD_SIZE` and `FILE_ENTRY_SIZE` are updated accordingly.
- `lu-single-file-upload` no longer renders the uploaded file itself; display a `lu-file-entry` next to it instead. Its former `entry`, `state`, `previewUrl`, `inlineMessageError` and `displayFileName` inputs and `deleteFile` output remain exposed but no longer affect rendering.

### 21.3.1

#### Added

- `openInNewTab` input on `lu-file-entry` to open the `downloadURL` in a new tab.

#### Fixed

- Icon preview of `lu-file-entry`.

### 21.3.0

#### Added

- `FILE_ENTRY_STATE`, `FILE_ENTRY_SIZE`, `FILE_UPLOAD_STATE` and `FILE_UPLOAD_SIZE` constants, together with their matching types, are now publicly exported and used to type the `state` and `size` inputs.

### 21.2.2

#### Fixed

- File size is displayed even when it equals `0`.

### 21.2.0

#### Added

- Content slot to display a tag next to the file.
- `media` and `size` of a `lu-file-entry` can now be left undefined.

### 21.1.4

#### Fixed

- Divider rendering between file entries.

### 21.1.2

#### Added

- `buttonFilled` input to render the upload button with the filled style instead of the outlined one.

### 21.1.0

#### Added

- `formatFileSize` function is now publicly exported.

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### Fixed

- The displayed file type now matches the actual file.

### 20.3.1

#### Fixed

- Typing of the `state` input.

### 19.3.0

#### Added

- `lu-single-file-upload`, `lu-multi-file-upload`, `lu-file-dropzone` and `lu-file-entry` components, with the `accept`, `fileMaxSize`, `required`, `state`, `size`, `illustration`, `iconOverride`, `displayFileName`, `downloadURL`, `previewUrl`, `password`, `inlineMessageError` and `intl` inputs, plus the `filePicked`, `deleteFile` and `passwordChange` outputs.
