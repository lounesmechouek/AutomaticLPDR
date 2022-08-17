import os, shutil
from numpy import result_type
from flask import Flask, request, redirect, send_file, abort, jsonify
import json
from werkzeug.utils import secure_filename, send_from_directory
import subprocess
import shutil
import urllib.request
from PIL import Image

app = Flask(__name__)

###
# Version 1.0
# To be done : Unit Tests. Handle the case where multiple plates are detected in the same image.
###

### Variables globales
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(app.instance_path))) + '/'
APP_DIR = os.path.dirname(app.instance_path) + '/'
MEDIA_DIR = os.path.join(os.path.dirname(app.instance_path), 'media/')
DETECTION_DIR = os.path.join(ROOT_DIR, 'detection_module/')
RECOGNITION_DIR = os.path.join(ROOT_DIR, 'recognition_module/')

SAVING_FOLDERS = [
    os.path.join(MEDIA_DIR, 'plaques'),
    os.path.join(MEDIA_DIR, 'voitures'),
    os.path.join(APP_DIR, 'results_detection'),
    os.path.join(APP_DIR, 'results_recognition')
]

# Champs 3 et 14 à remplir dynamiquement dans la requête
detect_props = [
    os.path.join(ROOT_DIR, 'gtp/Scripts/python.exe'),
    os.path.join(DETECTION_DIR, 'detect.py'),
    '--source', '' ,
    '--weights', os.path.join(DETECTION_DIR, 'models/alpr/detection_weights.pt'),
    '--save-crop', '--iou-thres', '0.5', 
    '--data', os.path.join(DETECTION_DIR , 'data/license_plates.yaml'),
    '--project', 'results_detection',
    '--name', '',
]

# Champ 2 à remplir dynamiquement dans la requête
recog_props = [
    os.path.join(ROOT_DIR, 'gtp/Scripts/python.exe'),
    os.path.join(RECOGNITION_DIR, 'mmocr/utils/ocr.py'), '', # fichier source
    '--det', 'None',
    '--recog', 'SAR',
    '--recog-config', os.path.join(RECOGNITION_DIR, 'models/sar_r31_parallel_decoder_alpr.py'),
    '--recog-ckpt', os.path.join(RECOGNITION_DIR, 'models/recognition_weights.pth'),
    '--export', 'results_recognition',
    '--config-dir', os.path.join(RECOGNITION_DIR, 'configs/')
]

tab_extentions = ['jpg', 'jpeg', 'png', 'bmp', 'gif', 'tif', 'tiff', 'dng', 'webp', 'mpo']

### DÉFINITION DES FONCTIONS UTILES
def check_form_inputs(fname, img):
    '''Vérification des champs de la requête
    '''
    # Première vérification : existence
    if fname!='' and fname!=None and img!=None:
        # Second vérification : adéquation du format
        tab_name = fname.split('.')
        if len(tab_name)==2 and tab_name[1] in tab_extentions:
            return True
    return False

def make_prediction(model_type, infos, args, dismiss=False):
    '''Fonction générale qui permettra d'effectuer une prédiction (détection ou reconnaissance)
    model_type : 'detection' | 'reconnaissance'
    infos : dictionary qui doit contenir au moins les clés "filename" et img
    args : dictionary contenant les arguments dynamiques à ajouter lors de l'exécution du thread
           {indice_dans_tableau_d'arguments, valeur}
    dismiss: Si à True, durant la reconnaissance, l'image n'est pas copiée dans le répertoire "plaques"

    return :
        0 : erreur liée aux arguments fournis
        1 : erreur liée au modèle
        2 : erreur liée au fichier (manquant)
        String : congratulations !
    '''
    tab_arguments = []
    result_path = ''

    if model_type == 'detection':
        tab_arguments = detect_props
        try:
            # On load l'image depuis le lien fourni
            urllib.request.urlretrieve(infos['img'], os.path.join(MEDIA_DIR, 'voitures/'+infos['filename']))

        except Exception:
            # Le fichier fourni est introuvable
            return 0
        result_path = os.path.join(
            APP_DIR, 
            #'results_detection/'+infos['filename'].split('.')[0]+'/'+infos['filename']
            'results_detection/'+infos['filename'].split('.')[0]+'/crops/license_plate/'+infos['filename']
        )
    elif model_type == 'reconnaissance':
        tab_arguments = recog_props
        if dismiss is False:
            try :
                # Si dismiss est à faux, donc on demande une reconnaissance sans détection
                # On récupère l'image de plaque depuis le lien fourni :
                urllib.request.urlretrieve(infos['img'], os.path.join(MEDIA_DIR, 'plaques/'+infos['filename']))
                #infos['img'].save(os.path.join(MEDIA_DIR, 'plaques/'+infos['filename']))
            except Exception:
                # Le fichier fourni est introuvable
                return 0
        names = infos['filename'].split('.')
        result_path = os.path.join(
            APP_DIR,
            'results_recognition/'+'out_'+names[0]+'.json'
        )
    else:
        return 0
    
    # On ajoute les arguments dynamiques nécessaires :
    for k, v in args.items():
        tab_arguments[int(k)] = v
    
    # Dans le cas où une erreur ait eu lieu durant l'inférence :
    try:
        subprocess.check_output(tab_arguments)
    except:
        return 1
    
    # Dans le cas où le fichier résultant ne se serait pas correctement enregistré :
    if not os.path.exists(result_path) or result_path == '':
        return 2

    # Tout est ok
    return result_path

