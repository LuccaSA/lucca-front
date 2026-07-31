# Aide contextuelle

# Content

## **Bonnes pratiques**

Nous ajoutons de l'aide seulement quand elle est indispensable à l'utilisateur.

* Ajouter de l'aide uniquement quand un besoin réel est constaté (tests, support client, données).
* Favoriser la simplicité des interfaces plutôt que de multiplier les textes d'aide.
* Dans le label, nous intégrons la seule description de la valeur. 
* Nous proposons des liens d'aide externes (ressources ou fiches d’aide) pour donner des informations supplémentaires non indispensables, non critiques.
* Nous évitons les explications textuelles sur les étapes à venir : elles ne sont pas ou peu prises en compte et alourdissent le formulaire.

- **Do** : Le label donne la stricte description de la valeur du champ. S’il y a une information indispensable à donner en plus de cette description, l’ajouter dans le Inline message.
- **Don't** : Nous évitons les ajouts d’information quand il est possible de les intégrer au seul label de l’input.
- **Do** : Nous donnons une seule info utile à un seul emplacement.
- **Don't** : Nous évitons de donner des informations de même nature sur différents emplacements.
- **Do** : Le libellé donne l’information essentielle sur la valeur du champ.
- **Don't** : Nous évitons de donner des informations inutiles.

## Types d'aide contextuelle

| Type d'aide | Description | Quand l'utiliser | Exemple | À éviter |
| --- | --- | --- | --- | --- |
| Message sous le titre du Fieldset  | Placé sous le titre d'une section qui fournit un contexte général pour l'ensemble des champs. | • Quand une explication globale est indispensable pour toute la section.• Pour préciser l'objectif d'une étape du formulaire si ce n’est pas implicite. | "Valeurs modifiables lors du traitement des factures." | • Explications qui concernent un seul champ. • Messages non clairs, non concis. |
| Inline message | Message court placé directement sous un champ spécifique. | • Pour indiquer le format attendu. • Pour expliquer comment une donnée sera utilisée.• Lorsque des retours utilisateurs montrent de l'incompréhension. | "Format attendu : JJ/MM/AAAA"; "Numéro de 15 chiffres requis." | • Informations évidentes ou implicites.• Messages non clairs, non concis. |
| Tooltip à côté du label | Message qui apparaît au survol ou au clic sur l'icône d'aide. | • Pour des explications complémentaires “nice to have”, non indispensables.• Pour définir du jargon technique inévitable. | “GPEC” >"Gestion prévisionnelle des emplois et des compétences." | • Informations critiques ou indispensables (car peu accessibles).• Explications de plus de 2 lignes. |
| Messages d'erreur | Indications accompagnant la saisie. | • En cas d'erreur de format.• Quand une donnée obligatoire est manquante.• Pour guider vers la correction. | "Login déjà utilisé." | • Messages génériques peu explicites.• Usage de jargon technique. |
