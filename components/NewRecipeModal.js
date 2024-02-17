import React, {useState} from 'react';
import {Text, View, Pressable, TextInput} from 'react-native';
import { Styles } from '../styles/Styles';
import TagSelector from './TagSelector';
import IngredientSelector from './IngredientSelector';

import {saveKey, getKey, removeKey, RECIPE_KEY} from '../data/Storage';

function NewRecipeModal({closeModal, setRecipeRefresh}) {
    const [recipeName, onRecipeNameChange] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);

    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green', minWidth: 400}}>
            <View style={{rowGap: 10, width: '50%', minWidth: 350}}>
                <Text style={{...Styles.headerText, alignSelf: 'center'}}>Add a new recipe...</Text>
                <View style={Styles.divider} />
                <View style={Styles.row}>
                    <Text style={{...Styles.text, width: 100}}>Recipe name:</Text>
                    <TextInput
                        style={Styles.input}
                        onChangeText={onRecipeNameChange}
                        value={recipeName}
                        placeholder="Recipe name"
                        />
                </View>
                <View style={Styles.divider} />
                <TagSelector selectedTags={selectedTags} setSelectedTags={setSelectedTags}/>
                <View style={Styles.divider} />
                <IngredientSelector selectedIngredients={selectedIngredients} setSelectedIngredients={setSelectedIngredients}/>
                <View style={Styles.divider} />
                {!!errorMessage &&
                    <Text style={Styles.errorText}>{errorMessage}</Text>
                }
                <View style={{...Styles.row, justifyContent: 'center', gap: 5}}>
                    <Pressable
                        style={{...Styles.button, backgroundColor: 'green'}}
                        onPress={() => addRecipe()}
                    >
                        <Text style={Styles.text}>Add Recipe</Text>
                    </Pressable>
                    <Pressable
                        style={{...Styles.button, backgroundColor: 'red'}}
                        onPress={() => closeModal()}
                    >
                        <Text style={Styles.text}>Close modal</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );

    function addRecipe() {        
        // const theTags = selectedTags.map((item) => {return item.name});
        const theTags = selectedTags;
        // const theIngredients = availableIngredients.filter((item) => {
        //     return item.quantity > 0;
        // });
        const theIngredients = selectedIngredients;

        const newRecipe = {
            'name': recipeName,
            'tags': theTags,
            'ingredients': theIngredients,
        };

        console.log("Recipe:");
        console.log(newRecipe);

        // update the recipe list with the new recipe
        getKey(RECIPE_KEY).then((data) => {
            if (data.find((value) => 
                value.name == newRecipe.name
            )) {
                // console.log("That recipe already exists!");
                setErrorMessage('That recipe already exists!\nChange the recipe name in order to add this!');
                return;
            }
            
            setErrorMessage(null);

            // Add the recipe and sort into the list
            data.push(newRecipe);
            data.sort((a, b) => a.name.localeCompare(b.name));

            // Save the recipe list
            saveKey(RECIPE_KEY, data);
            setRecipeRefresh(true);
            closeModal();
        })
    }
}

export default NewRecipeModal;