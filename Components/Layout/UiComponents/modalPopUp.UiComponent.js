import React from 'react';
import {Button, Card, Modal, Portal, Text} from 'react-native-paper';
import {buttonTheme} from '../ThemeComponents';
import {StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import {TranslateText} from '../../Config/Translate';

export const ModalText = ({text, isShow, isClose}) => {
    const showRef = React.useRef(isShow);
    const [visible, setVisible] = React.useState(false);
    const [confrimBtnText , setConfrimBtnText] = React.useState('');

    const hideModal = () => {
        setVisible(false);
        isClose();
    };

    React.useEffect(() => {
        if (showRef.current !== isShow) {
            showRef.current = isShow;
            setVisible(isShow);
            TranslateText(setConfrimBtnText,'Confrim')
        }
        // console.log('showReg :', showRef.current);
    }, [isShow]);

    return (
        <Portal>
            <Modal visible={visible} onDismiss={hideModal}>
                <Card>
                    <Card.Content style={{paddingTop: '20%', maxHeight: '90%'}}>
                        <ScrollView style={{maxHeight: '95%'}}>
                            <Text>{text}</Text>
                        </ScrollView>
                        <View style={{paddingTop:10}}>
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
        </Portal>

    );
};

const styles = StyleSheet.create({});
