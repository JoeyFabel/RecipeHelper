import {Text, View, Platform} from 'react-native';
import RecipeDisplay from './RecipeDisplay';
import SelectionDisplay from './SelectionDisplay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function MainScreen() {
    if (Platform.OS == 'web') return (
        <View style={{flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 25}}>
            <SelectionDisplay />
            <RecipeDisplay />
        </View>
    );
    else return (    
        <View style={{flex: 1, width: '100%', flexDirection: 'row', paddingHorizontal: 25}}>
            <Tab.Navigator>
                <Tab.Screen name="Ingredients" component={SelectionDisplay} />
                <Tab.Screen name="Recipes" component={RecipeDisplay} />
            </Tab.Navigator>
        </View>
    );
}

export default MainScreen;