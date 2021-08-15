import React, {useState} from 'react';
import {ButtonOrange, Input, ImageUpload, SwitchToggel, ModalText} from './index.UiComponents';
import {hasValidationError, validateFields} from '../../../Validators/Validatior';
import {View} from 'react-native';
import {HelperText} from 'react-native-paper';

const getInitialState = (fieldKeys) => {
    const state = {};
    fieldKeys.forEach((key) => {
        state[key] = '';
    });
    return state;
};

const Field = ({Type, value, onTermsClick, onChangeText, ...props}) => {

    switch (Type) {
        case Input :
            return <Input value={value} onChangeText={onChangeText} {...props}/>;
        case SwitchToggel :
            return <SwitchToggel onTermsHandler={onTermsClick} value={value} onChangeText={onChangeText}/>;
        case ImageUpload :
            return <ImageUpload {...props} onImageChange={onChangeText}/>;
    }
};

export const Form = ({fields, buttonText, action, afterSubmit, onTermsClick, formError}) => {
    const fieldKeys = Object.keys(fields);
    const [values, setValues] = useState(getInitialState(fieldKeys));
    const [errorMessage, setErrorMessage] = useState('');

    const [validationErrors, setValidationErrors] = useState(
        getInitialState(fieldKeys),
    );

    const onChangeValue = (key, value) => {
        const newState = {...values, [key]: value};
        setValues(newState);
        formError('');
        if (validationErrors[key]) {
            const newErrors = {...validationErrors, [key]: ''};
            setValidationErrors(newErrors);
        }
    };

    const getValues = () => {
        return fieldKeys.sort().map((key) => values[key]);
    };

    const submit = async () => {
        setErrorMessage('');
        setValidationErrors(getInitialState(fieldKeys));
        const errors = validateFields(fields, values);
        if (hasValidationError(errors)) {
            return setValidationErrors(errors);
        }

        try {
            // const result = action(...getValues());
            const result = action(values);

            await afterSubmit(result);
        } catch (e) {
            setErrorMessage(e.message);
        }
    };

    return (
        <View>
            {fieldKeys.map((key) => {
                // console.log(fields[key]);
                const field = fields[key];
                const fieldError = validationErrors[key];
                return (
                    <View key={key}>
                        <Field onTermsClick={onTermsClick} Type={field.type} value={values[key]} text={field.label}
                               error={false}
                               onChangeText={(text) => onChangeValue(key, text)} {...field.inputProps}
                               maxLenght={field.maxLength}/>
                        {/*<Input text={field.label} error={false}*/}
                        {/*       {...field.inputProps} onChangeText={(text) => onChangeValue(key, text)}*/}
                        {/*/>*/}
                        <HelperText type="error" visible={true}>
                            {fieldError}
                        </HelperText>
                    </View>
                );

            })}

            <ButtonOrange text={buttonText} onPress={submit}/>
        </View>
    );

};
