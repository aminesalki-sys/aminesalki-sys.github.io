# Audit SEO et correctif de maillage interne — El Jadida Web Solutions

**Analyse de l’archive GitHub transmise le 5 novembre 2026.**

## Diagnostic confirmé

- Page de Tanger, sans www : test en direct Google Search Console positif ; URL accessible à Google et demande d’indexation enregistrée (captures fournies). La page n’est pas encore signalée comme indexée dans les données de l’index.
- Variante www : redirection HTTP 301 vers la version sans www, qui répond 200 OK (captures httpstatus.io). Cette redirection ne nécessite pas de modification.
- 110 fichiers HTML dans l’archive, dont 94 URL présentes dans le sitemap.xml.
- Sitemap et canonicals : les 94 URL utilisent bien https://eljadidawebsolutions.com/ ; aucune entrée manquante par rapport aux pages indexables attendues dans cette archive.
- robots.txt : autorise l’exploration (`Allow: /`) et annonce le sitemap.
- Pages villes Tanger, Casablanca, Agadir, Rabat et Marrakech : **0 lien HTML entrant depuis les autres pages** avant cette correction. Les ancres internes (#main) étaient auparavant comptées comme des auto-liens.
- Les 6 anciennes copies de pages sous `LOT_SERVICES_6_HTML/` utilisent un canonical vers les pages `/services/` ; elles ne figurent pas dans le sitemap mais restent déployables si ce répertoire est conservé.
- Des pages techniques ou juridiques utilisent `noindex`; cela peut être volontaire et ne justifie pas de suppression automatique.

## Changements appliqués dans le paquet

- Nouveau bloc de navigation éditoriale et accessible vers les six pages villes sur `index.html`, `services.html`, `agence-marketing-maroc.html`, `seo-local-maroc.html`.
- Ajout des styles dans `assets/ejws-enhancements.css` (responsive 3/2/1 colonnes).
- Les URL et les textes d’origine des pages villes, la configuration DNS et les redirections **n’ont pas été modifiés**.
- Le sitemap et le robots.txt ont été conservés (ils n’avaient pas besoin d’être réécrits).

## Déploiement GitHub Pages

**Option rapide :** dans la racine du dépôt, remplacer les cinq fichiers présents dans le ZIP correctif par les versions fournies, en conservant exactement leur arborescence.

**Option complète :** utiliser le ZIP intégral corrigé. Il contient le reste des fichiers à l’identique (sous un dossier racine) ; pour GitHub, transférer **le contenu** du dossier racine, pas le dossier lui-même.

Après la mise en ligne :
1. Vérifier les nouveaux liens visibles sur l’accueil, les services et les pages marketing/SEO.
2. Dans Search Console, inspecter les pages **sans www** et utiliser « Tester l’URL active » avant de demander l’indexation des pages stratégiques.
3. Attendre l’exploration et surveiller le rapport d’indexation ; l’acceptation du test en direct ne garantit pas l’indexation.
4. Maintenir les redirections www → sans www en 301 ; ne pas demander l’indexation des URL www.

## Points à améliorer ensuite

1. Ajouter des exemples pertinents et différenciés aux pages Casablanca et Tanger : leur contenu textuel est assez similaire. Ne pas publier d’affirmations de présence locale non réelles.
2. Vérifier la valeur éditoriale de chaque page ville : pages uniquement créées en remplaçant le nom de la ville = risque de faible utilité.
3. Réviser les anciens fichiers de travail `LOT_SERVICES_6_HTML/` et `articles/test.html` avant de les supprimer : des liens externes éventuels ne sont pas visibles dans l’archive.
4. Contrôler régulièrement l’indexation des URL finales, et non des URL redirigées.

**Limites :** ce correctif améliore le maillage interne et la découverte potentielle. Ni le ZIP ni les tests HTTP ne peuvent garantir l’indexation ou le classement de Google. Aucun déploiement vers GitHub n’a été réalisé.
