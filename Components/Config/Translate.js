import React from 'react';
import {lang} from './I18nManager';
import {post} from '../../DAL/DAL';


export const TranslateObject = (setState, values) => {
    Object.keys(values).map(async (key) => {
        let result = await post('translate/' + lang.split('-')[0], {text: values[key]});
        setState((oldState) => {
            return {...oldState, [key]: result.data[0]};
        });
    });
};


export const TranslateText = async (setState, text) => {
    setState((await post('translate/' + lang.split('-')[0], {text: text})).data);
    return (await post('translate/' + lang.split('-')[0], {text: text})).data
};



