import React, { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import { Styles } from '../styles/Styles';

function InputModal({visible, label, confirmText, closeModal, onConfirm, children}) {
    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={visible}
            onRequestClose={() => setShowInputModal(false)}
        >
            <View style={{width: 350, /*height: 250,*/ alignSelf: 'center', top: '40%', backgroundColor: '#004d00', borderWidth: 1, alignItems: 'center'}}>
                    <Text style={Styles.headerText}>{label}</Text>
                    {children}
                    <View style={{...Styles.row, marginVertical: 10}}>
                        <Pressable
                            style={{...Styles.button, backgroundColor: 'green', marginRight: 5}}
                            onPress={() => {
                                onConfirm();
                            }}
                        >
                            <Text style={{...Styles.text, textAlign: 'center'}}>{confirmText}</Text>
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
        </Modal>
    );
}

export default InputModal;