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
                    'size': '15 oz',
                    'type': 'Canned',
                    'price': '0.64',
                },
                {
                    'name': 'Diced Tomatoes',
                    'size': '14.5 oz',
                    'type': 'Canned',
                    'price': '1.06',
                },
                {
                    'name': 'Black Beans',
                    'size': '15 oz',
                    'type': 'Canned',
                    'price': '0.88',
                },
                {
                    'name': 'Shredded Mozzarella',
                    'size': '8 oz',
                    'type': 'Dairy',
                    'price': '2.22',
                },
                {
                    'name': 'Marinara Sauce',
                    'size': '26 oz',
                    'type': 'Canned',
                    'price': '1.70'
                },
                {
                    'name': 'Pepperoni',
                    'size': '4 oz',
                    'type': 'Refridgerated',
                    'price': '2.14'
                },
                {
                    'name': 'Bell Pepper',
                    'size': '1',
                    'type': 'Produce',
                    'price': '0.72'
                },
                {
                    'name': 'Red Onion',
                    'size': '1',
                    'type': 'Produce',
                    'price': '0.86'
                },
                {
                    'name': 'Italian Seasoning',
                    'size': '0.95 oz',
                    'type': 'Spices',
                    'price': '1.18'
                },
                {
                    'name': 'Dry Macaroni',
                    'size': '16 oz',
                    'type': 'Dried',
                    'price': '1.12'
                },
                {
                    'name': 'Frozen Corn',
                    'size': '12 oz',
                    'type': 'Frozen',
                    'price': '1.18'
                },
                {
                    'name': 'Minced Garlic',
                    'size': '8 oz',
                    'type': 'Refridgerated',
                    'price': '2.27'
                },
                {
                    'name': 'Cumin',
                    'size': '2.5 oz',
                    'type': 'Spices',
                    'price': '1.28'
                },
                {
                    'name': 'Salsa',
                    'size': '24 oz',
                    'type': 'Refridgerated',
                    'price': '2.36'
                },
                {
                    'name': 'Boneless Skinless Chicken Breasts',
                    'size': '1 lb',
                    'type': 'Meat',
                    'price': '3.25'
                },
                {
                    'name': 'Cream Cheese',
                    'size': '8 oz',
                    'type': 'Dairy',
                    'price': '1.54'
                },
                {
                    'name': 'Shredded Cheddar Cheese',
                    'size': '8 oz',
                    'type': 'Dairy',
                    'price': '2.22'
                },
                {
                    'name': 'Mushroom Gravy',
                    'size': '18 oz',
                    'type': 'Canned',
                    'price': '3.32'
                },
                {
                    'name': 'Milk',
                    'size': '1 Gallon',
                    'type': 'Refridgerated',
                    'price': '3.36'
                },
                {
                    'name': 'Chopped Green Chiles',
                    'size': '0.92',
                    'type': 'Canned',
                    'price': '0.92'
                },
                {
                    'name': 'Dry Italian Salad Dressing',
                    'size': '1',
                    'type': 'Spices',
                    'price': '1.87'
                },
                {
                    'name': 'Egg Noodles',
                    'size': '16 oz',
                    'type': 'Noodles',
                    'price': '1.54'
                },
                {
                    'name': 'Ground Beef',
                    'size': '1 lb',
                    'type': 'Meat',
                    'price': '3.97'
                },
                {
                    'name': 'Kidney Beans',
                    'size': '15.5 oz',
                    'type': 'Canned',
                    'price': '0.88'
                },
                {
                    'name': 'Garbanzo Beans',
                    'size': '15.5',
                    'type': 'Canned',
                    'price': '0.88'
                },
                {
                    'name': 'Green Beans',
                    'size': '14.5',
                    'type': 'Canned',
                    'price': '0.64'
                },
                {
                    'name': 'Italian Stewed Tomatoes',
                    'size': '14.5',
                    'type': 'Canned',
                    'price': '1.06'
                },
                {
                    'name': 'Tomato Sauce',
                    'size': '15 oz',
                    'type': 'Canned',
                    'price': '1.06'
                },
                {
                    'name': 'Shell Noodles',
                    'size': '16 oz',
                    'type': 'Noodles',
                    'price': '1.18'
                },
                {
                    'name': 'Spaghetti Seasoning',
                    'size': '1 pkg',
                    'type': 'Spices',
                    'price': '1.58'
                },
                {
                    'name': 'Frozen Broccoli',
                    'size': '12 oz',
                    'type': 'Frozen',
                    'price': '1.16'
                },
                {
                    'name': 'Potatoes',
                    'size': '1 lb',
                    'type': 'Produces',
                    'price': '3.87'
                },
                {
                    'name': 'Yellow Onion',
                    'size': '1',
                    'type': 'Produce',
                    'price': '0.86'
                },
                {
                    'name': 'Cayenne Pepper',
                    'size': '2.25 oz',
                    'type': 'Spices',
                    'price': '3.96'
                },
                {
                    'name': 'Chicken Broth',
                    'size': '32 oz',
                    'type': 'Canned',
                    'price': '1.00'
                },
                {
                    'name': 'Velveeta',
                    'size': '12 oz',
                    'type': 'Dairy',
                    'price': '3.28'
                },
                {
                    'name': 'Shredded Sharp Cheddar Cheese',
                    'size': '8 oz',
                    'type': 'Dairy',
                    'price': '2.22'
                },
                {
                    'name': 'Half and Half',
                    'size': '32 oz',
                    'type': 'Refridgerated',
                    'price': '2.60'
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