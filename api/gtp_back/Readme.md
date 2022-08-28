# API Gestion 

# Principaux Services

- Authentification : Contient tous les microservices permettant de s'authentifier à l'application mobile de manière sécurisée
    
    Exemple : microservice permettant de s'authentifier

    1. **Route** : /api/auth/login
    2. **Type de requête** : 
        - POST  
        - **json data**
        - (key1 : "username", type_value1 : String - Nom d'utilisateur)) 
        - (key2 : "password", type_value2 : String - Mot de passe) 
    3. **Réponse** : json (token, hashed_password, id, username)

- Gestion des plaques : Permet de récupérer les plaques scannées par l'utilisateur, de les ajouter et de les supprimer

    Exemple : microservice de récupération de toutes les plaques d'un utilisateur

    1. **Route** : /api/plate/all
    2. **Type de requête** : 
        - GET  
    3. **Réponse** : json

- Gestion des scans : Permet de récupérer les scans effectués par l'utilisateur, de les ajouter et de les supprimer

    Exemple : microservice de récupération de tous les scans d'un utilisateur

    1. **Route** : /api/scan/all
    2. **Type de requête** : 
        - GET  
    3. **Réponse** : json