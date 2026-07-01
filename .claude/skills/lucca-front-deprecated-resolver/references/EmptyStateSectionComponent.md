# EmptyStateSectionComponent — input `icon` déprécié

## Contexte de dépréciation

L'input `icon` du composant `lu-empty-state-section` (`EmptyStateSectionComponent`) est déprécié. Il doit être remplacé par les inputs `illustration` et `action`.

## Input déprécié

| Input déprécié | Remplacement | Notes |
|---|---|---|
| `icon` | `illustration` + `action` | Voir logique ci-dessous |

## Logique de migration

L'ancien `icon` était un chemin d'image. La logique interne :
- Si `icon` contient `'Action.svg'` → utiliser `[action]="true"`
- Si `icon` contient `'Success'` → utiliser `illustration="thumbUp"`
- Sinon → utiliser `[illustration]="iconValue"` avec une valeur `BubbleIllustration` appropriée

## Migration

### Avant

```html
<lu-empty-state-section [icon]="'/path/to/Action.svg'">
  Aucun résultat
</lu-empty-state-section>
```

### Après

```html
<lu-empty-state-section action>
  Aucun résultat
</lu-empty-state-section>
```

### Avant (icône Success)

```html
<lu-empty-state-section [icon]="'/path/to/Success.svg'">
```

### Après

```html
<lu-empty-state-section illustration="thumbUp">
```

## Migration automatique

La migration est partiellement automatisable :
- Si la valeur de `icon` contient `'Action'` → remplacer par `action`
- Si la valeur de `icon` contient `'Success'` → remplacer par `illustration="thumbUp"`
- Autres cas → signaler pour intervention humaine
