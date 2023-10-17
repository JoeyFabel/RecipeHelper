import React, {useState} from 'react';
import {Text, View, TouchableOpacity, Modal} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import NewRecipeModal from './NewRecipeModal';

function RecipeDisplay() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{flex: 1, borderLeftWidth: 1, alignItems: 'center'}}>
            <Text>Show available recipes here!</Text>
            <TouchableOpacity 
                style={{width: 50, height: 50}}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesomeIcon icon={faPlusCircle} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
            }}>
                <NewRecipeModal closeModal={() => setModalVisible(false)} />
            </Modal>
        </View>
    );

    // Called when the add recipe button is clicked
    function AddRecipe() {
        
    }
}

export default RecipeDisplay;