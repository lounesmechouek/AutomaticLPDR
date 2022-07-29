# GetThePlate API

## DATA API
**Remarque :** Un gateway sera configuré pour gérer la route prise pour chaque API (Data/App). Pour le moment, les requêtes peuvent directement adressées vers les **micro-services**

L'API Flask propose trois micro-services :

- Récupération du numéro de plaque d'immatriculation à partir d'une image de véhicule
1. **Route** : /getplatenumber
2. **Type de requête** : 
    * POST  
    * **form data** (doit inclure une image)
    * (key1 : "filename", type_value1 : String) 
    * (key2 : "img", type_value2 : Image de véhicule) 
3. **Réponse** : json

- Récupération du texte d'une plaque à partir d'une image de plaque
1. **Route** : /makerecognition
2. **Type de requête** : 
    * POST  
    * **form data** (doit inclure une image)
    * (key1 : "filename", type_value1 : String) 
    * (key2 : "img", type_value2 : Image) 
3. **Réponse** : json

- Récupération de la zone contenant une plaque à partir d'une image de véhicule
1. **Route** : /makedetection
2. **Type de requête** : 
    * POST  
    * **form data** (doit inclure une image)
    * (key1 : "filename", type_value1 : String) 
    * (key2 : "img", type_value2 : Image de véhicule) 
3. **Réponse** : Image

**Exemple de requête effectuée avec postman**

![requete_getplatenumber](https://imgur.com/a/a7klHvR)


