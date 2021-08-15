import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import BallImage from '../asserts/ball.png';
import {Portal} from 'react-native-paper';
import {ModalJewis} from './UiComponents/ModalJewisRitual.UiComponent';
import {SafeAreaView} from 'react-native-safe-area-context';

const JewisRetual = () => {
    const [isVisible, setVisible] = React.useState(false);

    return (
        <>
            <View style={{alignSelf: 'flex-start', paddingLeft: '2%'}}>
                <TouchableHighlight activeOpacity={0.8} underlayColor="transparent" onPress={() => {
                    setVisible(!isVisible);
                }}>
                    <Image source={BallImage} style={styles.ballImage}/>
                </TouchableHighlight>
            </View>

            <Portal>
                <ModalJewis isShow={isVisible}
                            isClose={() => {
                                setVisible(!isVisible);
                            }}
                />
            </Portal>

        </>
    );
};

const styles = StyleSheet.create({
    ballImage: {
        width: 50, height: 50,

    },
});

export default JewisRetual;
