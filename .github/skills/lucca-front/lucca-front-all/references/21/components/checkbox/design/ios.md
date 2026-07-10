# checkbox — iOS

## Checkbox iOS

```swift
import LuccaSDK
```

iOS ne propose pas nativement de composant checkbox. Il est cependant possible d'obtenir une checkbox en combinant le composant natif [Toggle](https://developer.apple.com/design/human-interface-guidelines/toggles) et le style associé fournit par LuccaSDK: `LuccaToggleCheckboxStyle()`

### LuccaToggleCheckboxStyle

Application du style `LuccaToggleCheckboxStyle` à un Toggle: 

```swift
Toggle(isOn: $isOn) {
    Text("J'accepte")
}
.toggleStyle(.luccaToggleCheckboxStyle())
```

*Style par défaut*

### Style

`LuccaToggleCheckboxStyle` peut recevoir 2 paramètres optionnels pour spécifier des dimensions différentes ou des couleurs différentes. 

```swift
.toggleStyle(.luccaToggleCheckboxStyle(
    size: .m, // .m (default) | .s — Type: LuccaToggleCheckboxStyleConstants
    colors: .regular // .regular (default) | .error | .disabled - Type: LuccaToggleCheckboxStyleColorConstants
))

```

*Variations de style*

### Mixed state (iOS 16+)

En tant que style du composant natif `Toggle`, `LuccaToggleCheckboxStyle` prend en charge l'état mixed qui est utilisé lorsque des cases à cocher subordonnées ont des états différents.

```swift
struct AlarmsView: View {
    @State private var isOn: [Bool] = [false, false, false]
    var body: some View {
        VStack {
            Toggle(sources: $isOn, isOn: \.self) {
                Text("Alarmes activées")
            }
            VStack(alignment: .leading) {
                Toggle(isOn: $isOn[0]) {
                    Text("Matin")
                }
                Toggle(isOn: $isOn[1]) {
                    Text("Midi")
                }
                Toggle(isOn: $isOn[2]) {
                    Text("Soir")
                }
            }
            .padding(.leading)
        }
        .toggleStyle(.luccaToggleCheckboxStyle())
    }
}
```

*Etat mixed*
