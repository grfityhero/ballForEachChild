import React, {useState} from 'react';
import {strings} from '../Components/Config/I18nManager';
import {validateContent, validateLength} from '../Validators/Validatior';
import {Input} from '../Components/Layout/UiComponents/index.UiComponents';
import {post} from './DAL';
import {lang} from '../Components/Config/I18nManager';
import {TranslateObject} from '../Components/Config/Translate';
import moment from 'moment';

export const isSabbath = () => {
    const now = moment();
    return post('activity', {
        // theDate: now,
    });
};

export const LoginDAL = (values) => {
    return post('login', {
        'email': values.email,
        'password': values.password,
    });
};

const InitialState = {
    login_button: strings('login.login_button'),
    name: strings('login.name'),
    password: strings('login.password'),
};

export const LoginForm = () => {
    const [words, setWord] = useState({});

    React.useEffect(() => {
        TranslateObject(setWord, InitialState);
    }, []);


    return {
        buttonText: `${words['login_button']}`,
        fields: {
            email: {
                type: Input,
                label: `${words['name']}`,
                validators: [validateContent],
                inputProps: {
                    keyboardType: 'email-address',
                },
            },
            password: {
                type: Input,
                label: `${words['password']}`,
                validators: [validateContent, validateLength],
                inputProps: {
                    secureTextEntry: true,

                },
            },
        },
    };
};
