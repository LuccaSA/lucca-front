# LuModalModule / LuPopupModule / LuPopoverModule / LuPopoverPanelModule

## Contexte de dépréciation

Ces NgModules sont des wrappers de compatibilité. Les imports et providers doivent être utilisés directement.

## Modules concernés

### LuModalModule

**Déprécié :** `LuModalModule`

**Remplacement :** `OverlayModule, DialogModule` en imports + `provideLuModal(), LuDialogService` en providers.

```ts
// Avant
@NgModule({ imports: [LuModalModule] })

// Après (providers dans le bootstrap ou le composant racine)
bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(OverlayModule, DialogModule),
    provideLuModal(),
    LuDialogService,
  ]
})
```

### LuPopupModule

**Déprécié :** `LuPopupModule`

**Remplacement :** `OverlayModule` en imports + providers explicites.

```ts
// Avant
@NgModule({ imports: [LuPopupModule] })

// Après
providers: [
  importProvidersFrom(OverlayModule),
  LuPopup,
  { provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig },
  { provide: LU_POPUP_REF_FACTORY, useClass: LuPopupRefFactory },
]
```

### LuPopoverModule

**Déprécié :** `LuPopoverModule`

**Remplacement :** `LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective`

```ts
@Component({
  imports: [LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective],
})
```

### LuPopoverPanelModule

**Déprécié :** `LuPopoverPanelModule`

**Remplacement :** `LuPopoverPanelComponent`

## Migration automatique

Remplacer chaque module par ses équivalents listés ci-dessus.
