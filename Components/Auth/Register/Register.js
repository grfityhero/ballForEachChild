import React, {useState} from 'react';
import {Card, Text} from 'react-native-paper';
import {StyleSheet, View, SafeAreaView, ScrollView,ToastAndroid} from 'react-native';
import {
    ButtonOrange,
    Form,
    ModalJewis,
    ModalText,
} from '../../Layout/UiComponents/index.UiComponents';
import {RegisterForm, RegisterDAL} from '../../../DAL/Register.DAL';
import JewisRetual from '../../Layout/JewisRitual';
import {englishTerms, hebrewTerms} from '../../../locales/terms';
import {setData} from '../../Config/localStorage';
import {strings, isRTL} from '../../Config/I18nManager';
import {TranslateObject, TranslateText} from '../../Config/Translate';

const InitialState = {
    title: strings('register.title'),
    cancel_button: strings('register.cancel_button'),
};

const Register = ({navigation}) => {
    const [visible, setVisible] = useState(false);
    const [termsShow, setTermsShow] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [translateText, setTranslateText] = useState(InitialState);

    React.useEffect(() => {

        TranslateObject(setTranslateText, InitialState);
    }, []);

    const handleResult = async result => {

        result
            .then(response => {
                if (response.status === 200) {
                    setData('token', JSON.stringify(response.data.token));
                    setData('user', JSON.stringify(response.data.user));
                    navigation.navigate('Home');
                }
            })
            .catch(async error => {
                if (error) {
                    let warw = await TranslateText(setLoginError,"email user Alert Exist");
                    console.log("warw :",warw)
                    ToastAndroid.showWithGravityAndOffset(
                        warw[0],
                        ToastAndroid.LONG,
                        ToastAndroid.TOP,
                        25,
                        50
                    );
                }
            });
    };

    const terms = () => {
        setTermsShow(!termsShow);
    };

    return (
        <>
            <SafeAreaView>
                <ScrollView>
                    <View style={styles.viewStyle}>
                        <JewisRetual
                            isVisible={() => {
                                setVisible(!visible);
                            }}
                        />
                        <View style={{alignItems: 'center'}}>
                            <Text style={styles.registerText}>{translateText.title}</Text>
                        </View>

                        <View style={styles.cardView}>
                            <Card style={styles.cardStyle}>
                                <Card.Content>
                                    {/*<Text style={{color: "red"}}>{loginError}</Text>*/}
                                    <Form
                                        onTermsClick={terms}
                                        action={RegisterDAL}
                                        buttonText={RegisterForm().buttonText}
                                        fields={RegisterForm().fields}
                                        formError={setLoginError}
                                        afterSubmit={handleResult}
                                    />
                                    <View style={{paddingTop: 10}}>
                                        <ButtonOrange
                                            onPress={() => {
                                                navigation.navigate('Login');
                                            }}
                                            text={translateText.cancel_button}
                                        />
                                    </View>
                                </Card.Content>
                            </Card>
                        </View>

                        <ModalText
                            isShow={termsShow}
                            isClose={() => {
                                setTermsShow(!termsShow);
                            }}
                            text={isRTL ? hebrewTerms() : englishTerms()}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
            <ModalJewis
                isShow={visible}
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
    registerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    cardView: {
        paddingTop: '3%',
    },
    cardStyle: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
    },
});
export default Register;
