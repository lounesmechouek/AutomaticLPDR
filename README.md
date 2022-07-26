# GetThePlate

## Présentation
**GetThePlate** est un projet dont l'ambition est de mettre à disposition des développeurs algériens une solution **d'extraction de plaques d'immatriculation (ALPR)** à travers une api claire et bien documentée. Mais également de permettre aux acteurs de la vie publique algérienne (forces de l'ordre et autres) d'identifier des véhicules donnés grâce à une application mobile ergonomique permettant de scanner leur plaque d'immatriculation pour vérifier des informations en tout genre.

## Dataset
Les datasets que nous avons utilisés pour l'apprentissage de nos modèles ont été constitués par nos soins. La plupart des images ont été récupérées sur le site https://www.ouedkniss.com/

Vous pouvez les obtenir au lien suivant : https://www.kaggle.com/datasets/neslousc/algerian-alpr-detection-recognition

Les 1000 premières images ont été récupérées à la main, selon des angles de prise de vues variés afin de garantir la robustesse du système. Les 1500 suivantes ont été générées en utilisant des techniques de Data Augmentation comme suit :
- 500 images parmi les 1000 ont été sélectionnées.
- Chacune des 500 images s'est vue obtenir 3 copies : la première été **surexposée à 170%** de sa luminosité de base, la deuxième est **sous-exposée à 30%** et la dernière est obtenue en ajoutant du **bruit** à l'image.

Cela porte le total à **2500 images** de véhicules algériens que nous avons labelisés selon le format de **YoloV5**

Le dataset de plaques d'immatriculation a été obtenu, quant-à-lui, à partir du premier en sélectionnant les zones de chaque image contenant la plaque d'immatriculation.

## Structure du projet
Le projet est structuré en plusieurs dossiers spécifiques à chaque grande partie de ce dernier. Il suffit d'accéder à un dossier pour consulter la documentation de ce dernier.

Si vous souhaitez tester le projet, suivez les instructions de la partie ci-dessous.

## Getting Started

Vous devez disposer d'une version fonctionnelle de Python pour utiliser la partie Machine Learning et API de ce projet. Nous vous conseillons d'utiliser la version **3.9.9** (ou ultérieure) étant donné qu'il a été créé avec cette dernière.

**Commencez par installer les dépendances nécessaires, pour cela :**

- Option 1 : Ouvrez le notebook "launcher.ipynb" et suivez les instructions des parties 1,2,3 de ce dernier en exécutant ses cellules.
- Option 2 : Si vous n'êtes pas à l'aise avec les notebooks, il vous suffit d'ouvrir un invite de commande dans ce dossier et de copier/coller les commandes du notebook.

Lorsque toutes les dépendances ont été correctement installées, il suffit de vous rendre dans le dossier de votre choix afin d'en tester les fonctionnalités.\\
Vous pouvez également suivre certains exemples présents dans le notebook "launcher.ipynb" pour essayer certaines fonctionnalités liées à la detection de plaques ou à la reconnaissance de caractères.