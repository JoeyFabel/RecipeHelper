import Storage from 'react-native-storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const storage = new Storage({
    // maximum capacity, default 1000 key-ids
    size: 1000,
    
    // use local storage on the web, asyn storage on native
    storageBackend: Platform.OS == 'web' ? window.localStorage : AsyncStorage,

    // expire time in milliseconds - null means don't expire
    defaultExpires: null,

    // cache data in memory
    enableCache: true,

    // if data was not found in storage or the data was expired, this is called
    sync: {
        tags(params) {
            return [
                'Oven',
                'Crockpot',
                'Stovetop',
                'Soup',
            ];
        },
        ingredients(params) {
            return [
                {
                    'name': 'Canned Corn',
                    'size': '15.25 oz',
                    'type': 'Canned'
                },
                {
                    'name': 'Diced Tomatoes',
                    'size': '14.5 oz',
                    'type': 'Canned'
                },
                {
                    'name': 'Black Beans',
                    'size': '15 oz',
                    'type': 'Canned'
                },
                {
                    'name': 'Shredded Mozzarella',
                    'size': '8 oz',
                    'type': 'Refridgerated'
                }
            ]
        }
    }
});

export function saveKey(key:string, data:any, id?:string) {
    storage.save({
        key: key,
        data: data
    });
}

export function getKey(key:string) {
    return new Promise((resolve) => 
        storage.load({
            key: key,

            // If the data is not found or expired, then invoke the sync method
            autoSync: true,

        })
        .then(ret => {
            // found data, resolve the data()            

            // console.log(ret);
            resolve(ret);
        })
        .catch(err => {
            // any exception including data not found
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO
                    console.log("that data does not exist");
                    break;
            }
        })
    );
}

export function removeKey(key:string) {
    storage.remove({
        key: key,
    });
}

// export default storage;