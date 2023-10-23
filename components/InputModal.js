import React, { useState } from 'react';
import { View, Text, Modal, TextInput, Pressable } from 'react-native';
import { Styles } from '../styles/Styles';

function InputModal({label, closeModal, onConfirm}) {
    const [inputText, setInputText] = useState('');

    return (
        <View style={{width: 300, height: 200, alignSelf: 'center', top: '40%', backgroundColor: '#004d00', borderWidth: 1, alignItems: 'center'}}>
                <Text style={Styles.headerText}>{label}</Text>
                <TextInput 
                    style={Styles.input}
                    placeholder='Tag'
                    onChangeText={setInputText}
                    value={inputText}
                />
                <View style={Styles.row}>
                    <Pressable
                        style={{...Styles.button, backgroundColor: 'green', marginRight: 5}}
                        onPress={() => {
                            closeModal();
                            onConfirm(inputText);
                        }}
                    >
                        <Text style={Styles.text}>Add tag</Text>
                    </Pressable>
                    <Pressable
                        style={{...Styles.button, backgroundColor: 'red', marginLeft: 5}}
                        onPress={() => {
                            closeModal();
                        }}
                    >
                        <Text style={Styles.text}>Cancel</Text>
                    </Pressable>
                </View>
        </View>
    );
}

export default InputModal;