def handle_returns(path):
    if path==-1:
        abort(500, description="Internal Error. Something went wrong during the execution process.")
    # Sortie avec 0 : Les arguments donnés à make_prediction sont erronés
    elif path==0:
        abort(500, description="Internal Error. Arguments given for detection are incorrect.")
    # Sortie avec 1 : Problème lors de l'inference
    elif path==1:
        abort(501, description="Model Error. A problem occured during the inference process. Please contact an admin to notice him -> hl_mechouek@esi.dz")
    # On vérifie qu'on a bien obtenu une prédiction dans le répertoire
    elif path==2:
        abort(404, description="Result file has not been found after detection or recognition.")
    # Si l'on est arrivé jusqu'ici, le fichier a bien été sauvegardé. On peut renvoyer ce dernier au client
    else:
        return True

def clean_folders():
    pth = ''
    for folder in SAVING_FOLDERS:
        for filename in os.listdir(folder):
            if filename != '.gitignore': 
                pth = os.path.join(folder, filename)
            try:
                if os.path.isfile(pth) or os.path.islink(pth):
                    os.unlink(pth)
                elif os.path.isdir(pth):
                    shutil.rmtree(pth)
            except Exception as e:
                print('Failed to delete %s. Reason: %s' % (pth, e))

### Error handlers
@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.errorhandler(500)
def internal_error(e):
    return jsonify(error=str(e)), 500

@app.errorhandler(501)
def model_error(e):
    return jsonify(error=str(e)), 501

### detection route
# Couvre le cas où le client souhaite faire une detection d'objet  sans OCR
@app.route('/makedetection', methods=['POST'])
def makedetection():
    if request.method == "POST":
        clean_folders()
        # On récupère le corps de la requête et on vérifie les entrées
        filename = ''
        img = ''
        try:
            content = request.json
            filename = secure_filename(content['filename'])
            img = content['img']
            if check_form_inputs(filename, img) == False:
                raise(Exception)
        except Exception:
            abort(500, description="Wrong arguments. Check the name of the arguments and their format.")
        
        result_path = -1
        try:
            result_path = make_prediction(
                            'detection', 
                            {'img': img, 'filename':filename},
                            # Les arguments suivants sont donnés dynamiquement
                            {3: os.path.join(MEDIA_DIR, 'voitures/'+filename) , 14: filename.split('.')[0]}
                        )
        except Exception:
            abort(500, description="Wrong http request type.")

        if handle_returns(result_path) is True:
            result = Image.open(result_path)
            clean_folders()
            return send_file(result, as_attachment=True) 
    else:
        abort(500, description="Wrong http request type.")

### recognition route 
# Couvre le cas où le client souhaite faire une reconnaissance optique sans détection d'objet
@app.route('/makerecognition', methods=['POST'])
def makerecognition():
    if request.method == "POST":
        clean_folders()
        # On récupère le corps de la requête et on vérifie les entrées
        filename = ''
        img = ''
        try:
            content = request.json
            filename = secure_filename(content['filename'])
            img = content['img']
            if check_form_inputs(filename, img) == False:
                raise(Exception)
        except Exception:
            abort(500, description="Wrong arguments. Check the name of the arguments and their format.")
        
        result_path = -1
        try:
            result_path = make_prediction(
                            'reconnaissance', 
                            {'img': img, 'filename':filename},
                            # Les arguments suivants sont donnés dynamiquement
                            {2: os.path.join(MEDIA_DIR, 'plaques/'+filename)}
                        )
        except Exception:
            abort(500, description="Wrong http request type.")

        if handle_returns(result_path) is True:
            with open(result_path) as json_file:
                result = json.load(json_file)
                clean_folders()
                return result
            #return send_file(result_path, as_attachment=True) 
    else:
        abort(500, description="Wrong http request type.")

## full alpr route
# Faire une detection puis une reconnaissance optique (renvoyer la plaque à partir d'une photo de véhicle)
@app.route('/getplatenumber', methods=['POST'])
def getplatenumber():
    if request.method == "POST":
        clean_folders()
        # On récupère le corps de la requête et on vérifie les entrées
        filename = ''
        img = ''
        try:  
            content = request.json
            filename = secure_filename(content['filename'])
            img = content['img']
            if check_form_inputs(filename, img) == False:
                raise(Exception)
        except Exception:
            abort(500, description="Wrong arguments. Check the name of the arguments and their format.")

        result_path = -1
        try:
            result_path = make_prediction(
                            'detection', 
                            {'img': img, 'filename':filename},
                            # Les arguments suivants sont donnés dynamiquement
                            {3: os.path.join(MEDIA_DIR, 'voitures/'+filename) , 14: filename.split('.')[0]}
                        )
        except Exception:
            abort(500, description="Wrong http request type.")

        if handle_returns(result_path) is True:
            # On passe à la reconnaissance
            shutil.copy(result_path, os.path.join(MEDIA_DIR, 'plaques/'+filename))
            new_path = -1

            # Ajouter ici la gestion du cas où il ya plusieurs plaques dans l'image
            # Changer new_path en un tableau
            # Vérifier le répertoire de résultats de detection
            # Compter le nombre de plaques dans le répertoire de résultats de detection
            # Faire une boucle pour la reconnaissance de chaque plaque et append à new_path

            try:
                new_path = make_prediction(
                                'reconnaissance', 
                                {'img': img, 'filename':filename},
                                # Les arguments suivants sont donnés dynamiquement
                                {2: os.path.join(MEDIA_DIR, 'plaques/'+filename)},
                                dismiss=True
                            )
            except Exception:
                abort(500, description="Wrong http request type.")
            
            if handle_returns(new_path) is True:
                with open(new_path) as json_file:
                    result = json.load(json_file)
                    clean_folders()
                    return result
                    #return send_file(new_path, as_attachment=True) 
    else:
        abort(500, description="Wrong http request type.")
