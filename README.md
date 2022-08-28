# GetThePlate

## Présentation
**GetThePlate** est un projet dont l'ambition est de mettre à disposition des développeurs algériens une solution **d'extraction de plaques d'immatriculation (ALPR)** à travers une api ouverte et bien documentée. Mais également de permettre aux acteurs de la vie publique algérienne (forces de l'ordre et autres) d'identifier des véhicules donnés grâce à une application mobile ergonomique permettant de scanner leur plaque d'immatriculation pour vérifier des informations en tout genre.

## Dataset
Les datasets que nous avons utilisés pour l'apprentissage de nos modèles ont été constitués par nos soins. La plupart des images ont été récupérées sur le site https://www.ouedkniss.com/

Vous pouvez les consulter au lien suivant : https://www.kaggle.com/datasets/neslousc/algerian-alpr-detection-recognition

Les 1000 premières images ont été récupérées à la main, selon des angles de prise de vues variés afin de garantir la robustesse du système. Les 1500 suivantes ont été générées en utilisant des techniques de Data Augmentation comme suit :
- 500 images parmi les 1000 ont été sélectionnées.
- Chacune des 500 images s'est vue obtenir 3 copies : la première est **surexposée à 170%** de sa luminosité de base, la deuxième est **sous-exposée à 30%** et la dernière est obtenue en ajoutant du **bruit** à l'image.

Cela porte le total à **2500 images** de véhicules algériens que nous avons labelisés selon le format de **YoloV5**

Le dataset de plaques d'immatriculation a été obtenu, quant-à-lui, à partir du premier en sélectionnant les zones de chaque image contenant la plaque d'immatriculation.

## Structure du projet
Le projet est structuré en plusieurs dossiers spécifiques à chaque grande partie de ce dernier. Il suffit d'accéder à un dossier pour consulter la documentation de ce dernier.

Si vous souhaitez tester le projet, suivez les instructions de la partie suivante.

## Getting Started

Vous devez disposer d'une version fonctionnelle de Python pour utiliser la partie Machine Learning et API de ce projet. Nous vous conseillons d'utiliser la version **3.9.9** (ou ultérieure) étant donné qu'il a été créé avec cette dernière.

**Commencez par installer les dépendances nécessaires**
### 1. Si vous utilisez Linux :
**Étape 1.** Exécutez les commandes suivantes à partir de la racine du projet

```console
user@DESKTOP:~/AutomaticLPDR$ python3.9 -m venv gtp
user@DESKTOP:~/AutomaticLPDR$ source gtp/bin/activate
```
**Étape 2** Dépend de la disponibilité d'un GPU dans votre machine :
Si vous avez un GPU NVIDIA et que vous souhaitez l'utiliser :

- Vérifiez que vous avez installé le Toolkit **CUDA** ainsi que **cuDNN**
- Exécutez la commande suivante : 
                
**Attention** : Veillez bien à modifier les trois dernières lignes du fichier windows_gpu_requirements.txt pour indiquer la version de CUDA installée sur votre machine, par défaut nous considérons que vous disposez de CUDA 11.3**

```bash
(gtp) user@DESKTOP:~/AutomaticLPDR$ pip install -r requirements/linux_gpu_requirements.txt
```

Si vous **ne disposez pas** de GPU, ou que vous souhaitez utiliser votre CPU :
        - Exécutez la commande suivante : 

```bash
    (gtp) user@DESKTOP:~/AutomaticLPDR$ pip install -r requirements/linux_cpu_requirements.txt
```
**Étape 3** : Pour finir, exécutez la commande suivante : 

```bash
(gtp) user@DESKTOP:~/AutomaticLPDR$ pip install -v -e recognition_module
```

### 2. Si vous utilisez Windows :

- Pensez à définir la version 3.9.x de python comme version principale dans votre PATH, si vous en avez plusiers.
- Installez **Microsoft Visual Studio Code 2019** qui vous permettra d'installer l'extension **Microsoft Visual C++ 2015-2019 Redistributable** correspondante. 
- Exécutez les commandes suivantes à partir de la racine du projet :
                
**Étape 1.** Exécutez les commandes suivantes à partir de la racine du projet

```console
C\Users\Me\AutomaticLPDR> python -m venv gtp
C\Users\Me\AutomaticLPDR> source gtp/bin/activate
```
**Étape 2** Dépend de la disponibilité d'un GPU dans votre machine :
Si vous avez un GPU NVIDIA et que vous souhaitez l'utiliser :

- Vérifiez que vous avez installé le Toolkit **CUDA** ainsi que **cuDNN**
- Exécutez la commande suivante : 
                
**Attention** : Veillez bien à modifier les trois dernières lignes du fichier windows_gpu_requirements.txt pour indiquer la version de CUDA installée sur votre machine, par défaut nous considérons que vous disposez de CUDA 11.3**

```bash
(gtp) C\Users\Me\AutomaticLPDR> pip install -r requirements/windows_gpu_requirements.txt
```

Si vous **ne disposez pas** de GPU, ou que vous souhaitez utiliser votre CPU :
- Exécutez la commande suivante : 

```bash
(gtp) C\Users\Me\AutomaticLPDR> pip install -r requirements/windows_cpu_requirements.txt
```
**Étape 3** : Pour finir, exécutez la commande suivante : 

```bash
(gtp) C\Users\Me\AutomaticLPDR> pip install -v -e recognition_module
```

Lorsque toutes les dépendances ont été correctement installées, il suffit de vous rendre dans le dossier de votre choix afin d'en tester les fonctionnalités.