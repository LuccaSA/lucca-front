# timelines — Design Guidelines

> Sourced from [Prisme / ZeroHeight](https://prisme.lucca.io/94310e217/p/288e66)

# Content

## Timeline HTML

Classe CSS : `.timeline`

```css
@forward '@lucca-front/scss/src/components/timeline';
```

L’attribut `aria-current="step"` appliqué à `.timeline-step` désactive les étapes suivantes.

Les cercles colorés héritent de la couleur du texte adjacent.

La barre de jauge active peut être animée.

Il est recommandé d’ajouter des liens sur les étapes passées avec `.timeline-step-title-action`.
