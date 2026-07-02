# progress-bar — Design

## Règles d'usage

### Positionnement

Les indicateurs sont situés au plus proche de la zone de *locus of attention.* Sur un bouton de validation (alors désactivé), à l’endroit où sera affichée une image *uploadée,* etc.

### Cycle de vie

Contrairement aux loading, les progress bars peuvent rester présentes dans la page avant ou après les traitements liés (même si ce n’est pas obligatoire). Ils permettent ainsi de remonter à l’utilisateur la nécessité de déclencher une action ou lui indiquent sa bonne ou mauvaise exécution. Dynamiquement, ils doivent refléter l’état d’avancement des tâches le plus précisément possible.
