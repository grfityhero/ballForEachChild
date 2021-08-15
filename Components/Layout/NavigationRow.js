import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import JewisRetual from './JewisRitual';
import Timer from '../Home/Timer';
import {Button, Divider, Menu} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TranslateObject} from '../Config/Translate';

const InitialState = {
    home: 'ראשי',
    monthSelected: 'נבחרי החודש',
    videoChat: 'chat',
    myAnswer: 'התשובה שלי',
    settings: 'הגדרות',
};

const NavigationRow = ({navigation,restartDay}) => {
    const [isVisible, setVisible] = React.useState(false);
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [translate, setTranslate] = React.useState(InitialState);

    React.useEffect(() => {
        TranslateObject(setTranslate, InitialState);
    }, []);

    const navigate = (page) => {
        setMenuVisible(!menuVisible);
        navigation.navigate(page);
    };


    return (
        <SafeAreaView>
            <View style={{
                flexDirection: 'row-reverse',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                // paddingLeft: '4%',
                // paddingRight: '7%',
            }}>

                <View>
                    <JewisRetual isVisible={() => {
                        setVisible(!isVisible);
                    }}/>
                </View>

                <View style={{paddingRight: 10}}>
                    <Timer restartDay={restartDay}/>
                </View>

                <View>
                    <Menu
                        visible={menuVisible}
                        onDismiss={() => {
                            setMenuVisible(!menuVisible);
                        }}
                        anchor={<Button onPress={() => {
                            setMenuVisible(!menuVisible);
                        }}> <Icon style={{alignSelf: 'center', justifyContent: 'center', color: 'white'}} name="bars"
                                  size={30}/></Button>}>
                        <Menu.Item onPress={() => {
                            navigate('Home');
                        }} title={translate['home']}/>

                        <Menu.Item onPress={() => {
                            navigate('MonthElected');
                        }} title={translate['monthSelected']}/>

                        <Menu.Item onPress={() => {
                            navigate('Chat');
                        }} title={translate['videoChat']}/>

                        <Divider style={{backgroundColor: 'black', height: 2}}/>
                        <Menu.Item onPress={() => {
                            navigate('MyAnswer');
                        }} title={translate['myAnswer']}/>

                        <Menu.Item onPress={() => {
                            navigate('Settings');
                        }} title={translate['settings']}/>
                        <Divider style={{backgroundColor: 'black', height: 2}}/>
                    </Menu>
                </View>
            </View>
        </SafeAreaView>

    );

};

const styles = StyleSheet.create({
    style: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0097FF',
        paddingTop: '10%',
    },
    timer: {
        backgroundColor: 'gray',
        width: '70%',
        fontSize: 50,
    },

});


export default NavigationRow;

