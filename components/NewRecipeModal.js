import {Text, View, TouchableOpacity} from 'react-native';

function NewRecipeModal({closeModal}) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green'}}>
            <Text>Modal!</Text>
            <TouchableOpacity
                style={{borderRadius: 45, backgroundColor: 'red'}}
                onPress={() => closeModal()}
            >
                <Text>Close modal</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NewRecipeModal;