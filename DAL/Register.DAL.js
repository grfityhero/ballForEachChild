
import React from 'react';
import {strings} from '../Components/Config/I18nManager';
import Axios from 'axios';
import {ImageUpload, Input, SwitchToggel} from '../Components/Layout/UiComponents/index.UiComponents';
import {
    nameValidaor,
    emailValidator,
    passwordValidator,
    countryValidator,
    phoneVlidator,
    imageValidator,
    termsValidator,
} from '../Validators/Register.validator';
import {TranslateObject} from '../Components/Config/Translate';

export const RegisterDAL = (values) => {
    // console.log('values : ', values);
    let formData = new FormData();
    formData.append('uploadedFile', values.avatarPicUrl.source);
    formData.append('email', values.email);
    formData.append('password', values.password);
    formData.append('name', values.name);
    formData.append('country', values.country);
    formData.append('city', values.city);
    formData.append('phone', values.phone);

    return Axios.post('http://161.35.43.123:5000/api/register', formData, {
        headers: {
            'Content-Type': 'image/jpeg',
        },
    });

};

const InitialState = {
    signup_button: strings('register.signup_button'),
    name: strings('register.name'),
    email: strings('register.email'),
    password: strings('register.password'),
    country: strings('register.country'),
    city: strings('register.city'),
    phone: strings('register.phone'),
    image : 'בחר תמונה'
};


export const RegisterForm = () => {

    const [word,setWord] = React.useState({})

    React.useEffect(()=>{
        TranslateObject(setWord, InitialState);
    },[])

    return {
        buttonText: word["signup_button"],
        fields: {
            name: {
                inputProps: {
                    maxLength: 12,
                },
                type: Input,
                label: word["name"],
                validators: [nameValidaor],
            },
            email: {
                type: Input,
                label: word["email"],
                validators: [emailValidator],
            },
            password: {
                type: Input,
                label: word["password"],
                validators: [passwordValidator],
                inputProps: {
                    secureTextEntry: true,
                },
            },
            country: {
                type: Input,
                label: word["country"],
                inputProps: {
                    maxLength: 12,
                },
                validators: [countryValidator],
            },
            city: {
                type: Input,
                label: word["city"],
                inputProps: {
                    maxLength: 12,
                },
                validators: [countryValidator],
            },
            phone: {
                type: Input,
                label: word["phone"],
                inputProps: {
                    maxLength: 10,
                },
                validators: [phoneVlidator],
            },
            avatarPicUrl: {
                type: ImageUpload,
                label: word["image"],
                validators: [imageValidator],
            },
            termOfUse: {
                type: SwitchToggel,
                label: 'termOfUse',
                validators: [termsValidator],
            },
        },
    };
};
