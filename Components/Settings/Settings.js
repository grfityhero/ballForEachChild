import React, {useState, useEffect} from 'react';
import {Text, Switch} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {StyleSheet, View, TouchableHighlight, Image} from 'react-native';
import NavigationRow from '../Layout/NavigationRow';
import {clearStorage} from '../Config/localStorage';
import {ModalText} from '../../Components/Layout/UiComponents/index.UiComponents';
import {hebrewTerms} from '../../locales/terms';
import {TranslateObject} from '../Config/Translate';

import  { getNotificationStatus , updateNotification} from '../../DAL/Settings';

const InitialState = {
    title: 'הגדרות',
    terms: hebrewTerms(),
    term: 'תקנון',
    disconnect: 'התנתק',
    alerts: 'alerts',
};

const Settings = ({navigation}) => {

    const [termsIsShow, setTermsIsShow] = useState(false);
    const [translate, setTranslate] = useState(InitialState);
    const [isGetNotifications , setNotification] = useState(false);

    const notification = () =>{
        getNotificationStatus().then((status)=>{
            setNotification(status.data.acceptNotifications)
        })
    }

    const updateNotifications = () =>{
        updateNotification({acceptNotifications: !isGetNotifications})
        setNotification(!isGetNotifications)
    }

    useEffect(() => {
        TranslateObject(setTranslate, InitialState);
        notification();
    }, []);

    const Line = () => {
        return <View
            style={{
                paddingBottom: 10,
                paddingTop: 10,
                borderBottomColor: 'black',
                borderBottomWidth: 1,
            }}
        />;
    };

    const disconnect = () => {
        clearStorage();
        navigation.navigate('Login');
    };
    return (
        <SafeAreaView style={styles.container}>
            <NavigationRow navigation={navigation}/>
            <View style={{flexDirection: 'column'}}>
                <Text style={styles.title}>{translate.title}</Text>
                <View style={styles.body}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.text}>{translate.alerts}</Text>
                        <Switch value={isGetNotifications}  onValueChange={updateNotifications} ></Switch>
                    </View>
                    <Line/>
                    <TouchableHighlight onPress={() => {
                        setTermsIsShow(!termsIsShow);
                    }} activeOpacity={0.8} underlayColor="transparent">
                        <View style={{justifyContent: 'center', paddingTop: 20}}>
                            <Text style={styles.text}>{translate.term}</Text>
                        </View>
                    </TouchableHighlight>
                    <Line/>
                    <TouchableHighlight onPress={disconnect} activeOpacity={0.8} underlayColor="transparent">
                        <View style={{justifyContent: 'center', paddingTop: 20}}>
                            <Text style={styles.text}>{translate.disconnect}</Text>
                        </View>
                    </TouchableHighlight>
                    <Line/>
                </View>
            </View>
            <ModalText isClose={() => {
                setTermsIsShow(!termsIsShow);
            }} isShow={termsIsShow} text={translate.terms}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3498db',
    },
    title: {
        paddingTop: '10%',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 30,
    },
    body: {
        paddingLeft: 20,
        paddingRight: 20,

    },
    text: {
        paddingRight: 20,
        fontSize: 20,
        fontWeight: 'bold',
    },
});


export default Settings;
