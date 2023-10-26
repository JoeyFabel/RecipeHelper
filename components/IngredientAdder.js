import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, TextInput, FlatList } from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import InputModal from './InputModal';

import {saveKey, getKey, removeKey, INGREDIENT_KEY} from '../data/Storage';

function IngredientAdder({onAdd}) {
    const availableColors = {'Canned': 'gray', 'Refridgerated': '#2574f4' /*blue*/, 'Meat': 'red', 'Produce': 'green'};
    const availableTypes = ['Canned', 'Refridgerated', 'Meat', 'Produce'];

    const [showInputModal, setShowInputModal] = useState(false);
    const [nameText, setNameText] = useState('')
    const [priceText, setPriceText] = useState('');
    const [sizeText, setSizeText] = useState('');
    const [ingredientType, setIngredientType] = useState('Canned');    
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (showInputModal) {
            setErrorMessage(null);
            setNameText('');
            setPriceText('');
            setSizeText('');
        }
    }, [showInputModal])

    return (
        <>
            <Pressable 
                style={{width: 20, height: 20, alignSelf: 'center'}}
                onPress={() => setShowInputModal(true)}
            >
                <FontAwesomeIcon icon={faPlusCircle} />
            </Pressable>
            <InputModal visible={showInputModal} label='Add an ingredient' confirmText='Add ingredient' closeModal={() => setShowInputModal(false)} onConfirm={addIngredient}>
                <View style={{...Styles.row, alignSelf: 'flex-start', marginLeft: 5}}>
                    <Text style={{...Styles.text, width: 50}}>Name:</Text>
                    <TextInput 
                        style={Styles.input}
                        placeholder='Ingredient name'
                        onChangeText={setNameText}
                        value={nameText}
                    />
                </View>
                <View style={{...Styles.row, alignSelf: 'flex-start', marginLeft: 5}}>
                    <Text style={{...Styles.text, width: 50}}>Price:</Text>
                    <TextInput 
                        style={Styles.input}
                        inputMode='decimal'
                        placeholder='0.00'
                        onChangeText={setPriceText}
                        value={priceText}                        
                    />
                </View>
                <View style={{...Styles.row, alignSelf: 'flex-start', marginLeft: 5}}>
                    <Text style={{...Styles.text, width: 50}}>Size:</Text>
                    <TextInput 
                        style={Styles.input}
                        inputMode='decimal'
                        placeholder='12 oz'
                        // defaultValue='12 oz'
                        onChangeText={setSizeText}
                        value={sizeText}                        
                    />
                </View>
                <View style={{...Styles.row, alignSelf: 'flex-start', marginLeft: 5}}>
                    <Text style={{...Styles.text}}>Type:</Text>
                    {availableTypes.map((type) => {
                        return (
                            <Pressable
                                style={{
                                    // flex: 1,
                                    // width: 20,
                                    // height: 20,
                                    marginHorizontal: 5,
                                    paddingHorizontal: 2,
                                    borderRadius: 30,
                                    borderWidth: 1,
                                    backgroundColor: ingredientType == type ? availableColors[type] : 'white',
                                    flexWrap: 'wrap',
                                    rowGap: 5,
                                    columnGap: 5,
                                }}
                                onPress={() => setIngredientType(type)}
                                key={type}
                            >
                                <Text style={Styles.text}>{type}</Text>
                            </Pressable>
                            
                        );
                    })}
                </View>
                {!!errorMessage &&
                    <Text style={Styles.errorText}>{errorMessage}</Text>
                }
            </InputModal>
        </>
    );

    function validatePrice() {
        return !isNaN(parseFloat(priceText))
    }

    function validateSize() {
        if (sizeText.length == 0) return true;

        const regex = /[0-9]* [a-zA-Z]*/;   
        const match = sizeText.match(regex);

        return match != null;
    }

    function addIngredient() {
        if (!validatePrice()) {
            setErrorMessage('Please enter a valid price!');
            return;
        } else if (!validateSize()) {
            setErrorMessage('Please enter a valid size!');
            return;
        }

        // add the ingredient
        let theIngredient = {
            'name': nameText,
            'size': sizeText.length == 0 ? '12 oz': sizeText,
            'type': ingredientType,
            'price': parseFloat(priceText),
        };

        getKey(INGREDIENT_KEY).then((data) => {
            // Don't add the ingredient if it already exists
            if (data.find((value) => 
                value.name == theIngredient.name
            )) {
                console.log("That ingredient already exists!");
                return;
            }

            // Add the ingredient and sort it into the list
            data.push(theIngredient);
            data.sort((a, b) => a.type.localeCompare(b.type));

            // save the ingredient list
            saveKey(INGREDIENT_KEY, data);

            // update the availableIngredients
            onAdd();
            setShowInputModal(false);
        });

        console.log(theIngredient);
    }
}

export default IngredientAdder;