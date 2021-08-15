import {TextInput} from 'react-native-paper';
import React from 'react';

export const Input = ({text, name, error, ...props}) => {
    return <TextInput dense={400}
                      style={{backgroundColor: 'transparent', Underline: 'red'}}
                      underlineColor={'black'}
                      mode="flat"
        // theme={theme}
                      {...props}
                      error={error}
                      name={name}
                      label={text}
    />;
};
