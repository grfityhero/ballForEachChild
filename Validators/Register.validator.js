import {strings} from '../Components/Config/I18nManager';
import validator from 'validator';

const isEmpty = value =>
    value === undefined ||
    value === null ||
    (typeof value == 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length == 0);


export const nameValidaor = (text) => {
    text = !isEmpty(text) ? text : '';

    if (validator.isEmpty(text)) {
        return `${strings('validators.empty')}`;
    } else if (!validator.isLength(text, {min: 4, max: 12})) {
        return 'Must be 4-12 characters';
    }
};

export const emailValidator = (text) => {

    text = !isEmpty(text) ? text : '';

    if (validator.isEmpty(text)) {
        return `${strings('validators.empty')}`;
    } else if (!validator.isEmail(text)) {
        return 'Incorrect Email Address';
    }
};

export const passwordValidator = (text) => {
    text = !isEmpty(text) ? text : '';

    if (validator.isEmpty(text)) {
        return `${strings('validators.empty')}`;
    }
};

export const countryValidator = (text) => {
    text = !isEmpty(text) ? text : '';

    if (validator.isEmpty(text)) {
        return `${strings('validators.empty')}`;
    } else if (!validator.isLength(text, {min: 4, max: 12})) {
        return 'Must be 4-12 characters';
    }
};

export const phoneVlidator = (text) => {
    text = !isEmpty(text) ? text : '';
    if (validator.isEmpty(text)) {
        return `${strings('validators.empty')}`;
    } else if (!validator.isMobilePhone(text, ['he-IL'])) {
        return 'not phoneee';
    }

};

export const imageValidator = (file) => {
    if (!file) {
        return 'Please Select Image';
    }
};

export const termsValidator = (isChecked) => {
    if(isChecked !== true){
        return 'Please Confirm terms';
    }
};
