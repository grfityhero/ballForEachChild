import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Portal, Dialog, Button, Menu, Divider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from './Search';
import {Input} from '../../Layout/UiComponents/index.UiComponents';
import {TranslateObject} from '../../Config/Translate';


const InitialState = {
    title: 'דלג לדירוג',
    derog: 'דירוג',
    confrim: 'אישור',
    cancel: 'ביטול',
};

const Filter = ({ranking, userSearch, scrollRank}) => {
    const [searchMode, setSearchMode] = useState(false);
    const [portalVisibale, setPortalVisibale] = useState(false);
    const [rankValue, setRankValue] = useState('');
    const [translate, setTranslate] = useState(InitialState);
    const [rank , setRank] = useState(ranking)
    useEffect(() => {
        TranslateObject(setTranslate, InitialState);
    }, []);


    useEffect(()=>{
        setRank(ranking)
    },[ranking])

    const skipToRank = () => {
        scrollRank(rankValue);
        setRankValue('');
        setPortalVisibale(false);

    };

    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            paddingTop: 20,
            paddingLeft: 10,
            paddingRight: 10,
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{backgroundColor: 'gray', width: '10%'}}>
                    <Icon onPress={() => {
                        setSearchMode(!searchMode);
                    }} name={'filter'} size={40}/>
                </View>
                <View style={{width: '80%'}}>
                    <Search userSearch={userSearch} ranking={rank} searchMode={searchMode}/>
                </View>
            </View>

            <View style={{alignItems: 'center', backgroundColor: 'gray', width: '10%'}}>
                <Icon name={'angle-double-down'} onPress={() => {
                    setPortalVisibale(true);
                }} size={40}/>
            </View>

            <Portal>
                <Dialog visible={portalVisibale} onDismiss={() => {
                    setPortalVisibale(false);
                }}>
                    <Dialog.Title>{translate['title']}</Dialog.Title>
                    <Dialog.Content>
                        <Input text={translate['derog']}
                               onChangeText={(text) => {
                                   setRankValue(text);
                               }}/>

                    </Dialog.Content>
                    <Dialog.Actions>
                        <View style={{flexDirection: 'column', width: '100%'}}>
                            <Button style={{backgroundColor: 'orange', height: 50}}
                                    onPress={skipToRank}>{translate['confrim']}</Button>
                            <Button style={{backgroundColor: 'gray', height: 50}} onPress={() => {
                                setPortalVisibale(false);
                            }}>{translate['cancel']}</Button>
                        </View>

                    </Dialog.Actions>
                </Dialog>
            </Portal>

        </View>
    );
};

export default Filter;
