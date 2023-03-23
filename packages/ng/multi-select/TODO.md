# RAF


Style option disabled multi

## On cache la lib core-select en réexposant les symboles intéressants dans simple-select/multi-select ?

PROS

* Si je veux faire un select, j'importe tout depuis le même

CONS

* Si je passe de simple à multi, je dois changer mes imports
* l'auto import va potentiellement prendre le mauvais imports

## Ou faut-il dupliquer LuOptionDirective en LuSimpleOptionDirective et LuMultiOptionDirective ?

Choses qui marchent pour Simple et Multiple : 
- `*luOption`
- `*luDisplayer`
- `[apiV3]`
- `[apiV4]`
- `[luDisabledOption]`

## Todo

Repositionner le panel par dessus l'input si mode expand
