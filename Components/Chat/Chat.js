import React, {useEffect, useState, useRef} from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import {Text, Portal} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context/src/SafeAreaView';
import NavigationRow from '../Layout/NavigationRow';
import {
    getUserToVideo,
    inviteUserToVideo,
    getTokenRoomChat,
    getNotifyCall,
    reportChatStatus,
    updateStatusUser,
} from '../../DAL/Chat.DAL';
import ChatBox from './ChatBox';
import TwilioVideo from '../Video/Video';
import {getData} from '../Config/localStorage';
import {ImageBackground} from 'react-native';
import {Modal, IconButton} from 'react-native-paper';
import {TranslateObject} from '../Config/Translate';
import IncomingCall from './IncomingCall';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://161.35.43.123:5000';
const socket = socketIOClient(ENDPOINT);

const InitialState = {
    originalText: 'מקור',
    translateText: 'מתורגם',
    confrimBtn: 'אישור',
};

const screenOptions = {
    incomingCall: 'incomingCall',
    inCall: 'inCall',
    showUserToCall: 'showUserToCall',
    showListUsers: 'showListUsers',
};
const Chat = ({navigation}) => {
    const [users, setUsers] = useState([]);
    const [userSelected, setUserSelected] = useState(null);
    const [chatID, setChatID] = useState(0);
    const [screenState, setScreeState] = useState(screenOptions.showListUsers);
    const [tokenVideo, setTokenVideo] = useState('');
    const reftInterval = useRef();
    const twilioRef = useRef();
    const [translatedText, setTranslatedText] = React.useState(InitialState);
    const hideModal = () => setScreeState(screenOptions.showListUsers);
    //
    const onPressUser = user => {
        setUserSelected(user);
        setScreeState(screenOptions.showUserToCall);
    };

    const getUserConnect = async () => {
        const value = await getData('user');
        console.log(JSON.parse(value).id)
        socket.emit('heresMyId', JSON.parse(value).id);

    }

    React.useEffect(() => {
        getUserConnect();
    }, [])

    const getUserVideo = () => {
        getUserToVideo().then(user => {
            setUsers(
                user.data.data.filter(u => {
                    return u.isOnline;
                }),
            );
        });
    };

    const hasVideo = async () => {
        const res = await getNotifyCall();
        if (res.data.length > 0) {
            const user = await getData('user');
            if (res.data[0]?.callReciverId?._id !== JSON.parse(user).id) {
                const caller = res.data[0].callerId;
                setChatID(res.data[0]._id);
                setScreeState(screenOptions.incomingCall);
                const {name, city, country, avatarPicUrl} = caller;
                setUserSelected({
                    userid: caller._id,
                    name,
                    city,
                    country,
                    avatarPicUrl,
                });
            }
        }
    };

    const makeCall = async userId => {
        const res = await inviteUserToVideo(userId);
        if (res.data.status === 'NOT_AVAILBE_FOR_CHAT') {
            Alert.alert('user not available');
            return;
        }
        const {callerId, callReciverId} = res.data;

        //
        // getTokenRoomChat(callerId, callReciverId, true).then((res) => {
        //     console.log("res :", res)
        // }).catch((err) => {
        //     console.log("errrrrrorrrrrr",err)
        // })
        //
        // const tokenRes = await getTokenRoomChat(callerId, callReciverId, true);
        // console.log("tokenRes :",tokenRes)
        // displayVideo(tokenRes.data.token);
    };

    const answerIncomingCall = async callerId => {
        const dataUser = await getData('user');
        console.log("dataUser :", dataUser)
        const tokenRes = await getTokenRoomChat(
            callerId,
            JSON.parse(dataUser).id,
            false,
        );
        displayVideo(tokenRes.data.token);
    };

    const declineCall = async () => {
        chatID && reportChatStatus(chatID, 3);
    };

    const displayVideo = token => {
        setTokenVideo(token);
        setScreeState(screenOptions.inCall);
    };

    useEffect(() => {
        getUserVideo();
        updateStatusUser(true);
    }, []);

    useEffect(() => {
        if (screenState === screenOptions.showListUsers) {
            reftInterval.current = setInterval(() => {
                getUserVideo();
                // getUserConnect();
                hasVideo();
            }, 1000 * 3);
        } else {
            clearInterval(reftInterval.current);
        }

        return () => {
            clearInterval(reftInterval.current);
        };
    }, [screenState]);

    React.useEffect(() => {
        TranslateObject(setTranslatedText, InitialState);
    }, []);
    return (
        <SafeAreaView style={styles.style}>
            <NavigationRow navigation={navigation}/>
            <View style={{paddingBottom: 100}}>
                {users.length === 0 && (
                    <Text style={{textAlign: 'center', paddingTop: 40}}>
                        no users on line now
                    </Text>
                )}
                <FlatList
                    style={{margin: 5}}
                    numColumns={2} // set number of columns
                    columnWrapperStyle={styles.row} // space them out evenly
                    data={users}
                    keyExtractor={(item, index) => index}
                    renderItem={item => (
                        <ChatBox onPressUser={onPressUser} user={item.item}/>
                    )}
                />
                {userSelected &&
                (screenState === screenOptions.inCall ||
                    screenState === screenOptions.incomingCall ||
                    screenState === screenOptions.showUserToCall) && (
                    <Portal>
                        <Modal
                            visible={
                                userSelected &&
                                (screenState === screenOptions.inCall ||
                                    screenState === screenOptions.incomingCall ||
                                    screenState === screenOptions.showUserToCall)
                            }
                            onDismiss={hideModal}
                            contentContainerStyle={styles.modal}>
                            <View style={styles.imgModel}>
                                {screenState === screenOptions.incomingCall && (
                                    <IncomingCall
                                        onPress={() => {
                                            answerIncomingCall(userSelected.userid);
                                        }}
                                    />
                                )}

                                {screenState === screenOptions.inCall ? (
                                    <TwilioVideo
                                        token={tokenVideo}
                                        chatID={chatID}
                                        hideModal={hideModal}
                                        twilioRef={twilioRef}
                                    />
                                ) : (
                                    <ImageBackground
                                        style={styles.img}
                                        source={{
                                            uri: `http://161.35.43.123:5000/usersPics/${userSelected?.avatarPicUrl}`,
                                        }}>
                                        <Text style={styles.imgText}>
                                            {userSelected?.name}
                                            {'\n'} ({userSelected?.city})
                                        </Text>
                                    </ImageBackground>
                                )}
                            </View>
                            <View style={styles.bottomModel}>
                                <View style={{width: '45%'}}/>
                                <View style={styles.videoBottemModel}>
                                    <View style={{...styles.icon, borderColor: 'red'}}>
                                        <IconButton
                                            onPress={() => {
                                                if (screenState === screenOptions.incomingCall) {
                                                    declineCall();
                                                    hideModal();
                                                } else if (screenState === screenOptions.inCall) {
                                                    twilioRef.current.disconnect();
                                                    hideModal();
                                                } else if (
                                                    screenState === screenOptions.showUserToCall
                                                ) {
                                                    hideModal();
                                                }
                                            }}
                                            icon="phone-hangup"
                                            color={'red'}
                                        />
                                    </View>
                                    <View style={{...styles.icon, borderColor: 'green'}}>
                                        <IconButton
                                            onPress={() => {
                                                if (screenState === screenOptions.incomingCall) {
                                                    answerIncomingCall(userSelected.userid);
                                                } else if (
                                                    screenState === screenOptions.showUserToCall
                                                ) {
                                                    makeCall(userSelected.userid);
                                                }
                                            }}
                                            color="green"
                                            icon="phone"
                                        />
                                    </View>
                                </View>
                            </View>
                        </Modal>
                    </Portal>
                )}
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
    modal: {
        backgroundColor: 'white',
        height: '80%',
        padding: 20,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    imgModel: {
        maxHeight: '90%',
        height: '90%',
    },
    imgText: {
        position: 'absolute',
        bottom: 1,
        color: 'black',
    },
    img: {
        width: '100%',
        height: '90%',
        resizeMode: 'cover',
    },
    bottomModel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    videoBottemModel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '30%',
    },
    round: {},
    icon: {
        width: 40,
        height: 40,
        borderRadius: 0.5 * 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'green',
        borderWidth: 3,
    },
});
export default Chat;
