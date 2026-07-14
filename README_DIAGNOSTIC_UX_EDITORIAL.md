# Diagnostic UX/UI + correction visuelle

## Corrections réalisées

- Ajout du dossier `assets/` dans le pack, avec les visuels utilisés par le site.
- Ajout des visuels de services sur `services.html`, `/en/services.html` et `/ar/services.html`.
- Ajout des aperçus de réalisations sur `realisations.html`, `/en/portfolio.html` et `/ar/realisations.html`.
- Correction des textes visibles contenant des termes internes comme `CTA`, `cocon SEO`, `intention commerciale`, `recherches à capter`, `page dédiée`.
- Vérification des liens internes : aucun lien local cassé détecté.
- Vérification des images : aucune image locale manquante détectée.
- Renforcement CSS mobile pour les cartes avec images : les grilles passent en 1 colonne sur téléphone.

## Diagnostic apparence PC

- La structure est cohérente : header, hero, sections, cartes, audit gratuit et footer.
- Les pages Services et Réalisations sont maintenant plus visuelles et plus crédibles.
- Les cartes utilisent un format 16:9 homogène pour éviter une mise en page déséquilibrée.
- Le design reste cohérent avec l’identité sombre / violet / cyan du site.

## Diagnostic apparence téléphone

- Le menu mobile reste activé sous 980px.
- Les grilles passent en 2 colonnes sous tablette puis 1 colonne sous mobile.
- Les images sont en `object-fit: cover`, donc elles ne déforment pas les cartes.
- Les boutons restent en largeur complète sur mobile lorsqu’ils sont dans les sections d’action.
- Le contenu arabe garde la logique RTL sur les pages AR existantes.

## Recommandation après mise en ligne

Après upload sur GitHub, tester en navigation privée :

- `/services.html`
- `/realisations.html`
- `/en/services.html`
- `/en/portfolio.html`
- `/ar/services.html`
- `/ar/realisations.html`

Puis vider le cache mobile si l’ancienne version reste affichée.
