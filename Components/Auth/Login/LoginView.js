import React, {useState, useEffect} from 'react';
import {lang, strings} from '../../Config/I18nManager';
import {StyleSheet, View} from 'react-native';
import {Card, HelperText} from 'react-native-paper';
import {
    ButtonOrange,
    Form,
} from '../../Layout/UiComponents/index.UiComponents';
import {LoginDAL, LoginForm} from '../../../DAL/Login.DAL';
import {getData, setData, clearStorage} from '../../Config/localStorage';
import socketIOClient from 'socket.io-client';
import {post} from '../../../DAL/DAL';
import moment from 'moment';

const ENDPOINT = 'http://161.35.43.123:5000';
const socket = socketIOClient(ENDPOINT);

const LoginView = ({navigation}) => {
    const [loginError, setLoginError] = useState('');
    const [regBtn, setRegBtn] = useState('');


    const isShabbath = () => {
        const date = moment().utc(-2);
        date.day('friday');
        //
        // console.log('[day] :',date.day());
        console.log('[hour] :', date.hour());
    };

    const getUser = async () => {
        // isShabbath();
        const token = await getData('token');
        const value = await getData('user');
        if (value) {
            // console.log('token :', token);
            // console.log('id :', JSON.parse(value).id);
            socket.emit('heresMyId', JSON.parse(value).id);
            // console.log('user', value);
            if (value !== null) {
                navigation.navigate('Home');
            }
        }
    };

    const translate = async () => {
        let result = await post('translate/' + lang.split('-')[0], {
            text: strings('login.signup_button'),
        });
        setRegBtn(result.data[0]);
    };

    React.useEffect(() => {
        getUser();
        translate();
        // clearStorage();
    }, []);

    const handleResult = async (result) => {
        result
            .then((response) => {
                if (response.status === 200) {
                    setData('token', JSON.stringify(response.data.token));
                    setData('user', JSON.stringify(response.data.user));
                    navigation.navigate('Home');
                }
            })
            .catch((error) => {
                setLoginError(`${strings('login.login_error')}`);
                // console.log('error.response.data :', error.response.data);
                // console.log('error.response.status :', error.response.status);
            });
    };

    return (
        <Card style={styles.cardStyle}>
            <Card.Content>
                <View style={{alignItems: 'center'}}>
                    <HelperText type="error">{loginError}</HelperText>
                </View>
                <Form
                    action={LoginDAL}
                    afterSubmit={handleResult}
                    buttonText={LoginForm().buttonText}
                    fields={LoginForm().fields}
                    formError={setLoginError}
                />

                <View style={{paddingTop: 10}}>
                    <ButtonOrange
                        onPress={() => {
                            navigation.navigate('Register');
                        }}
                        text={regBtn}
                    />
                </View>
            </Card.Content>
        </Card>
    );
};
const styles = StyleSheet.create({});

export default LoginView;
