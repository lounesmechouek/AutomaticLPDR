import json


### Définition de fonctions
def get_id_car(image_name, prefix, suffix):
    '''Renvoie l'id de l'image à partir de la chaîne de caractères qui constitue son nom
    '''
    result = image_name[len(prefix):-len(suffix)]
    # On sépare les parties (ex: 197_2 ; on renvoie [197, 2])
    splitted = result.split('_')
    return splitted

### Initialisations, variables globales
ABSOLUTE_PATH = 'C:/Users/Loune/Documents/GetThePlate/Custom_Dataset/extracteur_plaques/'
FILE_LABELS_PLAQUES = ABSOLUTE_PATH+'plaques_labels.txt'
FILE_CORRESPONDANCES = ABSOLUTE_PATH+'related_ids.txt'
FILE_SAUV = ABSOLUTE_PATH+'new_labels.txt'

labels_properties = {
    'prefix': 'plaques/Car_',
    'suffix': '.jpg',
    'source_file' : 'plaques_labels.txt'
}

images_propreties = {
    'prefix': 'Car_',
    'suffix': '.jpg',
    'source_folder' : 'plaques/'
}

## 1ère partie
### Nous allons construire un dictionnaire qui regroupe { 'id_image' : ['plaque1', 'plaque2'], ..., ['plaquen']}
### Et cela pour les 1000 premières images à partir du fichier de labellisation
plaques_labels = {}


with open(ABSOLUTE_PATH+labels_properties['source_file']) as file:
    lines = [line for line in file]
    for l in lines:
        splitted_line = l.split(' ') # Le nom du fichier et le label sont séparés

        # On récupère l'id de l'image
        id_image = get_id_car(splitted_line[0], labels_properties['prefix'], labels_properties['suffix'])
        # Si l'on a pas encore de labels pour cet id, on init un tableau
        if id_image[1]=='1':
            plaques_labels[str(id_image[0])] = []
        
        # On ajoute à la liste de cet id, le label correspondant
        plaques_labels[str(id_image[0])].append(splitted_line[1].rstrip()) 
## 2e PARTIE
### On utilise le dictionnaire que l'on a construit précedemment pour labeliser les nouvelles plaques
### Pour cela, on utilisera un autre dictionnaire que l'on a construit à l'étape de l'augmentation
### Il regroupe les correspondances entre chaque image de base {1, 1000} et ses copies € {1001, 2500}

# On récupère les correspondances
with open(FILE_CORRESPONDANCES) as json_correspondances:
    corresp_dict = json.load(json_correspondances)

result_labels = []
label = ''

for (id, corresp) in corresp_dict.items():
    # Pour chaque id, on a k doublons (images augmentées)
    # Exemple : [1001 , 1501, 2001] sont toutes des images obtenues à partir de l'image d'id 10
    plaque_num = 1
    for augmented in corresp:
        # Nous allons créer autant de labels qu'il y a de plaques dans l'image
        for pl in plaques_labels[str(id)]:
            label = labels_properties['prefix']+str(augmented)+'_'+str(plaque_num)+labels_properties['suffix']+' '+str(pl)
            result_labels.append(label)
            plaque_num+=1
        plaque_num = 1

print(result_labels)
print("Length : " + str(len(result_labels)))

result_labels.sort()

with open(FILE_SAUV, 'w+') as file_dest:
    for line in result_labels:
        file_dest.write(f"{line}\n")
    





