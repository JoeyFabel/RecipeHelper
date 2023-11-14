import React, {useState, useEffect} from 'react';

import {Text, View, FlatList} from 'react-native';
import { Styles } from '../styles/Styles';
import {getKey, removeKey, RECIPE_KEY} from '../data/Storage';

function SelectionDisplay({recipeQuantities, availableRecipes, refresh}) {
    const [headers, setHeaders] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);

    useEffect(() => {
        let theHeaders = [];        
        availableRecipes.forEach((item, index) => {
            if (recipeQuantities[index] > 0) {
                theHeaders.push({'title': item.name, 'quantity': recipeQuantities[index]});
            }
        });

        setHeaders(theHeaders);

        setIngredientList(getIngredientList());
    }, [refresh]);

    return (
        <View style={{flex: 1, alignItems: 'center'}}>
            <Text style={{...Styles.headerText, marginTop: 100}}>Ingredient List:</Text>
            <View style={Styles.divider} />
            {                
                headers.map((item, index) => {
                    return (
                        <Text style={Styles.text} key={index}>{item.title} - {item.quantity}</Text>
                    )
                })
            }

            <View style={{...Styles.divider, width: '100%'}} />
            <FlatList
                data={ingredientList}
                style={{}}
                renderItem={({item}) => {
                    return (
                        <Text style={Styles.text}>{item.units}x {item.size} {item.name} ({item.quantity} total)</Text>
                    );
                }}
            />
        </View>
    );

    function getIngredientList() {
        let theList = [];

        availableRecipes.forEach((recipe, index) => {
            if (recipeQuantities[index] > 0) {
                console.log("adding ingredients for " + recipe.name);
                // Add the ingredients to the list
                recipe.ingredients.forEach((ingredient) => {
                    let foundIndex = theList.findIndex((element) => element.name == ingredient.name);

                    console.log(foundIndex);
                    if (/*theList.find((value) => value.name == ingredient.name)*/foundIndex >= 0) {
                        // update the quantity
                        console.log(ingredient.name + " is already in the list");
                        theList[foundIndex].quantity += ingredient.quantity * recipeQuantities[index];

                    } else {
                        // add item to the list
                        console.log("adding " + ingredient.name + " to the list!");
                        theList.push({'name': ingredient.name, 'quantity': ingredient.quantity * recipeQuantities[index], 'size': ingredient.size});
                    }

                    console.log("ingredient list:");
                    console.log(theList);
                });
            }
        });
        
        // process the list into whole values for units
        // const quantityPerUnit = parseFloat(item.size);
        // const neededUnits = Math.ceil(item.quantity / quantityPerUnit);
        theList.forEach((item) => {
            const quantityPerUnit = parseFloat(item.size);
            const neededUnits = Math.ceil(item.quantity / quantityPerUnit);

            const regex = /[0-9\.]/g
            const unit = item.size.replaceAll(regex, '');

            item.quantity = item.quantity + unit;

            item.units = neededUnits;
            
        });

        return theList;
        // return availableRecipes[0]?.ingredients;
    }
}

export default SelectionDisplay;