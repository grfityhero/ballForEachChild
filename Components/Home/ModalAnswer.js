import React from 'react';
import {Card, Modal, Text} from 'react-native-paper';
import SwitchSelector from 'react-native-switch-selector';
import {ButtonOrange} from '../Layout/UiComponents/index.UiComponents';
import {
    StyleSheet,
    ScrollView,
    View,
    Image,
    TouchableHighlight,
} from 'react-native';

import ImageProfile from '../../Components/asserts/ImageProfile.png';
import Like from '../asserts/Like/like.png';
import unLike from '../asserts/Like/unLike.png';
import {translate, like} from '../../DAL/Home.DAL';
import {lang, strings} from '../Config/I18nManager';
import {post} from '../../DAL/DAL';
import {TranslateObject} from '../Config/Translate';

const InitialState = {
    originalText: 'מקור',
    translateText: 'מתורגם',
    confrimBtn: 'אישור',
};

export const ModalAnswer = ({data, isShow, isClose, likeHandler}) => {
    const isShowRef = React.useRef(isShow);
    const answerRef = React.useRef(data);
    const [visible, setVisible] = React.useState(false);
    const [answer, setAnswer] = React.useState({});
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [translateText, setTranslateText] = React.useState('');
    const [translatedText, setTranslatedText] = React.useState(InitialState);

    const hideModal = () => {
        setVisible(false);
        setIsSwitchOn(false);
        isClose();
    };

    const trans = async text => {
        let result = await post('translate/' + lang.split('-')[0], {text: text});
        setTranslateText(result.data);
    };


    React.useEffect(() => {
        TranslateObject(setTranslatedText, InitialState);
    }, [])



    React.useEffect(() => {
            setVisible(isShow);
    }, [isShow])

    React.useEffect(() => {


        if (answerRef.current && answerRef.current() !== data()) {
            answerRef.current = data;
            setAnswer(data);
            setTranslateText(data.body);
            trans(data().body);
        }
    }, [answer, data]);

    const likePost = async () => {

        await like(answer.postId).then(data => {
            if (data.data.nModified > 0) {
                setAnswer(oldState => {
                    return {...oldState, didLike: !answer.didLike};
                });
                likeHandler(answer.postId);

            }
        });
    };

    const imageSource = () => {
        console.log(answer)
        return answer.avatarStatus === 0
            ? ImageProfile
            : {uri: `http://161.35.43.123:5000/usersPics/${answer?.avatarPicUrl}`};
    };

    return (
        <Modal visible={visible} onDismiss={hideModal}>
            <Card>
                <Card.Content
                    style={{paddingTop: '20%', maxHeight: '90%', height: '90%'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View>
                            <Image source={imageSource()} style={{width: 100, height: 100}}/>
                        </View>
                        <View style={{alignSelf: 'flex-end', paddingLeft: 20}}>
                            <Text>
                                {answer.name} ({answer.city}, {answer.country})
                            </Text>
                        </View>
                    </View>
                    <ScrollView style={{maxHeight: '95%', minHeight: '50%'}}>
                        <Text>{!isSwitchOn ? answer.body : translateText}</Text>
                    </ScrollView>

                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <View>
                            <ButtonOrange
                                text={translatedText.confrimBtn}
                                onPress={hideModal}
                            />
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{alignSelf: 'center'}}>
                                {/*<Text onPress={likeHandler} >*/}
                                {/*    {answerData.likesCount}*/}
                                {/*</Text>*/}
                            </View>
                            <View style={{alignSelf: 'center'}}>
                                <TouchableHighlight
                                    activeOpacity={0.8}
                                    underlayColor="transparent"
                                    onPress={likePost}>
                                    <Image
                                        style={{height: 40, width: 40, resizeMode: 'contain'}}
                                        source={answer.didLike ? Like : unLike}
                                    />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View
                            style={{alignSelf: 'center', flexDirection: 'row', width: '40%'}}>
                            <SwitchSelector
                                width={50}
                                initial={0}
                                onPress={val => setIsSwitchOn(val)}
                                textColor={'black'} //'#7a44cf'
                                selectedColor={'white'}
                                buttonColor={'gray'}
                                borderColor={'gray'}
                                hasPadding
                                options={[
                                    {label: translatedText.originalText, value: false},
                                    {label: translatedText.translateText, value: true},
                                ]}
                            />
                        </View>
                    </View>
                </Card.Content>
            </Card>
        </Modal>
    );
};

const styles = StyleSheet.create({});

export default ModalAnswer;
