import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, TextInput } from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';
import InputModal from './InputModal';

import {saveKey, getKey, TAG_KEY, removeKey} from '../data/Storage';

function TagSelector({selectedTags, setSelectedTags}) {
    const availableColors = ['red', '#2574f4' /*blue*/, 'green', 'yellow', 'orange']
    const [availableTags, setAvailableTags] = useState([]);    
    const [inputText, setInputText] = useState('');
    const [showInputModal, setShowInputModal] = useState(false);

    useEffect(() => {
        // removeKey(TAG_KEY);

        let mappedTags = [];
        getKey(TAG_KEY).then((data) => {
            mappedTags = data.map(
                (tagName, index) => {
                    return {name: tagName, color: availableColors[index % availableColors.length]}
                }
            );

            setAvailableTags(mappedTags);
        });
    }, []);

    useEffect(() => {
        if (showInputModal) setInputText('');
    }, [showInputModal]);

    return (
        <>
            <View style={{flexDirection: 'row', paddingVertical: 5}}>
                <Text style={{...Styles.text, width: 100}}>Tags:</Text>
                <View style={Styles.overflowRow}>
                    {
                        selectedTags.map((tag, index) => {
                            return (
                                <Tag tagName={tag.name} color={tag.color} selectable={true} onClick={() => {deselectTag(index)}} key={index} />
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
                                <Tag tagName={tag.name} color={tag.color} selectable={true} onClick={() => {selectTag(index)}} key={index} />
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
            <InputModal visible={showInputModal} label='Add a tag' confirmText='Add tag' closeModal={() => setShowInputModal(false)} onConfirm={addTag}>
                <TextInput 
                    style={Styles.input}
                    placeholder='Tag'
                    onChangeText={setInputText}
                    value={inputText}
                />
            </InputModal>
        </>
    );

    function addTag() {
        setShowInputModal(false);

        let tag = inputText;

        if (tag == '') return;

        console.log("Adding " + tag);
        if (availableTags.find((value) => value.name == tag) || selectedTags.find((value) => value.name == tag)) {
            console.log("that tag already exists");
        } else {
            getKey(TAG_KEY).then((data) => {
                // add the new tag, and sort it into the array
                data.push(tag);
                data.sort();

                // save the new tags array
                saveKey(TAG_KEY, data);

                // update the available tag with the new tag sorted into the list
                let newTag = {name: tag, color: availableColors[data.indexOf(tag) % availableColors.length]}
                console.log(newTag);
                setAvailableTags(availableTags.concat(newTag).sort((a, b) => a.name.localeCompare(b.name)));
            });
        }
    }

    function selectTag(index) {
        let theTag = availableTags[index];        
                
        // remove the selected tag from the available list
        setAvailableTags(availableTags.filter((value) => value != theTag));

        // and add it to the selected list
        setSelectedTags(selectedTags.concat(theTag).sort((a, b) => a.name.localeCompare(b.name)));
    }

    function deselectTag(index) {
        let theTag = selectedTags[index];

        // remove the tag from the selected list
        setSelectedTags(selectedTags.filter((value) => value != theTag));

        // and add it to the available list
        setAvailableTags(availableTags.concat(theTag).sort((a, b) => a.name.localeCompare(b.name)));
    }
}

export default TagSelector