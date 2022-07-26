import cv2 as cv

### Initialisations, variables globales
NB_IMAGES = 2500
ABSOLUTE_PATH = 'C:/Users/Loune/Documents/GetThePlate/Custom_Dataset/extracteur_plaques/'

base_saving = "plaques/Car_"
base_images = "images/Car_"
base_labels = "annot/Car_"
extension_img = ".jpg"
extension_lbl = ".txt"

coord_image = []
coord = []

for i in range(NB_IMAGES):
    filepath_label = ABSOLUTE_PATH+base_labels+str(i+1)+extension_lbl
    filepath_img = ABSOLUTE_PATH+base_images+str(i+1)+extension_img 

    with open(filepath_label) as file:
        lines = [line for line in file]
        # Pour chaque bounding box de l'image, on récup les coordonnées
        for l in lines:
            coord = l.split()
            coord = coord[1:5] # x, y, w, h
            coord_image.append(coord)
            coord = []

        img = cv.imread(filepath_img)
        dh, dw, _ = img.shape

        #print("Coordonnées YOLOV5 : ")
        #print(coord_image)
        # Pour chaque bounding box, on transforme les coordonnées en float
        j=0
        for crd in coord_image :
            x_center, y_center, w, h = float(crd[0]), float(crd[1]), float(crd[2]), float(crd[3])
            x_center = round(x_center * dw)
            y_center = round(y_center * dh)
            w = round(w * dw)
            h = round(h * dh)
            x = round(x_center - w / 2)
            y = round(y_center - h / 2) 

            #print("Coordonnées normales "+str(j))
            #print(str(x)+" "+str(y)+" "+str(w)+" "+str(h))

            imgCrop = img[y:y + h, x:x + w]
            j+=1

            filepath_save = ABSOLUTE_PATH+base_saving+str(i+1)+'_'+str(j)+extension_img
            cv.imwrite(filepath_save, imgCrop)
            
        coord_image = []