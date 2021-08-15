import React from 'react';
import {Switch} from 'react-native-switch';
import {TranslateObject} from '../../Config/Translate';
import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false`']);

const InitialState = {
    original: 'source',
    translated: 'translate',
};


const SwitchTranslate = ({isTranslated}) => {
    const [value, setValue] = React.useState(false);
    const [words, setWords] = React.useState(InitialState);

    React.useEffect(() => {
        TranslateObject(setWords, InitialState);
    }, []);

    return (
        <Switch
            value={value}
            barHeight={20}
            circleSize={20}

            switchWidthMultiplier={3}
            onValueChange={(val) => {
                isTranslated(val);
                setValue(val);
            }}
            disabled={false}
            activeText={words.translated}
            inActiveText={words.original}
            backgroundActive={'green'}
            backgroundInactive={'gray'}
            circleActiveColor={'#30a566'}
            circleInActiveColor={'#000000'}/>
    );
};

export default SwitchTranslate;
