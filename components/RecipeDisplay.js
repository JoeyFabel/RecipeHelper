import React, {useState} from 'react';
import {Text, View, Pressable, Modal} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import NewRecipeModal from './NewRecipeModal';
import { Styles } from '../styles/Styles';

function RecipeDisplay() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{flex: 1, borderLeftWidth: 1, alignItems: 'center'}}>
            <Text style={Styles.headerText}>Show available recipes here!</Text>
            <Pressable 
                style={{width: 20, height: 20}}
                onPress={() => setModalVisible(true)}
            >
                <FontAwesomeIcon icon={faPlusCircle} />
            </Pressable>
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