  <summary>1. Si vous utilisez Linux :</summary>  
    
        Exécutez les commandes suivantes à partir de la racine du projet :

        ```bash
        user@DESKTOP:~/AutomaticLPDR$ python3.9 -m venv
        user@DESKTOP:~/AutomaticLPDR$ source gtp/bin/activate
        ```

        La suite de la procédure dépend de la disponibilité d'un GPU dans votre machine :

            2.1. Si vous avez un GPU NVIDIA et que vous souhaitez l'utiliser :
                - Vérifiez que vous avez installé le Toolkit **CUDA** ainsi que **cuDNN**
                - Exécutez la commande suivante : 

                **Attention : Veillez bien à modifier les trois dernières lignes du fichier windows_gpu_requirements.txt pour indiquer la version de CUDA installée sur votre machine, par défaut nous considérons que vous disposez de CUDA 11.3**

                ```bash
                (gtp) user@DESKTOP:~/AutomaticLPDR$ pip install -r requirements/linux_gpu_requirements.txt
                ```
            
            2.2. Si vous **ne disposez pas** de GPU, ou que vous souhaitez utiliser votre CPU :
                - Exécutez la commande suivante : 

                ```bash
                (gtp) user@DESKTOP:~/AutomaticLPDR$ pip install -r requirements/linux_cpu_requirements.txt
                ```

        Pour finir, exécuter la commande suivante :

                ```bash
                (gtp) user@DESKTOP:~/AutomaticLPDR$ pip install -v -e recognition_module
                ```
    </details>


    <details>
      <summary>2. Si vous utilisez Windows :</summary>   

        - Pensez à définir la version 3.9.x de python comme version principale dans votre PATH, si vous en avez plusiers.
        - Installez **Microsoft Visual Studio Code 2019** qui vous permettra d'installer l'extension **Microsoft Visual C++ 2015-2019 Redistributable** correspondante. 
        - Exécutez les commandes suivantes à partir de la racine du projet :

        ```console
        C\Users\Me\AutomaticLPDR> python -m venv
        C\Users\Me\AutomaticLPDR> source gtp/bin/activate
        ```
        - La suite de la procédure dépend de la disponibilité d'un GPU dans votre machine :

            2.1. Si vous avez un GPU NVIDIA et que vous souhaitez l'utiliser :
                - Vérifiez que vous avez installé le Toolkit **CUDA** ainsi que **cuDNN**
                - Exécutez la commande suivante : 

                ```console
                (gtp) C\Users\Me\AutomaticLPDR> pip install -r requirements/windows_gpu_requirements.txt
                ```

                **Attention : Veillez bien à modifier les trois dernières lignes du fichier windows_gpu_requirements.txt pour indiquer la version de CUDA installée sur votre machine, par défaut nous considérons que vous disposez de CUDA 11.3**
                
            2.2. Si vous **ne disposez pas** de GPU, ou que vous souhaitez utiliser votre CPU :
                - Exécutez la commande suivante : 

                ```console
                (gtp) C\Users\Me\AutomaticLPDR> pip install -r requirements/windows_cpu_requirements.txt
                ```
        
        - Pour finir, exécuter la commande suivante :

                ```bash
                (gtp) C\Users\Me\AutomaticLPDR> pip install -v -e recognition_module
                ```
    </details>
    Lorsque toutes les dépendances ont été correctement installées, il suffit de vous rendre dans le dossier de votre choix afin d'en tester les fonctionnalités.