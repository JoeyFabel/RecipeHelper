import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, TextInput, FlatList } from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import IngredientAdder from './IngredientAdder';

import {getKey, removeKey, INGREDIENT_KEY} from '../data/Storage';

function IngredientSelector({selectedIngredients, setSelectedIngredients}) {
    const availableColors = {'Canned': 'gray', 'Refridgerated': '#2574f4' /*blue*/, 'Meat': 'red'};
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        removeKey(INGREDIENT_KEY);

        let mappedIngredients = [];

        getKey(INGREDIENT_KEY).then((data) => {
            console.log(data);
            mappedIngredients = data.map(
                (ingredient) => {
                    ingredient.quantity = 0;

                    return ingredient;
                }
            );

            setAvailableIngredients(mappedIngredients);
        })
    }, []);
 
    return (
        <>
        <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: 200}}>
            <Text style={Styles.text}>Selected Ingredients:</Text>
            <FlatList
                extraData={refresh}
                style={{height: 150, width: '100%', marginTop: 10, paddingHorizontal: 2.5}}
                data={selectedIngredients}
                keyExtractor={ingredient => ingredient.name}
                renderItem={({item, index}) => {
                    const bgColor = getBackgroundColor(item.type);

                    return (
                        <View style={{...Styles.ingredient, backgroundColor: bgColor}}>
                            <Pressable 
                                style={{width: 20, height: 20, paddingTop: 3}}
                                onPress={() => removeIngredient(index)}
                            >
                                <FontAwesomeIcon icon={faMinusCircle} />
                            </Pressable>
                            <Text style={{...Styles.text, paddingHorizontal: 5}}>
                                {item.name}
                            </Text>
                            <TextInput
                                style={Styles.textInput}
                                inputMode='decimal'
                                placeholder='12'
                                onChangeText={(text) => updateQuantity(index, text)}
                                value={item.quantity}
                            />
                            <Text style={Styles.text}>{getItemUnits(index)}</Text>
                        </View>
                    )
                }}
            />
        </View>
        <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: 220}}>            
            <View style={{width: '100%', height: 200}}>
                <Text style={Styles.text}>Available Ingredients:</Text>
                <FlatList
                    extraData={refresh}
                    style={{height: 150, width: '100%', marginTop: 10, paddingHorizontal: 2.5}}
                    data={availableIngredients}
                    keyExtractor={ingredient => ingredient.name}
                    renderItem={({item, index}) => {
                        const bgColor = getBackgroundColor(item.type)                 ;
                        
                        return (
                            <View
                                style={{...Styles.ingredient, backgroundColor: bgColor}}
                            >                                
                                <Text style={{...Styles.text, paddingHorizontal: 5}}>
                                    {item.name}
                                </Text>
                                <Pressable 
                                    style={{width: 20, height: 20, paddingTop: 3}}
                                    onPress={() => selectIngredient(index)}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </Pressable>
                            </View>
                        );
                    }}
                />
            </View>
            <IngredientAdder onAdd={() => reloadIngredients()}/>
        </View>
        </>
    );

    function getBackgroundColor(ingredientType) {
        let bgColor = 'white';

        if (ingredientType == 'Canned') bgColor = availableColors.Canned;
        else if (ingredientType == 'Refridgerated') bgColor = availableColors.Refridgerated;
        else if (ingredientType == 'Meat') bgColor = availableColors.Meat;

        return bgColor;
    }

    function getItemUnits(index) {
        const itemSizeText = selectedIngredients[index].size;

        const regex = /[0-9\.]/g
        const unit = itemSizeText.replaceAll(regex, '');

        return unit;
    }

    function reloadIngredients() {
        let mappedIngredients = [];
        console.log('reload!');

        getKey(INGREDIENT_KEY).then((data) => {
            console.log(data);
            mappedIngredients = data.map(
                (ingredient) => {
                    ingredient.quantity = 0;

                    return ingredient;
                }
            );

            setAvailableIngredients(mappedIngredients);    
            setRefresh(true);
        });
    }

    // function decreaseQuantity(index) {
    //     let theIngredients = availableIngredients;
    //     theIngredients[index].quantity--;

    //     if (theIngredients[index].quantity == 0) removeIngredient(index);

    //     setRefresh(!refresh);
    //     setAvailableIngredients(theIngredients);
    // }

    // function increaseQuantity(index) {
    //     let theIngredients = selectedIngredients;
    //     theIngredients[index].quantity++;
        
    //     setRefresh(!refresh);
    //     setAvailableIngredients(theIngredients);
    // }

    function updateQuantity(index, quantityText) {        
        console.log(`Updating ${selectedIngredients[index].name} with given quantity "${quantityText}"`);
        console.log(parseFloat(quantityText));
        
        let newSelectedIngredients = selectedIngredients;
        newSelectedIngredients[index].quantity = parseFloat(quantityText);

        setSelectedIngredients(newSelectedIngredients);
        setRefresh(!refresh);
    }

    function selectIngredient(index) {
        const theIngredient = availableIngredients[index];
        const newAvailableIngredients = availableIngredients.filter((item, itemIndex) => {
            return itemIndex != index
        });

        let newSelectedIngredients = selectedIngredients;
        newSelectedIngredients.push(theIngredient);
        newSelectedIngredients.sort((a, b) => a.name.localeCompare(b.name));
        
        setAvailableIngredients(newAvailableIngredients);
        setSelectedIngredients(newSelectedIngredients);
    }

    function removeIngredient(index) {
        const theIngredient = selectedIngredients[index];
        const newSelectedIngredients = selectedIngredients.filter((item, itemIndex) => {
            return itemIndex != index
        });

        let newAvailableIngredients = availableIngredients;
        newAvailableIngredients.push(theIngredient);
        newAvailableIngredients.sort((a, b) => a.name.localeCompare(b.name));

        setAvailableIngredients(newAvailableIngredients);
        setSelectedIngredients(newSelectedIngredients);
    }
}

export default IngredientSelector;