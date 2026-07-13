# button — iOS

## Button iOS

```swift
import LuccaSDK
```

```swift
LuccaButton(
  "Button",
  onClick: {}
)
```

### Style

```swift
LuccaButton(
  "Button",
  mode: .Contained, // .Contained (default) | .Outlined | .Link — Type: LuccaButtonMode
  onClick: {}
)
```

### Icône & image

```swift
LuccaButton(
  "Button",
  image: AnyView(Image("ressource_name")), // nil (default)
  hasIconOnTheRight: false, // false (default) | true
  onClick: {}
)
```

### États

```swift
LuccaButton(
  "Button",
  isDisabled: false, // false (default) | true
  isLoading: false, // false (default) | true
  withStyle: .Primary, // .Primary (default for .Contained & .Link), .Neutral (default for .Outlined), .Success, .Warning, .Critical
  onClick: {}
)
```

### Taille

```swift
LuccaButton(
  "Button",
  size: LuccaButtonSize (
    width: .ofContent, // .ofContent (default) | .fixed(size: CGFloat) | .ofAvailable
    height: .fixed(size: 40), // .fixed(size: 40) (default) | .ofContent | .ofAvailable
  ),
  onClick: {}
)
```
