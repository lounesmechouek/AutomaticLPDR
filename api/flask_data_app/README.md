# API Reconnaissance de plaques

## Services
L'API de reconnaissance de plaques propose trois services :

- Récupération du numéro de plaque d'immatriculation à partir d'une image de véhicule
    1. **Route** : /getplatenumber
    2. **Type de requête** : 
        - POST  
        - **json data**
        - (key1 : "filename", type_value1 : String - Nom du fichier <nom>.<format>) 
        - (key2 : "img", type_value2 : String - **URL de l'image**) 
    3. **Réponse** : json

- Récupération du texte d'une plaque à partir d'une image de plaque
    1. **Route** : /makerecognition
    2. **Type de requête** : 
        - POST  
        - **json data**
        - (key1 : "filename", type_value1 : String - Nom du fichier <nom>.<format>) 
        - (key2 : "img", type_value2 : String - **URL de l'image**) 
    3. **Réponse** : json

- Récupération de la zone contenant une plaque à partir d'une image de véhicule
    1. **Route** : /makedetection
    2. **Type de requête** : 
        - POST  
        - **json data**
        - (key1 : "filename", type_value1 : String - Nom du fichier <nom>.<format>) 
        - (key2 : "img", type_value2 : String - **URL de l'image**) 
    3. **Réponse** : Image

## Codes de statut
Les codes de statut sont les suivants :

- **200** : OK
- **404** : Not Found. Se produit lorsqu'une ressource n'est pas trouvée dans le serveur.
- **500** : Internal Server Error. Se produit dans l'un des cas suivants :
    - Type de requête erroné (GET, PUT, DELETE) au lieu de POST
    - Le nom des arguments donnés dans la requête ou leur format ne sont pas ceux attendus
    - Serveur indisponible
- **501** : Erreur interne de l'un des modèles (ou des deux). Se produit lorsqu'une exception est levée durant l'inférence d'un modèle (YOLO ou SAR).





