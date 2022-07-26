import tensorflow as tf
from keras.preprocessing.image import ImageDataGenerator
import cv2 as cv
import numpy as np
from imutils import paths
import shutil
import random
import json

### Définition de fonctions
def add_noise(np_tensor):
    ''' Fonction qui permet d'ajouter du bruit à l'image
        Auteur initial : Anand Borad
    '''
    def gaussian_noise(img):
        mean = 0
        # variance: randomly between 1 to 25
        var = np.random.randint(1, 26)
        # sigma is square root of the variance value
        noise = np.random.normal(mean,var**0.5,img.shape)
        return np.clip(img + noise, 0, 255).astype('int')

    noisy_img = gaussian_noise(np_tensor)
    return np.array(noisy_img)

def get_id_car(image_name, prefix, suffix):
    '''Renvoie l'id de l'image à partir de la chaîne de caractères qui constitue son nom
    '''
    #result = re.search('{prefix}(.*){suffix}', image_name)
    result = image_name[len(prefix):-len(suffix)]
    return int(result)

### Initialisations, variables globales
FIRST_IMG = 1001
ABSOLUTE_PATH = 'C:/Users/Loune/Documents/GetThePlate/Custom_Dataset/augmentation/'
NB_AUGMENTATIONS = 3 # Modifier cette valeur si le nombre de copies d'une seule image venait à changer
NB_IMAGES_BASE = 0 # Cette valeur sera assignée lorsque le dossier contenant les images sera lu

images_dict = {
    'prefix' : 'Car_',
    'suffix' : '.jpg',
    'dest_folder' : 'images_results/',
    'source_folder' : 'images_base/'
}

annot_dict = {
    'prefix' : 'Car_',
    'suffix' : '.txt',
    'dest_folder' : 'annot_results/',
    'source_folder' : 'annot_base/'
}

# Le dictionnaire suivant servira à localiser l'id des copies des images
# Exemple si les copies de l'image 1 sont : 23, 195 et 551 alors on aura dans le dictionnaire :
# Clé : 1, Valeur : [23, 195, 551]
doublons_dict = {}

# Lecture des images
data = [cv.imread(elt) for elt in list(paths.list_images(images_dict['source_folder']))]
samples = [np.expand_dims(img, 0) for img in data]

NB_IMAGES_BASE = len(data)

# Tab_ids contient les id des images sans le préfixe et le suffixe (int)
tab_ids = [get_id_car(elt, images_dict['source_folder']+images_dict['prefix'], images_dict['suffix']) for elt in list(paths.list_images(images_dict['source_folder']))]

for id in tab_ids:
    doublons_dict[str(id)] = []

# Définition des paramètres de la data augmentation
datagen = []
# On définit trois instances de ImageDataGenerator
# Chacune d'elle correspondant à une une augmentation spécifique (on veut 3 copies par image)
# On fixe la brightness à a une valeur donnée au lieu de mettre un intervalle
# La fonction add_noise permettra d'ajouter du bruit à l'image (vérifier que le bruit a été ajouté en zoomant dans l'image)
datagen.append(ImageDataGenerator(brightness_range=[1.7, 1.7]))
datagen.append(ImageDataGenerator(brightness_range=[0.3, 0.3]))
datagen.append(ImageDataGenerator(preprocessing_function=add_noise))

iterator = []
for dtg in datagen:
    iterator.append([dtg.flow(s, batch_size=1) for s in samples])

aug_images = []
for it_list in iterator:
    for it in it_list:
        aug_images.append(next(it)[0].astype(np.uint8))

k = 0
# limit nous informera si l'on a parcouru toutes les images de l'augmentation
limit = 0
for img in aug_images:
    # On sauvegarde la nouvelle image augmentée
    cv.imwrite(images_dict['dest_folder']+images_dict['prefix']+str(FIRST_IMG+k)+images_dict['suffix'], img)
    # On copie le label correspondant
    shutil.copy(ABSOLUTE_PATH+annot_dict['source_folder']+annot_dict['prefix']+str(tab_ids[limit])+annot_dict['suffix'] , ABSOLUTE_PATH+annot_dict['dest_folder']+annot_dict['prefix']+str(FIRST_IMG+k)+annot_dict['suffix'])
    # On met à jour le dictionnaire de doublons
    doublons_dict[str(tab_ids[limit])].append(FIRST_IMG+k)

    k+=1
    limit+=1

    # limit est réinitialisé lorsqu'on a parcouru toutes les images pour une augmentation donnée
    if limit==NB_IMAGES_BASE:
        limit=0

# On sauvegarde le dictionnaire de correspondances
with open('related_ids.txt', 'w') as related_file:
     related_file.write(json.dumps(doublons_dict))