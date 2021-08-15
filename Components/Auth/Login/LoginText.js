import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {strings} from '../../Config/I18nManager';
import {TranslateObject} from '../../Config/Translate';

const InitialState = {
    entrance: strings('login.entrance'),
    firstRow: ' הדרך המהנה לקבל כדורגל או כדורסל',
    secondRow: ' במתנה מדי יום לאחר כתיבת התשובה :',
    tRow: '  מה הדבר המעניין ביותר שקרה לי היום?',
};

const LoginText = () => {
    const [word, setWord] = useState(InitialState);

    React.useEffect(() => {
        TranslateObject(setWord, InitialState);
    }, []);


    return (

        <View style={{}}>
            <View style={styles.loginTitle}>
                <Text style={styles.loginTitleText}>
                    {/*{strings('login.entrance')}*/}
                    {word['entrance']}
                </Text>
            </View>
            <View style={styles.loginText}>
                <Text style={styles.textBold}>
                    {word['firstRow']}
                </Text>
                <Text style={styles.textBold}>
                    {word['secondRow']}
                </Text>
                <Text style={styles.textBold}>
                    {word['tRow']}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginTitle: {
        alignItems: 'center',
        paddingBottom: 20,
    },
    loginTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    loginText: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    textBold: {
        textAlign:'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default LoginText;
