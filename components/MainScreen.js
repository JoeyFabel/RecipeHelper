import {Text, View} from 'react-native';
import RecipeDisplay from './RecipeDisplay';
import SelectionDisplay from './SelectionDisplay';

function MainScreen() {
    return (
        <View style={{flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 25}}>
            <SelectionDisplay />
            <RecipeDisplay />
        </View>
    );
}

export default MainScreen;