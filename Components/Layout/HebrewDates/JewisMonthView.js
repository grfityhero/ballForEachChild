import React from 'react';
import {Text, View} from 'react-native';

const JewisMonthView = ({title, text}) => {
    return (
        <>
            <Text style={{textAlign: 'center'}}>{title}</Text>
            {text.trim().split('.').map((line, index) => {
                if(line.length > 0)
                    return <Text key={index} style={{textAlign: 'left'}}>● {line.trim() + '.\n'} </Text>;
            })}
        </>
    );

};

export default JewisMonthView;
