import React, { useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { Styles } from '../styles/Styles';

function Tag({tagName, selectable=false, color='Red', onClick}) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <Pressable
            style={{ ...Styles.tag, backgroundColor: color}}
            disabled={!selectable}
            onPress={() => {
                setIsSelected(!isSelected);
                onClick(!isSelected);
            }}
        >
            <Text style={Styles.tagText}>{tagName}</Text>
        </Pressable>
    );
}

export default Tag