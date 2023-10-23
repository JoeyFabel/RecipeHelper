import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, Modal, FlatList } from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';
import InputModal from './InputModal';

import {saveKey, getKey, removeKey} from '../data/Storage';
import { validateLocaleAndSetLanguage } from 'typescript';

function IngredientSelector() {
    const availableColors = {'Canned': 'gray', 'Refridgerated': '#2574f4' /*blue*/, 'Meat': 'red'};
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [showInputModal, setShowInputModal] = useState(false);

    useEffect(() => {
        // removeKey('ingredients');

        let mappedIngredients = [];
        getKey('ingredients').then((data) => {
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
        <View style={{flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', width: '100%', height: 200}}>            
            <View style={{flex: 1}}>
                <Text style={Styles.text}>Selected Ingredients:</Text>
                <FlatList
                    style={{height: 150, marginTop: 10, marginHorizontal: 2.5}}
                    data={selectedIngredients}
                    keyExtractor={ingredient => ingredient.name}
                    renderItem={({item, index}) => {
                        if (item.quantity == 0) return <></>;
                        console.log(item);

                        let bgColor = 'white';

                        if (item.type == 'Canned') bgColor = availableColors.Canned;
                        else if (item.type == 'Refridgerated') bgColor = availableColors.Refridgerated;
                        else if (item.type == 'Meat') bgColor = availableColors.Meat;
                        
                        return (
                            <Pressable
                            style={{flexDirection: 'row'}}
                                onPress={() => {
                                    handlePress(index);
                                }}
                            >
                                <Text>-</Text>
                                <Text>{item.quantity}x</Text>
                                <Text>+</Text>
                                <Text style={{
                                    ...Styles.text, 
                                    // borderRadius: 45, 
                                    // borderWidth: 1, 
                                    // paddingHorizontal: 5, 
                                    paddingVertical: 5, 
                                    marginLeft: 5,
                                    backgroundColor: bgColor
                                }}>
                                    {item.name} - {item.size}
                                    </Text>
                            </Pressable>
                        );
                    }}
                />
            </View>
            <View style={{flex: 1}}>
                <Text style={Styles.text}>Available Ingredients:</Text>
                <FlatList
                    style={{height: 150, marginTop: 10, marginHorizontal: 2.5}}
                    data={availableIngredients}
                    keyExtractor={ingredient => ingredient.name}
                    renderItem={({item, index}) => {
                        let bgColor = 'white';

                        if (item.type == 'Canned') bgColor = availableColors.Canned;
                        else if (item.type == 'Refridgerated') bgColor = availableColors.Refridgerated;
                        else if (item.type == 'Meat') bgColor = availableColors.Meat;
                        
                        return (
                            <Pressable
                            style={{borderRadius: 45, borderWidth: 1, paddingHorizontal: 5, paddingVertical: 5, backgroundColor: bgColor}}
                                onPress={() => {
                                    handlePress(index);
                                }}
                            >
                                <Text style={Styles.text}>{item.name} - {item.size}</Text>
                            </Pressable>
                        );
                    }}
                />
            </View>
        </View>
    );

    function handlePress(index) {
        let theIngredients = availableIngredients;
        theIngredients[index].quantity++;
        
        let selected = [];

        theIngredients.forEach((item) => {
            if (item.quantity > 0) selected.push(item);
        })

        setSelectedIngredients(selected);        
        // setAvailableIngredients(theIngredients);                
    }
}

export default IngredientSelector;