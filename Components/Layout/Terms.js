import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import BallImage from '../asserts/ball2.png';

const Terms = ({isVisible}) => {

    return (
        <View style={{ alignSelf:'flex-end'}}>
            <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={() => {
                isVisible();
            }}>
                <Image source={BallImage} style={styles.ballImage}/>
            </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
    ballImage: {
        width: 50, height: 50,
        alignSelf: 'flex-end',
    },
});

export default Terms;
