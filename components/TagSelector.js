import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';
import InputModal from './InputModal';

import {saveKey, getKey, removeKey} from '../data/Storage';

function TagSelector() {
    const availableColors = ['red', '#2574f4' /*blue*/, 'green', 'yellow', 'orange']
    const [availableTags, setAvailableTags] = useState([]);    
    const [selectedTags, setSelectedTags] = useState([]);
    const [showInputModal, setShowInputModal] = useState(false);

    useEffect(() => {
        // removeKey('tags');

        let mappedTags = [];
        getKey('tags').then((data) => {
            mappedTags = data.map(
                (tagName, index) => {
                    return {name: tagName, color: availableColors[index % availableColors.length]}
                }
            );

            setAvailableTags(mappedTags);
        });
    }, []);

    return (
        <>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
                <Text style={{...Styles.text, width: 100}}>Tags:</Text>
                <View style={Styles.overflowRow}>
                    {
                        selectedTags.map((tag, index) => {
                            return (
                                <Tag tagName={tag.name} color={tag.color} selectable={true} onClick={() => {DeselectTag(index)}} key={index} />
                                )
                            })
                    }
                </View>
            </View>
            <View style={Styles.divider}/>
            <View style={{flexDirection: 'row', paddingVertical: 5, justifyContent: 'center'}}>
                <Text style={{...Styles.text, width: 100}}>Available Tags:</Text>
                <View style={Styles.overflowRow}>
                    {
                        availableTags.map((tag, index) => {
                            return (
                                <Tag tagName={tag.name} color={tag.color} selectable={true} onClick={() => {SelectTag(index)}} key={index} />
                            );
                        })
                    }
                    <Pressable 
                        style={{width: 20, height: 20, paddingTop: 3}}
                        onPress={() => setShowInputModal(true)}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} />
                    </Pressable>
                </View>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={showInputModal}
                onRequestClose={() => setShowInputModal(false)}
            >
                <InputModal label='Add a tag' closeModal={() => setShowInputModal(false)} onConfirm={AddTag}/>
            </Modal>
        </>
    );

    function AddTag(tag) {
        console.log("Adding " + tag);
        if (availableTags.find((value) => value.name == tag) || selectedTags.find((value) => value.name == tag)) {
            console.log("that tag already exists");
        } else {
            getKey('tags').then((data) => {
                // add the new tag, and sort it into the array
                data.push(tag);
                data.sort();

                // save the new tags array
                saveKey('tags', data);

                // update the available tag with the new tag sorted into the list
                let newTag = {name: tag, color: availableColors[data.indexOf(tag) % availableColors.length]}
                console.log(newTag);
                setAvailableTags(availableTags.concat(newTag).sort((a, b) => a.name.localeCompare(b.name)));
            });
        }
    }

    function SelectTag(index) {
        let theTag = availableTags[index];        
                
        // remove the selected tag from the available list
        setAvailableTags(availableTags.filter((value) => value != theTag));

        // and add it to the selected list
        setSelectedTags(selectedTags.concat(theTag).sort((a, b) => a.name.localeCompare(b.name)));
    }

    function DeselectTag(index) {
        let theTag = selectedTags[index];

        // remove the tag from the selected list
        setSelectedTags(selectedTags.filter((value) => value != theTag));

        // and add it to the available list
        setAvailableTags(availableTags.concat(theTag).sort((a, b) => a.name.localeCompare(b.name)));
    }
}

export default TagSelector