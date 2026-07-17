# grid — Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.0`. Les versions sans changement d'API sont omises.

## 21.3.0

`GridColumnComponent` :
  ~ `align` : 'start' | 'center' | 'end' | 'auto' | null → GridColumnAlignment | null
  ~ `justify` : 'start' | 'center' | 'end' | 'auto' | null → GridColumnAlignment | null
  ~ `responsive` : ResponsiveConfig<'row' | 'column' | 'rowspan' | 'colspan', number> → ResponsiveConfig<GridColumnResponsive, number>
`GridComponent` :
  ~ `mode` : 'form' | 'auto' | ResponsiveProperty<'auto'> | null → GridMode | null

## 21.0.0

Composant introduit (`GridColumnComponent`, `GridComponent`).

## Notes de release (ZeroHeight)

# grid — Changelog

_No changelog available._
