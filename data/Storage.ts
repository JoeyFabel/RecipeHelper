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
                {'name': 'Oven', 'color': 'red'},
                {'name': 'Crockpot', 'color': '#2574f4'},
                {'name': 'Stovetop', 'color': 'green'},
                {'name': 'Soup', 'color': 'yellow'},
            ];
        },
        ingredients(params) {
            return [
                {
                    'name': 'Canned Corn',
                    'size': '15.25 oz',
                    'type': 'Canned',
                    'price': '',
                },
                {
                    'name': 'Diced Tomatoes',
                    'size': '14.5 oz',
                    'type': 'Canned',
                    'price': '',
                },
                {
                    'name': 'Black Beans',
                    'size': '15 oz',
                    'type': 'Canned',
                    'price': '',
                },
                {
                    'name': 'Shredded Mozzarella',
                    'size': '8 oz',
                    'type': 'Dairy',
                    'price': '',
                },
                {
                    'name': 'Marinara Sauce',
                    'size': '26 oz',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Pepperoni',
                    'size': '4 oz',
                    'type': 'Refridgerated',
                    'price': ''
                },
                {
                    'name': 'Bell Pepper',
                    'size': '1',
                    'type': 'Produce',
                    'price': ''
                },
                {
                    'name': 'Red Onion',
                    'size': '1',
                    'type': 'Produce',
                    'price': ''
                },
                {
                    'name': 'Italian Seasoning',
                    'size': '',
                    'type': 'Spices',
                    'price': ''
                },
                {
                    'name': 'Dry Macaroni',
                    'size': '',
                    'type': 'Dried',
                    'price': ''
                },
                {
                    'name': 'Frozen Corn',
                    'size': '',
                    'type': 'Frozen',
                    'price': ''
                },
                {
                    'name': 'Minced Garlic',
                    'size': '',
                    'type': 'Refridgerated',
                    'price': ''
                },
                {
                    'name': 'Cumin',
                    'size': '',
                    'type': 'Spices',
                    'price': ''
                },
                {
                    'name': 'Salsa',
                    'size': '',
                    'type': 'Refridgerated',
                    'price': ''
                },
                {
                    'name': 'Boneless Skinless Chicken Breasts',
                    'size': '',
                    'type': 'Meat',
                    'price': ''
                },
                {
                    'name': 'Cream Cheese',
                    'size': '8 oz',
                    'type': 'Dairy',
                    'price': ''
                },
                {
                    'name': 'Shredded Cheddar Cheese',
                    'size': '',
                    'type': 'Dairy',
                    'price': ''
                },
                {
                    'name': 'Mushroom Gravy',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Milk',
                    'size': '',
                    'type': 'Refridgerated',
                    'price': ''
                },
                {
                    'name': 'Chopped Green Chilies',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Dry Italian Salad Dressing',
                    'size': '1',
                    'type': 'Spices',
                    'price': ''
                },
                {
                    'name': 'Egg Noodles',
                    'size': '1 pkg',
                    'type': 'Noodles',
                    'price': ''
                },
                {
                    'name': 'Ground Beef',
                    'size': '1 lb',
                    'type': 'Meat',
                    'price': ''
                },
                {
                    'name': 'Kidney Beans',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Garbanzo Beans',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Green Beans',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Italian Stewed Tomatoes',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Tomato Sauce',
                    'size': '15 oz',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Shell Noodles',
                    'size': '1 pkg',
                    'type': '',
                    'price': ''
                },
                {
                    'name': 'Spaghetti Seasoning',
                    'size': '1 pkg',
                    'type': 'Spices',
                    'price': ''
                },
                {
                    'name': 'Frozen Broccoli',
                    'size': '',
                    'type': 'Frozen',
                    'price': ''
                },
                {
                    'name': 'Potatoes',
                    'size': '',
                    'type': 'Produces',
                    'price': ''
                },
                {
                    'name': 'Yellow Onion',
                    'size': '1',
                    'type': 'Produce',
                    'price': ''
                },
                {
                    'name': 'Cayenne Pepper',
                    'size': '',
                    'type': 'Spices',
                    'price': ''
                },
                {
                    'name': 'Chicken Broth',
                    'size': '',
                    'type': 'Canned',
                    'price': ''
                },
                {
                    'name': 'Velveeta',
                    'size': '',
                    'type': 'Dairy',
                    'price': ''
                },
                {
                    'name': 'Shredded Sharp Cheddar Cheese',
                    'size': '',
                    'type': 'Dairy',
                    'price': ''
                },
                {
                    'name': 'Half and Half',
                    'size': '',
                    'type': 'Refridgerated',
                    'price': ''
                },
            ]
        },
        recipes(params) {
            return [
                
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

export const RECIPE_KEY = 'recipes';
export const INGREDIENT_KEY = 'ingredients';
export const TAG_KEY = 'tags';

// export default storage;