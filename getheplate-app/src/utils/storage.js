import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
    save : (key,value) => AsyncStorage.setItem(`@${key}` , value.toString() ) ,
    get : key => AsyncStorage.getItem(`@${key}`),
    delete : key => AsyncStorage.removeItem(`@${key}`)
}

