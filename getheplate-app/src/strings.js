const selectedLanguage = "FR"

const strings = {
    'FR' : {
        app : {
            name: "GET THE PLATE"
        },
        placeHolder : {
            username : "Nom d'utilisateur",
            password : "Mot de passe"
        },
        button : {
            login : "Se connecter",
            newScan : "Effectuer un nouveau scan",
            cancel : "Annuler",
            getFromGallery : "Importer depuis la galerie",
            takePhoto : "Prendre une photo",
            back : "Retour",
            delete : "Supprimer",
            addNote: "Ajouter un commentaire",
            mark : "Marquer la plaque",
            unmark : "Démarquer la plaque",
            detect : "Détecter la plaque",
            save : "Enregistrer",
            nosave : "Ne pas enregistrer",
            backHome : "Retour à l'accueil",
            tryAgain : "Réessayer"
        },
        titles:{
            image : "Votre image",
            traitment : "Traitement de l'image",
            result : "Résulat",
            yourPlates : "Vos Plaques"
        },
        home : {
            youPlates : "Vos Plaques",
            precision : "Précision",
            took_at : "Prise le",
            noscan : "Il semblerai que vous n'ayez effectué aucun scan pour le moment."
        },
        addScan : {
            option : "Veuillez sélectionner l’une des options suivantes"
        },
        alerts :{
            beforeScan : "Les résultats seront plus précis avec une image de bonne qualité et une plaque bien lisible.",
            scanning : "Nous utilisons des algorithmes de deep learning pour reconnaitre les plaques d’immatriculation",
            noDetection : "Aucune plaque n’a été localisée dans l’image !", 
            errorScan : "Un problème est survenu lors du processus de reconnaissance"
        },
        scanning : {
            searching : "Recherche de Plaque...",
            segmentation : "Reconnaissance des caractères...",
            finalisation : "Finalisation"
        }
    }
}
export default strings[selectedLanguage]