import React from 'react';
import {Text, View, Pressable} from 'react-native';
import { Styles } from '../styles/Styles';
import Tag from './Tag';

function Recipe({data}) {
    const price = calculatePrice();

    return (
        <View style={Styles.recipeContainer}>
            <Text style={Styles.headerText}>{data.name}</Text>
            <View style={{flexDirection: 'row'}}>
            {
                data.tags.map((item, index) => {
                    return (
                        <Tag tagName={item.name} color={item.color} selectable={false} key={index} />
                        )
                    })
                }
            </View>
            <Text style={Styles.text}>Price: ${price}</Text>
        </View>
    );

    function calculatePrice() {
        let totalPrice = 0;
        data.ingredients.forEach((item) => {
            totalPrice += (item.price ? item.price : 1) * item.quantity;
        })

        return totalPrice;
    }
}

export default Recipe;