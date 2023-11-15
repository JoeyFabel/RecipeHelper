import React, {useState, useEffect} from 'react';

import {Text, View, FlatList, Pressable} from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';

function SelectionDisplay({recipeQuantities, availableRecipes, refresh}) {
    const [headers, setHeaders] = useState([]);
    const [ingredientList, setIngredientList] = useState([]);

    let oldLabel = '';

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
                        <Text style={Styles.text} key={index}>{item.quantity}x {item.title}</Text>
                    )
                })
            }

            <View style={{...Styles.divider, width: '100%'}} />

            <View>
                <FlatList
                    data={ingredientList}
                    style={{}}
                    renderItem={({item, index}) => {
                        const showLabel = oldLabel != item.type || index == 0;

                        if (showLabel) {
                            oldLabel = item.type;
                            console.log(oldLabel);                        
                        }

                        return (
                            <>
                                {showLabel && <Text style={{...Styles.text, fontWeight: 'bold', marginVertical: 1}}>{item.type}</Text>}
                                <Text style={Styles.text}>  {item.units}x {item.size} {item.name} ({item.quantity} total)</Text>
                            </>
                        );
                    }}
                />
            </View>
            
            {
                ingredientList.length > 0 &&
                    <>
                        <View style={{...Styles.divider, width: '100%'}} />
                        <Text style={Styles.text}>Total: ${calculateTotal()}</ Text>
                        <Pressable>
                            <FontAwesomeIcon icon={faPrint} />
                        </Pressable>
                    </>
            }
        </View>
    );

    function calculateTotal() {
        let total = 0;
        
        ingredientList.forEach((item) => {
            total += item.units * item.price;
        })

        return total.toFixed(2);
    }

    function getIngredientList() {
        let theList = [];

        availableRecipes.forEach((recipe, index) => {
            if (recipeQuantities[index] > 0) {
                console.log("adding ingredients for " + recipe.name);
                // Add the ingredients to the list
                recipe.ingredients.forEach((ingredient) => {
                    let foundIndex = theList.findIndex((element) => element.name == ingredient.name);
                    if (foundIndex >= 0) {
                        // update the quantity
                        theList[foundIndex].quantity += ingredient.quantity * recipeQuantities[index];

                    } else {
                        // add item to the list
                        theList.push({'name': ingredient.name, 'quantity': ingredient.quantity * recipeQuantities[index], 'size': ingredient.size, 'price': ingredient.price, 'type': ingredient.type});
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

        // sort the list by category
        theList.sort((a, b) => a.type.localeCompare(b.type));

        return theList;
        // return availableRecipes[0]?.ingredients;
    }
}

export default SelectionDisplay;