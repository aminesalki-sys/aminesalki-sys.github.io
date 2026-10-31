# El Jadida Web Solutions — Formulaires Formspree
Date : 31 octobre 2026

## Destinations
- Contact / devis et formulaires d'accueil (FR/EN/AR) → https://formspree.io/f/xoeekjav
- Audit gratuit (FR/EN/AR) → https://formspree.io/f/mwllrveo

## Modifications
- 9 formulaires HTML reliés aux deux nouveaux endpoints.
- Champs de sujet email : `name="_subject"` remplacé par `name="subject"` pour des sujets de notification utilisables par Formspree.
- `assets/ejws-config.js` : deux destinations mises à jour ; GA4 `G-YH6EBERCXZ` activé et préservé.
- Aucun changement du style CSS, des boutons ou du JavaScript de traitement des formulaires.

## Déploiement navigateur GitHub
1. Sauvegarder le dépôt actuel : Code > Download ZIP.
2. Décompresser cette archive localement.
3. Dans le dépôt GitHub (branche main), cliquer sur Add file > Upload files.
4. Glisser **les fichiers et dossiers** issus de l'archive, et non l'archive ZIP elle-même.
5. Vérifier que `assets/ejws-config.js`, `en/contact.html`, `ar/audit-majani.html` restent dans leurs sous-dossiers.
6. Enregistrer les modifications après vérification. Vérifier la publication dans Actions > pages build and deployment.
7. Après déploiement, faire Ctrl+F5.

## Formspree : réception par email
Pour chacun des deux formulaires, dans Formspree :
- ouvrir Workflow, vérifier une action **Email notification** vers `amine.salki@gmail.com` ; activer/configurer si nécessaire.
- tester un envoi réel depuis le formulaire public ; vérifier sa présence dans **Submissions**, puis dans Gmail (et Spam/Promotions).
- Le compte Gmail validé ne garantit pas à lui seul que toutes les notifications email sont activées.

## Test GA4
- Accepter les cookies Analytics sur le site lors du test.
- Une fois le formulaire accepté par Formspree, le JS existant envoie `generate_lead`, ainsi que `audit_request` pour les audits.
- Vérifier les événements dans GA4 > Rapports > Temps réel. Attention aux doublons si les deux sont considérés comme événements clés pour la même soumission.

## Important
Le ZIP de référence date d'avant ton dernier changement GA4. Nous avons explicitement conservé la valeur réelle `G-YH6EBERCXZ` pour ne pas désactiver Analytics. Si tu as modifié d'autres valeurs de `assets/ejws-config.js` depuis, compare-le avec la version actuellement en ligne avant de le remplacer.

Cette version a été testée statiquement (structure et URLs) ; elle n'a pas été testée par un envoi Formspree réel.
