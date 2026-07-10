# Correction finale langues FR / EN / AR

Fichiers principaux à remplacer sur GitHub :

- `index.html`
- `en/index.html`
- `ar/index.html`
- `service-worker.js`

Corrections appliquées :

- Les boutons FR / EN / AR sont de vrais liens vers `/`, `/en/` et `/ar/`.
- Les pages `/en/` et `/ar/` sont des pages complètes, pas un simple changement JavaScript.
- Les blocs français restés visibles dans les pages anglaise et arabe ont été traduits.
- Les blocs de langue masqués ont été supprimés pour éviter les pages blanches sur mobile.
- Le service worker a été modifié pour éviter de garder une ancienne version HTML en cache.

Après upload :

1. Attendre 2 à 5 minutes.
2. Tester en navigation privée.
3. Sur téléphone, vider le cache du navigateur si l’ancienne version reste affichée.
