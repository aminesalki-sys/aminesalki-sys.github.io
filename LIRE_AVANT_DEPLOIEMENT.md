# El Jadida Web Solutions — version corrigée (31 octobre 2026)

## Modifications réalisées
- Toutes les URL internes absolues utilisées pour `canonical`, `hreflang`, Open Graph et données structurées ont été harmonisées sur `https://eljadidawebsolutions.com` (sans www), y compris le sitemap et robots.txt.
- Sitemap enrichi de **22 URL** (articles éditoriaux indexables + nouvelles études de cas), sans inclure l'article test d'un octet.
- Référence image `base-de-donnée.webp` corrigée vers `base-de-donnee.webp` présent dans le dépôt.
- Favicon et icônes d'application allégés ; image hero préchargée sur l'accueil ; dimensions explicites ajoutées à **95 occurrences** d'images existantes pour améliorer la stabilité visuelle.
- Contact WhatsApp regroupé sur `wa.me/212679148046` ; appels conservés sur `tel:+212620830606`. **IMPORTANT : vérifier les deux numéros avant le déploiement** ; il n'est pas possible de connaître le vrai numéro WhatsApp à partir du code seul.
- Les 2 formulaires d'accueil EN/AR utilisent maintenant le même endpoint Formspree déjà configuré pour le reste du site ; traitement JavaScript avec accusé de réussite seulement après réponse HTTP positive, messages d'erreur et méthode classique de secours.
- Le formulaire audit ne rend plus obligatoires les champs entreprise et ville, pour limiter les abandons. Les autres informations restent disponibles mais non imposées ; les champs essentiels sont conservés.
- Collecte automatique (dans les formulaires) des paramètres de campagne UTM et de la page source ; redirection vers merci.html après succès confirmé.
- Suivi des clics WhatsApp, téléphone, demande de devis et formulaire **préparé**, mais **GA4 désactivé tant que tu n'as pas fourni ton identifiant réel** et activé par consentement des visiteurs.
- Cinq études de cas (captures fournies) avec photos WebP légères : OuiCode, DynamicMed, Sono-Ned Medical, Soprofeu, Afrah Darna Prestige. Ajout d'un portfolio visuel relié à ces pages sur Accueil et Réalisations.
- Sur **6 pages `/services/` et 10 pages commerciales principales**, ajout d'un appel à l'action vers la page de contact et les réalisations. Aucun tarif arbitraire n'a été ajouté.
- Ajout de styles focus accessibles et réduction des animations si l'utilisateur préfère moins d'animations.

## Avant de publier : trois vérifications obligatoires
1. **Confirmer le WhatsApp officiel** : l'archive initiale contient 2 numéros WhatsApp (`212679148046` et `212620830606`). La correction a choisi le premier, déjà utilisé dans les boutons flottants, mais ce choix **n'est pas validé** par le propriétaire. Si faux, remplacer `212679148046` dans tous les fichiers et dans `assets/ejws-config.js`.
2. **Confirmer la réception des formulaires** : l'endpoint `https://formspree.io/f/xpwrklqb` a été repris du site source. Teste chaque version FR/EN/AR avec une adresse autorisée, puis vérifie le mail reçu, les éventuelles protections anti-spam et la redirection vers `/merci.html`. Aucune vraie soumission n'a été faite durant la préparation.
3. **Renseigner Google Analytics 4 uniquement avec ton véritable identifiant** : dans `assets/ejws-config.js`, remplacer `ga4MeasurementId: ""` par l'ID `G-…` de ta propriété GA4. Le script n'active GA4 qu'après l'accord du visiteur. Mettre ensuite à jour ta politique de confidentialité selon les outils réellement utilisés.

## Mise en ligne sur GitHub Pages
- Sauvegarder d'abord la version actuelle du dépôt.
- Décompresser ce ZIP. Copier **le contenu** du dossier `aminesalki-sys.github.io-main/` à la racine de ton dépôt GitHub (pas le dossier parent en lui-même).
- Vérifier que le domaine personnalisé reste correct dans `CNAME`.
- Publier puis ouvrir le site sur mobile et ordinateur en navigation privée ; vérifier le logo, les menus, les 3 langues, les 5 projets et 9 formulaires.
- Rechercher dans la Search Console la propriété `https://eljadidawebsolutions.com/`, soumettre `https://eljadidawebsolutions.com/sitemap.xml`, contrôler les URL canoniques et les pages indexées.
- Pour ta fiche Google Business Profile, ajouter un lien de bouton vers : `https://eljadidawebsolutions.com/audit-gratuit.html?utm_source=google&utm_medium=organic&utm_campaign=fiche_google` (puis mesurer les contacts avec ces paramètres dans les soumissions de formulaires).

## Contrôles automatiques effectués
- Vérification syntaxique des HTML via BeautifulSoup (balises et liens statiques), XML sitemap, ressources référencées, JS avec Node si disponible, taille et existence des PNG/WebP.
- **Non testés en conditions réelles :** performances Lighthouse / CWV, délivrabilité Formspree et réception WhatsApp, classement Google, consentement et propriétés GA4.

## Actions non automatisées et encore nécessaires
- Vérifier identité officielle, coordonnées, heures et adresse sur Google Business Profile et données structurées ; ne pas masquer/supprimer l'adresse sans connaître les conditions réelles de service.
- Ajouter les vrais retours d'expérience client autorisés ; ne pas inventer témoignages, chiffres de résultats ou avis.
- Différencier manuellement les pages par villes et secteurs avec cas clients/éléments locaux vérifiables, et envisager des articles linguistiques réellement distincts (FR/EN/AR) avec `hreflang` réciproques. Les sections trilingues actuelles des articles ont été conservées pour éviter de casser leur script d'affichage.
- Tester PageSpeed Insights, Search Console et les interactions mobiles après déploiement.
- Construire le tableau de suivi des prospects (devis, montants, statut, relance) pour connaître le taux de conversion réel.

## Pourquoi ne pas modifier certains éléments ?
Le design, les images déjà présentes et les textes non vérifiés sur le terrain ont été conservés ; changer des milliers de lignes sans contrôle visuel créerait un risque inutile. La nouvelle version est conçue comme une amélioration progressive, réversible.
