import React, {useState} from 'react';
import {View} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import {strings} from '../../Config/I18nManager';
import {TranslateText} from '../../Config/Translate';

export const SwitchToggel = ({value, onChangeText, onTermsHandler}) => {
const [term,setTerm] = useState('')

    React.useEffect(()=>{
        TranslateText(setTerm,strings('register.terms'));


    },[])

    const onClick = () => {
        onTermsHandler(true);
    };

    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Switch value={value} onValueChange={onChangeText}/>
            <Text style={{color: 'blue'}}
                  onPress={onClick}>
                {term}
            </Text>
        </View>
    );
};
