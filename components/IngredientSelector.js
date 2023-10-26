import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, TextInput, FlatList } from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import InputModal from './InputModal';
import IngredientAdder from './IngredientAdder';

import {getKey, removeKey, INGREDIENT_KEY} from '../data/Storage';

function IngredientSelector({availableIngredients, setAvailableIngredients}) {
    const availableColors = {'Canned': 'gray', 'Refridgerated': '#2574f4' /*blue*/, 'Meat': 'red'};
    // const [availableIngredients, setAvailableIngredients] = useState([]);
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
        <View style={{ alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: 220}}>            
            <View style={{width: '100%', height: 200}}>
                <Text style={Styles.text}>Available Ingredients:</Text>
                <FlatList
                    extraData={refresh}
                    style={{height: 150, width: '100%', marginTop: 10, paddingHorizontal: 2.5}}
                    data={availableIngredients}
                    keyExtractor={ingredient => ingredient.name}
                    renderItem={({item, index}) => {
                        let bgColor = 'white';

                        if (item.type == 'Canned') bgColor = availableColors.Canned;
                        else if (item.type == 'Refridgerated') bgColor = availableColors.Refridgerated;
                        else if (item.type == 'Meat') bgColor = availableColors.Meat;
                        
                        return (
                            <View
                                style={{flexDirection: 'row', borderRadius: 45, borderWidth: 1, backgroundColor: bgColor, paddingVertical: 5, flex: 1, marginBottom: 1}}
                            >
                                <Pressable 
                                    style={{width: 20, height: 20, paddingTop: 3}}
                                    onPress={() => {
                                        if (item.quantity > 0) decreaseQuantity(index);
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMinusCircle} />
                                </Pressable>
                                <Text style={Styles.text}>{item.quantity}</Text>
                                <Pressable 
                                    style={{width: 20, height: 20, paddingTop: 3}}
                                    onPress={() => increaseQuantity(index)}
                                >
                                    <FontAwesomeIcon icon={faPlusCircle} />
                                </Pressable>
                                <Text style={{...Styles.text,
                                    paddingHorizontal: 5,
                                    marginLeft: 5,
                                }}>
                                    {item.name} - {item.size}
                                </Text>
                            </View>
                        );
                    }}
                />
            </View>
            <IngredientAdder onAdd={() => reloadIngredients()}/>
        </View>
    );

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

    function decreaseQuantity(index) {
        let theIngredients = availableIngredients;
        theIngredients[index].quantity--;

        setRefresh(!refresh);
        setAvailableIngredients(theIngredients);
    }

    function increaseQuantity(index) {
        let theIngredients = availableIngredients;
        theIngredients[index].quantity++;
        
        setRefresh(!refresh);
        setAvailableIngredients(theIngredients);
    }
}

export default IngredientSelector;