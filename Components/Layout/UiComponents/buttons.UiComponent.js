import {Button} from 'react-native-paper';
import {buttonTheme} from '../ThemeComponents';
import React from 'react';

export const ButtonOrange = ({text, onPress}) => {
    return <Button
        theme={buttonTheme}
        mode="contained"
        onPress={onPress}>
        {text}
    </Button>;
};
