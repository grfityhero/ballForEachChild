import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import LoginText from './LoginText';
import {ModalJewis} from '../../Layout/UiComponents/index.UiComponents';
import JewisRetual from '../../Layout/JewisRitual';
import LoginView from './LoginView';
import {isSabbath} from '../../../DAL/Login.DAL';

const Login = ({navigation}) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        isSabbath().then((s) => {
            console.log("data : ",s.data)
            if (!s.data.isAllow) {
                // navigation.navigate('Sabbath', {data: s.data.data});
            }
        });
    }, []);

    return (
        <>
            <View
                style={styles.viewStyle}>
                <JewisRetual isVisible={() => {
                    setVisible(!visible);
                }}/>
                <LoginText/>

                <LoginView navigation={navigation}/>

                {/*<ModalText isShow={visible} isClose={() => {*/}
                {/*    setVisible(!visible);*/}
                {/*}} text={test().text}/>*/}
            </View>
            <ModalJewis isShow={visible}
                        isClose={() => {
                            setVisible(!visible);
                        }}
            />
        </>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#0097FF',
        paddingTop: '5%',
    },
    cardStyle: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
    },
});

export default Login;
