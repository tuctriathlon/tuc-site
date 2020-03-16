# tuc-site
Site du TUC triathlon

### Installation
 * Cloner le repo git
 * installer [nodeJS LTS](https://nodejs.org/en/)
 * installer les librairies via la commande `npm i`
 * lancer un serveur de dev `npm run start`
 
 L'application est accessibles sur le port [4200](http://localhost:4200)


### Déploiement
TBD

### Règles de commit
Pour la mise à jour automatique du changelog via [standard-version](https://www.npmjs.com/package/standard-version), il faut respecter les règles définies par [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) 

`type: description`

Les principaux types sont: 
* `fix` pour les corrections de bug
* `feat` pour les nouvelles fonctionnalités
* `BREAKING CHANGE` pour les changements majeurs
D'autres types sont disponibles dans la [doc de conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

Le numéro de version est mis à jour automatiquement via la commande
`npm run release`
