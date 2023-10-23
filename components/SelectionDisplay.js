import {Text, View} from 'react-native';
import { Styles } from '../styles/Styles';

function SelectionDisplay() {
    return (
        <View style={{flex: 3, alignItems: 'center'}}>
            <Text style={{...Styles.headerText, marginTop: 100}}>Show selected recipes+quantities here!</Text>
            <Text style={{...Styles.headerText, marginTop: 100}}>Show ingredient list below here!</Text>
        </View>
    );
}

export default SelectionDisplay;