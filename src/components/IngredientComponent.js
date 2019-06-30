import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const IngredientComponent = ({ image, text }) => {

    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image}/>
            <Text style={{ fontSize: 15 }}>{text}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        marginTop: 10,
        borderBottomWidth: 2,
    },
    image: {
        resizeMode: 'contain',
        width: 110,
        height: 110,
    },
});

export default IngredientComponent

