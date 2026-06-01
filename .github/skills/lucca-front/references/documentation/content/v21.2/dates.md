# Dates

# Content

## Format court

Ce format est à privilégier lorsque l'utilisateur n'a pas besoin de connaître le jour de la semaine.

Nous l’utilisons notamment dans les tableaux (Index tables et Data tables) mais aussi dans les composants de sélection de date (Date picker et Date range picker).

Chaque locale a ses propres conventions (format et séparateur). L'objet `Intl.DateTimeFormat` permet le [formatage des dates et heures](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat) sensible à la langue.

<design figma-url="https://www.figma.com/design/UlH9yiGkWUQFlpJvKBp3bV/?node-id=1022:23167">

</design>

| **Locale** | **Format** | **Séparateur** | **Exemple** |
| --- | --- | --- | --- |
| fr-FR | `JJ/MM/AAAA` | `/` | 01/04/2026 |
| fr-CH | `[JJ.MM](http://JJ.MM)``.AAAA` | `.` | 01.04.2026 |
| en-US | `M/D/YYYY` | `/` | 4/1/2026 |
| en-GB | `DD/MM/YYYY` | `/` | 01/04/2026 |
| de-DE | `[TT.MM](http://TT.MM)``.JJJJ` | `.` | 01/04/2026 |
| de-CH | `[TT.MM](http://TT.MM)``.JJJJ` | `.` | 01/04/2026 |
| es-ES | `DD/MM/AAAA` | `/` | 01/04/2026 |
| it-IT | `GG/MM/AAAA` | `/` | 01/04/2026 |
| nl-NL | `DD-MM-JJJJ` | `-` | 01-04-2026 |
| nl-BE | `D/MM/JJJJ` | `/` | 1/04/2026 |
| pt-PT | `DD/MM/AAAA` | `/` | 01/04/2026 |

## Format long avec horodatage

Ce format est à privilégier lorsque la temporalité et le contexte temporel sont importants pour l’utilisateur. C’est le cas dans les historiques (Activity feed) ou pour les commentaires (Comment, Chat).

<design figma-url="https://www.figma.com/design/UlH9yiGkWUQFlpJvKBp3bV/?node-id=1022:23126">

</design>

### Règles d'affichage selon l'ancienneté

| **Période** | **Format** | **Exemple** |
| --- | --- | --- |
| Moins de 1h | À l'instant | À l'instant |
| Entre 1 et 24h | Aujourd'hui à `HH:mm` | Aujourd'hui à 10:36 |
| La veille | Hier à `HH:mm` | Hier à 10:36 |
| Au-delà | `jour` `JJ` `mois` `AAAA` à `HH:mm` | mercredi 1 avril 2026 à 10:36 |

### Format d'horodatage complet

| **Locale** | **Format** | **Exemple** |
| --- | --- | --- |
| fr-FR | `jour` `JJ` `mois` `AAAA` à `HH:mm` | jeudi 18 mars 2026 à 10:36 |
| fr-CH | `jour` `JJ` `mois` `AAAA` à `HH:mm` | jeudi 18 mars 2026 à 10:36 |
| en-US | `Jour`, `Mois` `DD`, `YYYY` at `h:mm AM/PM` | Thursday, March 18, 2026 at 10:36 AM |
| en-GB | `Jour` `DD` `Mois` `YYYY` at `HH:mm` | Thursday 18 March 2026 at 10:36 |
| de-DE | `Jour` `TT` `Mois` `JJJJ` um `HH:mm` | Donnerstag 18 März 2026 um 10:36 |
| de-CH | `Jour` `TT` `Mois` `JJJJ` um `HH:mm` | Donnerstag 18 März 2026 um 10:36 |
| es-ES | `jour` `DD` `mois` `AAAA` a las `HH:mm` | jueves 18 marzo 2026 a las 10:36 |
| it-IT | `jour` `GG` `mois` `AAAA` alle `HH:mm` | giovedì 18 marzo 2026 alle 10:36 |
| nl-NL | `jour` `DD` `mois` `JJJJ` om `HH:mm` | donderdag 18 maart 2026 om 10:36 |
| nl-BE | `jour` `DD` `mois` `JJJJ` om `HH:mm` | donderdag 18 maart 2026 om 10:36 |
| pt-PT | `jour` `DD` `mois` `AAAA` às `HH:mm` | quinta-feira 18 março 2026 às 10:36 |

## Format relatif

Ce format est à utiliser lorsque la précision de la date n'est pas critique. Cela apporte une proximité et facilite la compréhension rapide de l'ancienneté.

### Règles d'affichage selon l'ancienneté

| **Période** | **Format** | **Exemple** |
| --- | --- | --- |
| Le jour même | Aujourd’hui | Aujourd’hui |
| La veille | Hier | Hier |
| Moins de 7 jours | Il y a X jours | Il y a 2 jours |
| Moins de 30 jours | Il y a X semaines | Il y a 3 semaines |
| Moins de 12 mois | Il y a X mois | Il y a 4 mois |
| Au-delà | Il y a X ans | Il y a 5 ans |

## Contexte d’un calendrier

Dans les calendriers, il est utile d’utiliser les abréviations des mois ou des jours de la semaine. Pour cela, nous nous basons sur ce que propose `Intl.DateTimeFormat` :

* pour les jours de la semaine, nous privilégions la valeur `narrow`
* pour les mois, nous utilisons la valeur `short`

<design figma-url="https://www.figma.com/design/UlH9yiGkWUQFlpJvKBp3bV/?node-id=1022:24327">

</design>
