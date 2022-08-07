import os
import unittest
import io
from flask import Flask
import requests
from app import make_prediction, check_form_inputs
from werkzeug.datastructures import FileStorage

# On définit des variables dont on aura besoin pour les tests
app = Flask(__name__)

BASE_DEV = 'http://127.0.0.1:5000'

ROOT_DIR = os.path.dirname(os.path.dirname(os.path.dirname(app.instance_path))) + '/'
MEDIA_DIR = os.path.join(os.path.dirname(app.instance_path), 'media/')
API_DIR = os.path.join(ROOT_DIR, 'api/flask_data_app/')

img_voiture = "https://i.imgur.com/WmXewoY.jpg"
img_plaque = "https://i.imgur.com/Rkgd9sg.jpg"
'''
with open('unit_test.jpg', 'rb') as fv:
    img_voiture = io.BytesIO(fv.read())
    img_voiture = FileStorage(img_voiture, 'unit_test.jpg', name='file', content_type='image/jpg')
with open('unit_test1.jpg', 'rb') as fp:
    img_plaque = io.BytesIO(fp.read())
    img_plaque = FileStorage(img_plaque, 'unit_test1.jpg', name='file', content_type='image/jpg')
'''


# Tests relatifs aux fonctions utilisées (unitaires)
class TestUtilityFunctions(unittest.TestCase):
    def setUp(self):
        self.tearDown()
        self.model_type = ['detection', 'reconnaissance', 'other']
        # Si modification de self.info, pensez à modifier les fonctions également (assertEqual)
        self.info = {
            "filename_det": "unit_test.jpg",
            "img_det": img_voiture,
            "filename_rec": "unit_test1.jpg",
            "img_rec": img_plaque
        }

    def tearDown(self):
        pass

    ## Tests pour la fonction "make_prediction"
    # Test du cas où la détection se fait sans problème
    def test_detection_out_path(self):
        infos = {}
        infos["filename"] = self.info["filename_det"]
        infos["img"] = self.info["img_det"]

        res = make_prediction(
            self.model_type[0],
            infos,
            {3: os.path.join(MEDIA_DIR, 'voitures/'+infos['filename']) , 14: infos['filename'].split('.')[0]}
        )

        # Le fichier résultat est bien dans le dossier
        self.assertEqual(res[-61:], "results_detection/unit_test/crops/license_plate/unit_test.jpg")
    
    # Test du cas où la reconnaissance se fait sans problème
    def test_reconnaissance_out_path(self):
        infos = {}
        infos["filename"] = self.info["filename_rec"]
        infos["img"] = self.info["img_rec"]

        res = make_prediction(
            self.model_type[1],
            infos,
            {2: os.path.join(MEDIA_DIR, 'plaques/'+infos["filename"])}
        )

        self.assertEqual(res[-39:], "results_recognition/out_unit_test1.json")
    
    # Test du cas où l'on a donné une chaîne incohérente pour le type de modèle
    def test_prediction_out_status_0(self):
        res = make_prediction(
            self.model_type[2],
            self.info,
            {"Whatever"}
        )
        self.assertEqual(res, 0)
    
    # Test du cas où le fichier donné est introuvable
    def test_detection_out_status_0_2(self):
        infos = {}
        infos["filename"] = self.info['filename_det']
        infos["img"] = None

        res = make_prediction(
            self.model_type[0],
            infos,
            {3: os.path.join(MEDIA_DIR, 'voitures/'+infos['filename']) , 14: infos['filename'].split('.')[0]}
        )

        self.assertEqual(res, 0)
         
    # Test du cas où le modèle de détection renvoie une erreur
    def test_detection_out_status_1(self):
        # Exemple : On donnera un argument erroné au modèle ('random')
        # Dans ce cas, il ne trouvera pas le fichier et renverra une exception
        inf = {}
        inf["filename"] = self.info["filename_det"]
        inf["img"] = self.info["img_det"]

        res = make_prediction(
            model_type=self.model_type[0],
            infos=inf,
            args={3: "random" , 14: inf['filename'].split('.')[0]}
        )

        self.assertEqual(res, 1)

    # Test du cas où le modèle de reconnaissance renvoie une erreur
    def test_reconnaissance_out_status_1(self):
        infos = {}
        infos["filename"] = self.info["filename_rec"]
        infos["img"] = self.info["img_rec"]

        res = make_prediction(
            self.model_type[1],
            infos,
            {2: "random"}
        )

        self.assertEqual(res, 1)
    '''    
    # Test du cas où le fichier résultant est mal sauvegardé/introuvable
    def test_prediction_out_status_2(self):
        # infos["filename"] est erroné, le fichier résultant sera introuvable
        # car stocké à un endroit et indiqué à un autre
        infos = {}
        infos["filename"] = self.info["filename_det"]
        infos["img"] = self.info["img_det"]

        res = make_prediction(
            self.model_type[0],
            infos,
            {3: os.path.join(MEDIA_DIR, 'voitures/'+"hello_unitest.jpg") , 14: "hello_unitest.jpg".split('.')[0]}
        )

        self.assertEqual(res, 2)
    '''
    
    # Test des entrées
    # Comme les tests sont simples, nous allons les faire dans la même fonction
    def test_inputs(self):
        #1 filename chaine vide et image ok
        fname = ''
        img = self.info["img_det"]

        self.assertFalse(check_form_inputs(fname, img))

        #2 filename none et image ok
        fname = None
        img = self.info["img_det"]

        self.assertFalse(check_form_inputs(fname, img))

        #3 image none et filename ok
        fname = "random"
        img = None

        self.assertFalse(check_form_inputs(fname, img))

        #4 filename ok, image ok mais format erroné
        fname = "random"
        img = self.info["img_det"]

        self.assertFalse(check_form_inputs(fname, img))

        #5 filename ok, image ok, format ok
        fname = "unit_test.jpg"
        img = self.info["img_det"]

        self.assertTrue(check_form_inputs(fname, img))

