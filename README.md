# AnimPatricia — Site web

Site vitrine pour AnimPatricia, communicante animalière.
HTML5 / CSS3 / JavaScript pur — aucun framework, aucune dépendance à installer.

## Structure du projet

```
animpatricia/
├── index.html      → structure et contenu de la page
├── style.css       → système de design (couleurs, typographie, layout, responsive)
├── script.js       → interactions (menu, slider, FAQ, galerie, formulaire...)
├── manifest.json   → métadonnées PWA
├── robots.txt      → indexation SEO
└── sitemap.xml     → plan du site pour les moteurs de recherche
```

## Ouvrir le projet dans VS Code

1. Ouvrez VS Code
2. `Fichier > Ouvrir le dossier...` → sélectionnez le dossier `animpatricia`
3. Installez l'extension **Live Server** (par Ritwick Dey) si ce n'est pas déjà fait
4. Clic droit sur `index.html` → **Open with Live Server**
5. Le site s'ouvre dans votre navigateur avec rechargement automatique à chaque modification

## Personnalisation rapide

- **Couleurs** : tout est centralisé dans les variables CSS en haut de `style.css` (bloc `:root`)
- **Textes** : modifiables directement dans `index.html`
- **Images** : actuellement des photos Unsplash (libres de droits) via URL — à remplacer par de vraies photos de Patricia avant mise en ligne définitive
- **Témoignages / FAQ** : générés dynamiquement depuis des tableaux JavaScript en haut de `script.js` (variables `testimonials` et `faqData`) — ajoutez ou modifiez une entrée du tableau pour changer le contenu

## Formulaire de contact

Le formulaire valide les champs côté client mais n'envoie pas encore d'email réel (pas de backend branché). Options pour le rendre fonctionnel :
- Un service tiers comme Formspree ou EmailJS (aucun serveur à gérer)
- Un petit backend dédié (Node.js, PHP...) si vous préférez tout héberger vous-même

## Déploiement

Ce site étant 100% statique, il peut être mis en ligne gratuitement sur Netlify, Vercel ou GitHub Pages en quelques minutes, sans configuration serveur.
