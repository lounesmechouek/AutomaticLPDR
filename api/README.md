# GetThePlate Rest API

## Description
Ce dossier contient le code source des API REST de notre projet. Elles sont basées sur le framework Flask :
    
- L'API de reconnaissance de plaques d'immatriculation qui utilise le modèles YOLO et SAR pour détecter les plaques dans une image et renvoyer les caractères dans un format json. Il propose trois services pour la détection, la reconnaissance et la détection + reconnaissance. Plus d'informations sont accessibles dans le README du dossier flask_data_app.

- L'API de gestion de l'application mobile qui offres aux utilisateurs des services qui permettent de se connecter, de sauvegarder les scans effectués, d'envoyer des commentaires et de marquer des plaques. Plus d'informations sont accessibles dans le README du dossier gtp_back.

## Utilisation en local
Si vous souhaitez utiliser une API en local, il suffit de lancer cette dernière depuis votre terminal à partir du répertoire courant et en ayant activé l'environnement virtuel gtp comme suit :

- Lancement de l'API de reconnaissance de plaques d'immatriculation
```console
(gtp) cd flask_data_app
(gtp) flask run
```	

- Lancement de l'API de gestion depuis Linux
```console
(gtp) export FLASK_APP=gtp_back
(gtp) flask run --port 8081
```

- Lancement de l'API de gestion depuis Windows
```console
(gtp) set FLASK_APP=gtp_back
(gtp) flask run --port 8081
```

Les deux API sont alors accessibles respectivement sur les ports 5000 et 8081.

## Déploiement
Les API sont déployées sur un serveur GCP et accessibles à l'adresse suivante : http://35.232.72.59

- Pour tester l'API de reconnaissance de plaques d'immatriculation, il suffit d'envoyer une requête POST à l'adresse http://35.232.72.59:5000 les routes sont décrites dans le README du dossier flask_data_app.

- Pour tester l'API de gestion, il suffit d'envoyer une requête POST à l'adresse http://35.232.72.59:8081 les routes sont décrites dans le README du dossier gtp_back.