'''
# Tests relatifs aux endpoints
class TestEndPoints(unittest.TestCase):
    def setUp(self):
        self.tearDown()
        self.model_type = ['detection', 'reconnaissance', 'other']
        # Si modification de self.info, pensez à modifier les fonctions également (assertEqual)
        self.info = {
            "filename_det": "unit_test.jpg",
            "img_det": img_voiture,
            "filename_rec": "unit_test1.jpg",
            "img_rec": img_plaque
        }

    def tearDown(self):
        pass

    # On définit des fonctions qui nous permettront d'envoyer des requêtes
    def send_post_request(self, route, filename, img):
        files = {'img': img}
        form = {'filename': filename}
        return requests.post(
            route,
            files=files,
            data=form
        )

    # Les tests d'erreur ne sont fait que pour /make_detection
    # Étant donné que les résultats ne dépendent pas de l'exécution du modèle
    # A part pour l'erreur 501
    def test_detection_500_request(self):
        # Premier cas : On envoie une requête "GET"
        self.assertTrue(True)
    
    def test_detection_500_arguments(self):
        self.assertTrue(True)
    
    def test_detection_501(self):
        self.assertTrue(True)
    
    def test_recognition_501(self):
        self.assertTrue(True)
    
    def test_detection_404(self):
        self.assertTrue(True)
    
    def test_detection_correct(self):
        res = self.send_post_request(
            BASE_DEV+'/makedetection',
            self.info["filename_det"],
            self.info["img_det"]
        )

        print("################## request")
        print(res.request)
        print("################## json")
        print(res.json)
        print("################## iter_content")
        print(res.iter_content)
        #self.assertEqual(res[-61:], "results_detection/unit_test/crops/license_plate/unit_test.jpg")
'''

if __name__ == "__main__":
    unittest.main()