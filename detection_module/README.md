# Detection Module

## COPYRIGHT
This folder has been cloned from the [YoloV5](https://github.com/ultralytics/yolov5) github repo. YOLOv5 is a family of object detection architectures and models pretrained on the COCO dataset, and represents [Ultralytics](https://ultralytics.com) open-source research into future vision AI methods, incorporating lessons learned and best practices evolved over thousands of hours of research and development.

## Approche
L'approche utilisée pour l'apprentissage de notre module de détection de plaques dans diverses images en conditions réelles a consisté à utiliser le modèle de détection d'objet YOLOv5 en le ré-entrainant sur nos données. 

## **Remarque**
Avant d'utiliser ce dossier, vérifiez que vous avez bien ajouté les poids du modèle dans le dossier "models/alpr". Si vous souhaitez utiliser les poids que nous avons obtenus suite à notre apprentissage, ils sont disponibles à ce lien : https://drive.google.com/drive/folders/1l7hYrcaZ5kwJLE7t-e4U2992W9zd0H8O?usp=sharing


## Effectuer une détection (inference)
- Vérifiez que l'environnement virtuel gtp est bien activé (présence de (gtp) dans le terminal)
- En supposant que image.jpg se trouve dans le dossier courant :

```console
(gtp) python detect.py --weights ./models/alpr/detection_weights.pt --source ./image.jpg  --save-crop --iou-thres 0.5 --project results --name image --data ./data/license_plates.yaml
```

## Ré-entraîner le modèle
1. Si vous souhaitez ré-entraîner YOLOv5 avec notre dataset :

- Télécharger le dataset "vehicles" à ce lien : https://www.kaggle.com/datasets/neslousc/algerian-alpr-detection-recognition
- Mettre le dossier "license_plate" (contenu dans vehicles) au niveau du répertoire courant.

```console
(gtp) python train.py --batch 1 --epochs 30 --data ./data/license_plates.yaml --cfg ./models/yolov5s.yaml --weights yolov5s.pt --name yolov5s_alpr --cache
```

Remarque : Vous trouverez les fichiers yolov5s.yaml et yolov5s.pt sur le répertoire github YOLOv5.

2. Si vous souhaitez ré-entraîner YOLOv5 avec votre propre dataset pour la tâche d'ALPR, il suffit de déposer votre dataset dans le répertoire courant en suivant la structure du notre, puis d'exécuter la même commande que précedemment.

3. Si vous souhaitez ré-entraîner YOLOv5 avec votre propre dataset pour une autre tâche de detection d'objet, nous vous invitons à vous référer à la documentation de YOLOv5

## Tester le modèle 
Afin de vérifier les performances que nous avons affichées, vous pouvez procéder comme suit :

- Télécharger le dataset "vehicles" à ce lien : https://www.kaggle.com/datasets/neslousc/algerian-alpr-detection-recognition
- Mettre le dossier "license_plate" (contenu dans vehicles) au niveau du répertoire courant.

```console
(gtp) python val.py --data ./data/license_plates.yaml --weights models/alpr/detection_weights.pt --task test
```