import React, {useEffect} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import image from '../asserts/SabbathActivation.jpeg';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import Timer from './Timer';

const InitialState = {
    msg: 'האפליקציה לא פעילה\n בשבתות ובחגי ישראל',
    subtext: 'נשוב לפעילות בעוד:',
};
import {isRTL} from '../Config/I18nManager';
import {TranslateObject} from '../Config/Translate';

const Sabbath = ({route}) => {
    const [endTime, setEndTime] = React.useState(route.params.data[0].to);
    const [word, setWord] = React.useState(InitialState);

    useEffect(() => {
        // console.log("isrtl  :",isRTL)
        setEndTime(route.params.data[0].to)
        TranslateObject(setWord, InitialState);

    }, [route]);


    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={image} style={styles.image}>
                <Text style={styles.msg}>{word['msg']}</Text>
                <Text style={styles.subtext}>{word['subtext']}</Text>
                <Timer endTime={endTime}/>
            </ImageBackground>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3498db'
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-start',
        marginTop: '15%',
        height: '95%'
    },
    msg: {
        paddingRight: 20,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtext: {
        paddingRight: 20,
        paddingTop: 30,
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});

export default Sabbath;
