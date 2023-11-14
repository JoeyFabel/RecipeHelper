import React from 'react';
import {Text, View, Pressable} from 'react-native';
import { Styles } from '../styles/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faMinusCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tag from './Tag';

function Recipe({data, quantity, increaseQuantity, decreaseQuantity}) {
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
            <View style={Styles.row}>
                <Text style={Styles.text}>Quantity: </Text>
                <Pressable
                    style={{width: 20, height: 20, paddingTop: 3}}
                    onPress={decreaseQuantity}
                >
                    <FontAwesomeIcon icon={faMinusCircle} />
                </Pressable>
                <Text style={Styles.text}>{quantity}</Text>
                <Pressable
                    style={{width: 20, height: 20, paddingTop: 3}}
                    onPress={increaseQuantity}
                >
                    <FontAwesomeIcon icon={faPlusCircle} />
                </Pressable>
            </View>
        </View>
    );

    function calculatePrice() {
        let totalPrice = 0;
        data.ingredients.forEach((item) => {
            // item.quantity - The amount to get, in units (ie. 15 means 15 oz.)
            // item.size - The amount of the ingredient in one purchase unit (ie. 15 oz means buying 1 item gives 15 oz.)

            const quantityPerUnit = parseFloat(item.size);
            
            // round up to whole units, as you must purchase in integer values
            const neededUnits = Math.ceil(item.quantity / quantityPerUnit);

            totalPrice += (item.price ? item.price : 1) * neededUnits;
        })
        
        return totalPrice.toFixed(2);
    }
}

export default Recipe;