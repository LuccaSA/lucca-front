# CoreSelectInputComponent — propriété `grouping` dépréciée

## Contexte de dépréciation

Les getter/setter `grouping` sur `ALuCoreSelectInputComponent` (et ses dérivés) sont dépréciés au profit du signal `groupingSignal`.

## Propriété dépréciée

| Propriété dépréciée | Remplacement |
|---|---|
| `grouping` (getter/setter) | `groupingSignal` (Signal) |

## Migration TypeScript

### Avant

```ts
this.selectComponent.grouping = myGrouping;
const current = this.selectComponent.grouping;
```

### Après

```ts
this.selectComponent.groupingSignal.set(myGrouping);
const current = this.selectComponent.groupingSignal();
```

## Migration automatique

- Remplacer les assignments `component.grouping = value` par `component.groupingSignal.set(value)`.
- Remplacer les lectures `component.grouping` par `component.groupingSignal()`.
