# Recognition Module

## COPYRIGHT
This folder has been cloned from the [MMOCR](https://github.com/open-mmlab/mmocr) github repo. MMOCR is an open-source toolbox based on PyTorch and mmdetection for text detection, text recognition, and the corresponding downstream tasks including key information extraction. It is part of the OpenMMLab project.

## Approche
Notre approche pour la reconnaissance de caractères en conditions réelles a été de sélectionner le modèle Show, Attend and Read (SAR) ayant obtenu de très bons résultats pour cette tâche. Nous avons par la suite ré-entraîné le modèle sur nos données.

## **Remarque**\\
Avant d'utiliser ce dossier, vérifiez que vous avez bien ajouté les poids du modèle (recognition_weights.pth) dans le dossier "models". Si vous souhaitez utiliser les poids que nous avons obtenus lors de l'apprentissage, ils sont disponibles à ce lien : https://drive.google.com/drive/folders/1l7hYrcaZ5kwJLE7t-e4U2992W9zd0H8O?usp=sharing


## Effectuer une inférence
En supposant que image.jpg se trouve dans le dossier courant :

```console
"../gtp/Scripts/python.exe" ./mmocr/utils/ocr.py image.jpg --det None --recog SAR --recog-config models/sar_r31_parallel_decoder_alpr.py --recog-ckpt models/recognition_weights.pth --export results
```

## Ré-entraîner le modèle
1. Si vous souhaitez ré-entraîner le modèle avec notre dataset :

- Télécharger le dataset "license_plates" à ce lien : https://www.kaggle.com/datasets/neslousc/algerian-alpr-detection-recognition
- Ajouter le dossier "ocr_alpr_dataset" dans le dossier ./mmocr/tests/data
- Exécuter les cellules du notebook **training_sar.ipynb** (vérifiez que vous avez bien installé les dépendances de MMOCR)

2. Si vous souhaitez ré-entraîner le modèle avec un autre dataset, veuillez vous référer à la documentation de MMOCR.

## Tester le modèle
Les résultats sont obtenus dans le fichier results.pkl

```console
"../gtp/Scripts/python.exe" ./tools/test.py configs/textrecog/sar/sar_r31_parallel_decoder_alpr.py models/recognition_weights.pth --eval acc --out results.pkl
```

Afin de visualiser les résultats du test de manière précise, il suffit d'exécuter le notebook **visualize_results.ipynb**