import React, {useState, useEffect} from 'react';
import {Text, View, Pressable, Modal, FlatList} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Styles } from '../styles/Styles';
import NewRecipeModal from './NewRecipeModal';
import Recipe from './Recipe';

import {getKey, removeKey, RECIPE_KEY} from '../data/Storage';

function RecipeDisplay() {
    const [modalVisible, setModalVisible] = useState(false);
    const [availableRecipes, setAvailableRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        // removeKey(RECIPE_KEY);

        getKey(RECIPE_KEY).then((data) => {
            console.log(data);

            setAvailableRecipes(data);
        });
    }, []);

    return (
        <View style={{flex: 1, borderLeftWidth: 1, alignItems: 'center'}}>
            <Text style={Styles.headerText}>Recipes</Text>
            <FlatList
                extraData={refresh}
                style={{width: '100%', height: '75%', paddingHorizontal: 2.5}}
                data={availableRecipes}                
                // keyExtractor={recipe => recipe.name}
                renderItem={({item, index}) => {
                    console.log(item);
                    return (
                        <Recipe data={item} /> 
                    )
                }}
            />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={Styles.text}>Add a Recipe</Text>
                <Pressable 
                    style={{width: 20, height: 20, paddingTop: 2.5}}
                    onPress={() => setModalVisible(true)}
                >
                    <FontAwesomeIcon icon={faPlusCircle} />
                </Pressable>
            </View>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
            }}>
                <NewRecipeModal setRecipeRefresh={setRefresh} closeModal={() => setModalVisible(false)} />
            </Modal>
        </View>
    );

    // Called when the add recipe button is clicked
    function AddRecipe() {
        
    }
}

export default RecipeDisplay;