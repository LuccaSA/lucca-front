# Test : listes dans un tableau (zeroheight)

## 1. Puces `•` séparées par `<br>`

| Mod             | Effets                                                               |
| --------------- | -------------------------------------------------------------------- |
| `mod-S`         | • Padding réduit<br>• Icône bulle plus petite<br>• Titre en taille S |
| `mod-fancyDark` | • Fond sombre<br>• Icône bulle visible                               |

## 2. Tirets `–` séparés par `<br>`

| Mod             | Effets                                                               |
| --------------- | -------------------------------------------------------------------- |
| `mod-S`         | – Padding réduit<br>– Icône bulle plus petite<br>– Titre en taille S |
| `mod-fancyDark` | – Fond sombre<br>– Icône bulle visible                               |

## 3. Liste HTML `<ul><li>` dans la cellule

| Mod             | Effets                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------ |
| `mod-S`         | <ul><li>Padding réduit</li><li>Icône bulle plus petite</li><li>Titre en taille S</li></ul> |
| `mod-fancyDark` | <ul><li>Fond sombre</li><li>Icône bulle visible</li></ul>                                  |

## 4. Liste numérotée HTML `<ol><li>`

| Étape        | Détail                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------- |
| Installation | <ol><li>Importer le composant</li><li>Ajouter le style</li><li>Choisir un thème</li></ol> |

## 5. Numérotation manuelle avec `<br>`

| Étape        | Détail                                                                 |
| ------------ | ---------------------------------------------------------------------- |
| Installation | 1. Importer le composant<br>2. Ajouter le style<br>3. Choisir un thème |

## 6. Puces sur une seule ligne (sans retour)

| Mod             | Effets                                                         |
| --------------- | -------------------------------------------------------------- |
| `mod-S`         | • Padding réduit • Icône bulle plus petite • Titre en taille S |
| `mod-fancyDark` | • Fond sombre • Icône bulle visible                            |

## 7. Séparateur point-virgule

| Mod             | Effets                                                       |
| --------------- | ------------------------------------------------------------ |
| `mod-S`         | Padding réduit ; icône bulle plus petite ; titre en taille S |
| `mod-fancyDark` | Fond sombre ; icône bulle visible                            |

## 8. Syntaxe markdown `-` brute (probablement non interprétée)

| Mod     | Effets                                                         |
| ------- | -------------------------------------------------------------- |
| `mod-S` | - Padding réduit - Icône bulle plus petite - Titre en taille S |

## 9. Une ligne par élément (première cellule vide)

| Mod             | Effets                  |
| --------------- | ----------------------- |
| `mod-S`         | Padding réduit          |
|                 | Icône bulle plus petite |
|                 | Titre en taille S       |
| `mod-fancyDark` | Fond sombre             |
|                 | Icône bulle visible     |

## 10. Mise en forme mixte dans les puces (gras, code)

| Mod     | Effets                                                                     |
| ------- | -------------------------------------------------------------------------- |
| `mod-S` | • **Padding** : réduit<br>• **Icône** : `size-S`<br>• **Titre** : taille S |

## 11. Tableau entièrement en HTML (pour un bloc Code avec aperçu)

<table>
	<thead>
		<tr><th>Mod</th><th>Effets</th></tr>
	</thead>
	<tbody>
		<tr>
			<td><code>mod-S</code></td>
			<td><ul><li>Padding réduit</li><li>Icône bulle plus petite</li><li>Titre en taille S</li></ul></td>
		</tr>
		<tr>
			<td><code>mod-fancyDark</code></td>
			<td><ul><li>Fond sombre</li><li>Icône bulle visible</li></ul></td>
		</tr>
	</tbody>
</table>
