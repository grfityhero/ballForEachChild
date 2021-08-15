import React from 'react';
import {Button, Card, Modal, Text} from 'react-native-paper';
import {buttonTheme} from '../ThemeComponents';
import {StyleSheet, ScrollView, View} from 'react-native';
import Month from '../HebrewDates/HebrewDate';
import {TranslateText} from '../../Config/Translate';

export const ModalJewis = ({Com, isShow, isClose}) => {
    const showRef = React.useRef(isShow);
    const [visible, setVisible] = React.useState(false);
    const [confrimBtnText, setConfrimBtnText] = React.useState('');

    const hideModal = () => {
        setVisible(false);
        isClose();
    };

    React.useEffect(() => {
        if (showRef.current !== isShow) {
            TranslateText(setConfrimBtnText,'Confrim');
            showRef.current = isShow;
            setVisible(isShow);
        }
        // console.log('showReg :', showRef.current);
    }, [isShow]);

    return (
        <Modal visible={visible} onDismiss={hideModal}>
            <Card>
                <Card.Content style={{paddingTop: '20%', maxHeight: '90%'}}>
                    <ScrollView style={{maxHeight: '95%'}}>
                        <Month/>
                    </ScrollView>
                    <View>
                        <Button theme={buttonTheme}
                                style={{width: '40%', alignSelf: 'flex-end'}}
                                mode="contained"
                                onPress={hideModal}>
                            {confrimBtnText}
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </Modal>

    );
};

const styles = StyleSheet.create({});
