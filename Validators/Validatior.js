import {strings} from '../Components/Config/I18nManager';
import validator from 'validator';

export const validateContent = (text) => {
    if (validator.isEmpty(text)) {
        return `${strings('validators.empty')}`;
    }
};

export const validateEmail = (text) =>{
    if(!validator.isEmail(text)){
        return 'Email incorrect';
    }
}

export const validateLength = (text) => {
    if (!validator.isLength(text, {min:2, max: 12})) {
        return 'Must be 4-12 characters';
    }
};

export const imageValidator = (image) => {
    if (!image) {
        return 'Image Must Choose';
    }
};


export const validateField = (validators, value) => {
    let error = '';
    validators.forEach((validator) => {
        const validationError = validator(value);
        if (validationError) {
            error = validationError;
        }
    });
    return error;
};

export const validateFields = (fields, values) => {
    const errors = {};
    const fieldKeys = Object.keys(fields);
    fieldKeys.forEach((key) => {
        const field = fields[key];
        const validators = field.validators;
        const value = values[key];
        if (validators && validators.length > 0) {
            const error = validateField(validators, value);

            if (error) {
                errors[key] = error;
            }
        }
    });

    return errors;
};

export const hasValidationError = (errors) => {
    return Object.values(errors).find((error) => error.length > 0);
};
