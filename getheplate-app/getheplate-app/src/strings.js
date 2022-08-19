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
            newScan : "Faire un nouveau scan",
            cancel : "Annuler",
            getFromGallery : "Importer depuis la galerie",
            takePhoto : "Prendre une photo",
            back : "Retour",
            delete : "Supprimer",
            addNote: "Ajouter un commentaire",
            mark : "Marquer",
            marked : "Marqué",
            detect : "Détecter la plaque",
            save : "Enregistrer",
            nosave : "Ne pas enregistrer",
            backHome : "Retour a l'accueil",
            tryAgain : "Réessayer"
        },
        titles:{
            image : "Votre image",
            traitment : "Traitement de l'image",
            result : "Resulat",
            yourPlates : "Vos Plaques"
        },
        home : {
            youPlates : "Vos Plaques",
            precision : "Précision",
            took_at : "Prise le",
            noscan : "Aucun scan retrouvé"
        },
        addScan : {
            option : "Veuillez selectionner l’une des options suivantes"
        },
        alerts :{
            beforeScan : "Assurez vous qu’il ya au plus une seule plaque apparante dans l’image qui devrait etre lisible au moins a l’oeil nue, et ce pour assurer un resultat correct ",
            scanning : "Nous utilisons des Algorithmes bases sur l’apprentissage machine pour detecter les plaques d’imatrictulation",
            noDetection : "Aucune Plaque n’a ete trouve dans l’image !",
            errorScan : "Un probleme est survenue lors de la detection"
        }
    }
}
export default strings[selectedLanguage]