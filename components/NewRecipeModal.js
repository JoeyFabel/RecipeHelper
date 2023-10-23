import React, {useState} from 'react';
import {Text, View, Pressable, TextInput} from 'react-native';
import { Styles } from '../styles/Styles';
import TagSelector from './TagSelector';
import IngredientSelector from './IngredientSelector';

function NewRecipeModal({closeModal}) {
    const [recipeName, onRecipeNameChange] = useState('');

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
                <TagSelector />
                <View style={Styles.divider} />
                <IngredientSelector />
                <View style={Styles.divider} />
                <Pressable
                    style={{...Styles.button, backgroundColor: 'red', alignSelf: 'center'}}
                    onPress={() => closeModal()}
                >
                    <Text style={Styles.text}>Close modal</Text>
                </Pressable>
            </View>
        </View>
    );
}

export default NewRecipeModal;