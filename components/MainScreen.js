import React, {useState, useEffect} from 'react';
import {Text, View, Platform} from 'react-native';
import RecipeDisplay from './RecipeDisplay';
import SelectionDisplay from './SelectionDisplay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

import {getKey, removeKey, RECIPE_KEY} from '../data/Storage';

function MainScreen() {
    const [recipeQuantities, setRecipeQuantities] = useState([]);
    const [availableRecipes, setAvailableRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // removeKey(RECIPE_KEY);

        getKey(RECIPE_KEY).then((data) => {
            console.log(data);

            setAvailableRecipes(data);

            setRecipeQuantities(new Array(data.length).fill(0));
        });
    }, []);

    if (Platform.OS == 'web') return (
        <View style={{flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 25}}>
            <SelectionDisplay recipeQuantities={recipeQuantities} availableRecipes={availableRecipes} refresh={refresh}/>
            <RecipeDisplay availableRecipes={availableRecipes} setAvailableRecipes={setAvailableRecipes} recipeQuantities={recipeQuantities} setRecipeQuantities={updateQuantities} />
        </View>
    );
    else return (    
        <View style={{flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 25}}>
            <Tab.Navigator>
                <Tab.Screen name="Ingredients" component={SelectionDisplay} />
                <Tab.Screen name="Recipes" component={RecipeDisplay} />
            </Tab.Navigator>
        </View>
    );

    function updateQuantities(value) {
        setRecipeQuantities(value);
        setRefresh(!refresh);
    }
}

export default MainScreen;