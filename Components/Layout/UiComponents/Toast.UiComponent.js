
import React from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';


export function SomeComponent() {
    React.useEffect(() => {
        Toast.show({
            text1: 'Hello',
            text2: 'This is some something 👋'
        });
    }, []);

    return <View />;
}
