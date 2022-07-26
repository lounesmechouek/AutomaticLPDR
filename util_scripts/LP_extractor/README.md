## Explication de la fonction de chaque fichier et dossier :
1. Dossiers

- annot : contient des fichiers .txt qui contiennent la position des bounding box présentes dans chaque image de voiture.
- images : contient les images de voitures
- plaques : contient les images de plaques extraites à partir des images de voitures

2. Fichiers

- plaques_labels.txt : contient les labels de toutes les plaques. Pour chaque image du dossier "plaques" on a en format écrit la plaque correspondante.
- new_labels.txt : contient une partie des labels seulement (1001 -> 2500), ce fihier a été généré automatiquement à partir des images déjà labellisées.
- related_ids.txt : fichier issu de l'étape de detection, il contient un dictionnaire qui répertorie les correspondances entre chaque "id" et ses doublons obtenus artificiellement (par augmentation) et dont l'id appartient à {1001,...,2500}

3. Scripts

- extract.py : permet d'extraire les plaques des images en exploitant les fichiers du dossier "annot". Ce script a été utilisé pour obtenir les images du dossier "plaques".
- labellisation_auto.py : ce script a été utilisé pour générer automatiquement les labels des plaques allant de 1001 à 2500 à partir des labels des plaques € {1, ... ,1000}, il permet de générer le fichier new_labels.

Remarque : Le fichier plaques_labels.txt contenait à la base seulement les labels € {1, ..., 1000} que l'on a saisi manuellement. C'est le script labellisation_auto qui a permi de générer les 1500 autres labels que l'on a ensuite incorporé au fichier plaques_labels.txt.