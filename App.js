import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RecipeDisplay from './components/RecipeDisplay';
import SelectionDisplay from './components/SelectionDisplay';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MainScreen from './components/MainScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <MainScreen/>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
