# Corrections langues et affichage mobile

Corrections appliquées :

- Les boutons FR / EN / AR redirigent maintenant vers de vraies URLs : `/`, `/en/`, `/ar/`.
- La page `/en/` reprend la page d’accueil complète avec le contenu anglais.
- La page `/ar/` reprend la page d’accueil complète avec le contenu arabe et `dir=rtl`.
- Correction des chemins images/assets pour fonctionner depuis `/ar/` et `/en/`.
- Correction du switch de langue pour éviter que l’arabe soit chargé en JavaScript sur la page française.
- Renforcement de l’affichage RTL et mobile.

Fichiers à remplacer en priorité : `index.html`, `blog.html`, `ar/index.html`, `en/index.html`.
