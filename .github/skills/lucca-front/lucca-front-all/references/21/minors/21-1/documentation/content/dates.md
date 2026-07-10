# Dates

# Content

## Format court (10/11/1981)

**Usage :** **l'utilisateur n'a pas besoin de connaître le jour de la semaine.****Contexte :** pour tout écran riche en dates, pour les Index tables, les Data tables, les Tooltips, les Placeholders de Date picker.

### Règles

* Pas d'espace avec les "/"
* Année complète (4 chiffres)
* Utiliser Intl pour une gestion complète des traductions des dates (cf. [MDM web doc sur le sujet](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl)).

✅ `06/11/1981` | ❌ `6/11/81`

* Déclinaisons pour la localisation : 

| **Locale** | **Format de la date** |
| --- | --- |
| FR | jj/mm/aaaa  |
| DE | tt.mm.jjjj  |
| ES | dd/mm/aaaa |
| EN-GB | jj/mm/aaaa |
| EN-US | mm/dd/yyyy  |

### Exemples 

|  ✅ | ❌ |
| --- | --- |
|  06/11/1981  | 6/11/81 |

## Format avec jour de la semaine

**Usage :** **quand le jour importe pour la compréhension chez l'utilisateur.**

### Règles

* **Privilégions la version complète** : "lundi 4 janvier 2024".
* En cas de contraintes d'espace : abréger jour ET mois. Exemple : "lun. 4 janv. 2024".
* Pas de majuscule en français (sauf EN/DE).
* Point obligatoire après l'abréviation.

✅ `lun. 4 janv. 2024` | ❌ `Lundi 4 jan. '24`

### Exemples 

| Locale | Abréviations des mois | Abréviations des jours |
| --- | --- | --- |
| FR | janv. févr. mars avr. mai juin juill.  août sept.  oct.  nov.  déc. | lun. mar.  mer. jeu. ven.  sam. dim. |
| DE | Jan. Feb. März Apr. Mai Jul. Sept. Oct.  Nov.  Dec. | Mo.  Di. Mi. Do. Fr. Sa. So. |
| ES | enero feb. marzo abr. mayo jun. jul. agosto sept. oct. nov. dic. | Lu.  Ma.  Mi. Ju. Vi.  Sá. Do. |
| EN-GB & US | Jan. Feb.  March April June July  Sept.  Oct.  Nov.  Dec. | Mon.  Tues. Wed. Thurs. Fri. Sat. Sun. |

*Luccasien·ne, avez-vous des questions, des remarques, un témoignage ?* 

*Envoyez un DM sur Slack à Anne-Laure ou sur #ux-writing.*
