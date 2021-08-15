import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import NavigationRow from '../Layout/NavigationRow';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import {Button} from 'react-native-paper';
import {addAnswer, isCanWrite} from '../../DAL/MyAnswer.DAL';
import {TranslateObject} from '../Config/Translate';


const InitialState = {
    title: 'התשובה שלי',
    subTitle: 'הדבר המעניין ביותר שקרה לי היום הוא :',
    myAnswer: 'התשובה שלי',
    send: 'שלח',


};

const MyAnswer = ({navigation}) => {
    const [answerText, setAnswerText] = useState('');
    const [canAddAnswer, setCanAddAnswer] = useState(true);
    const [translate, setTranslate] = useState(InitialState);

    const textHandler = (text) => {
        setAnswerText(text);
    };

    const AllowToAddAnswer = async () => {
        isCanWrite().then((response) => {
            setCanAddAnswer(true);
        })
            .catch((err) => {
                if (err.response.status === 405) {
                    setAnswerText(err.response.data.data.body);
                    setCanAddAnswer(false);
                }
            });
    };

    useEffect(() => {
        console.log("MyAnswer")
        AllowToAddAnswer();
        TranslateObject(setTranslate, InitialState);
    }, []);

    const clickHandler = () => {
        addAnswer({title: '', body: answerText})
            .then((response) => {
                setCanAddAnswer(false);
                if (response.status === 200) {
                    navigation.navigate('Home', {newPost: response.data});
                } else {
                    console.log('post not add!!');
                }

            })
            .catch((err) => {
                if (err.response.status === 405) {
                    console.log('post not add!! ');
                }
            });

    };

    return (
        <SafeAreaView style={styles.style}>
            <NavigationRow navigation={navigation}/>
            <View style={{flexDirection: 'column'}}>
                <Text style={{alignSelf: 'center', fontSize: 30, paddingTop: 20}}>{translate['title']}</Text>
                <View style={{alignItems: 'flex-start', paddingLeft: 20}}>
                    <Text style={{
                        fontSize: 15,
                        paddingTop: 20,
                        color: 'white',
                        paddingBottom: 10,
                    }}>{translate['subTitle']}</Text>
                </View>

                <View style={{alignItems: 'center'}}>
                    <TextInput textAlignVertical={"top"} style={{
                        alignItems:'flex-start',top:0,
                        width: '90%', backgroundColor: 'white', minHeight: 20
                        , borderColor: 'gray', borderWidth: 1,
                    }}
                               onChangeText={(text) => {
                                   textHandler(text);
                               }}
                               editable={canAddAnswer}
                        // contextMenuHidden={true}
                               value={answerText}
                               maxLength={1000}
                               multiline={true}
                               numberOfLines={10}/>
                </View>
                <View style={{paddingLeft: '4%', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{fontSize: 10, color: 'white'}}>{translate['myAnswer']}</Text>
                    <Text style={{fontSize: 10, paddingRight: '5%', color: 'white'}}> {1000 - answerText.length}</Text>
                </View>
                <View style={{width: '90%', alignSelf: 'center', paddingTop: 30}}>
                    <Button disabled={answerText.length === 0 || !canAddAnswer ? true : false}
                            style={{backgroundColor: 'orange'}}
                            mode="contained" onPress={clickHandler}>
                        {translate['send']}
                    </Button>

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
});


export default MyAnswer;
