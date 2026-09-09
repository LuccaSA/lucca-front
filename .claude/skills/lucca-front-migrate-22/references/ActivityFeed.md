# ActivityFeed — niveau intermédiaire `lu-activity-feed-update-item`

`FileUploadUpdate` peut désormais recevoir plusieurs entrées. La structure de `<lu-activity-feed-update>` gagne donc un niveau : le contenu (label + slots `activityFeedUpdateBefore`/`activityFeedUpdateAfter`) descend dans un `<lu-activity-feed-update-item>`.

```html
<!-- Avant -->
<lu-activity-feed-step>
  <lu-activity-feed-update label="...">
    <lu-status-badge activityFeedUpdateBefore />
    <lu-status-badge activityFeedUpdateAfter />
  </lu-activity-feed-update>
</lu-activity-feed-step>

<!-- Après -->
<lu-activity-feed-step>
  <lu-activity-feed-update>
    <lu-activity-feed-update-item label="...">
      <lu-status-badge activityFeedUpdateBefore />
      <lu-status-badge activityFeedUpdateAfter />
    </lu-activity-feed-update-item>
  </lu-activity-feed-update>
</lu-activity-feed-step>
```

## Migration

Pour chaque `<lu-activity-feed-update>` :
1. Retirer l'input `label` de `lu-activity-feed-update` (et ses éventuels autres inputs de contenu).
2. Créer un `<lu-activity-feed-update-item>` enfant qui porte ce `label`.
3. Y déplacer le contenu projeté (dont les slots `activityFeedUpdateBefore` / `activityFeedUpdateAfter`).

Automatisable dans le cas simple (une seule entrée). Vérifier l'import du nouveau composant `lu-activity-feed-update-item` dans le composant hôte.
