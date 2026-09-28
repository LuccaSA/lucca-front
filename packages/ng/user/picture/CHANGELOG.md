### 21.3.0

#### Added

- `placeholder` input to render an empty picture, and `softRounded` input for a squared picture with rounded corners.
- `USER_PICTURE_SIZE` constant and `UserPictureSize` type are now publicly exported and used to type the `size` input.

### 21.1.4

#### Fixed

- The picture falls back to `pictureHref` when loading `picture.href` fails.

### 20.3.0

#### Added

- `AI` input to render the picture with the AI styling.

### 19.0.0

#### Deprecated

- `LuUserPictureModule` — import the standalone `LuUserPictureComponent` instead.

### 18.2.0

#### Changed

- Avatar styles moved to the SCSS package.

### 18.1.1

#### Added

- `LU_DEFAULT_DISPLAY_POLICY` is taken into account to compute the initials.
