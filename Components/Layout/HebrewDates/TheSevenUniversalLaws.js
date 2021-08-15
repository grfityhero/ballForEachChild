import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TranslateObject} from '../../Config/Translate'

const InitialState = {
    title: 'The Seven Universal Laws',
    titleRowOne: '1. Believe in one God : ',
    textRowOne: 'Reject any form of idol worship',
    titleRowTwo: '2.Honor God : ',
    textRowTwo: 'Do not blaspheme ',
    titleRowThree: '3. Preserve Human Life : ',
    textRowThree: 'Do not murder',
    titleRowFour: '4. Respect Family Relationships : ',
    textRowFour: 'Do not commit adultery, incest, etc. ',
    titleRowFive: '5. Respect Property : ',
    textRowFive: 'Do not steal ',
    titleRowSix: '6. Respect God\'s Creatures : ',
    textRowSix: 'Do not eat the flesh of an animal that is still alive ',
    titleRowSeven: '7. Establish Honest Courts',
    textRowSeven: 'And a Just Legal System',
};

const TheSevenUniversalLaws = () => {
    const [texts, setTexts] = React.useState(InitialState);

    React.useEffect(()=>{
        TranslateObject(setTexts,InitialState)
    },[])


    return (
        <View style={{flexDirection: 'column'}}>
            <View>
                <Text style={styles.title}>{texts['title']}</Text>
            </View>
            <View>
                <Text style={styles.bold}>{texts['titleRowOne']}</Text>
                <Text style={styles.regular}>{texts['textRowOne']}</Text>
            </View>
            <View>
                <Text style={styles.bold}>{texts['titleRowTwo']}</Text>
                <Text style={styles.regular}>{texts['textRowTwo']}</Text>
            </View>
            <View>
                <Text style={styles.bold}>{texts['titleRowThree']}</Text>
                <Text style={styles.regular}>{texts['textRowThree']}</Text>
            </View>
            <View>
                <Text style={styles.bold}>{texts['titleRowFour']}</Text>
                <Text style={styles.regular}>{texts['textRowFour']}</Text>
            </View>

            <View>
                <Text style={styles.bold}>{texts['titleRowFive']}</Text>
                <Text style={styles.regular}>{texts['textRowFive']}</Text>
            </View>
            <View>
                <Text style={styles.bold}>{texts['titleRowSix']}</Text>
                <Text style={styles.regular}> {texts['textRowSix']}</Text>
            </View>
            <View>
                <Text style={styles.bold}>{texts['titleRowSeven']}</Text>
                <Text style={styles.regular}> {texts['textRowSeven']}</Text>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        paddingBottom: 20,
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    regular: {
        paddingLeft: 20,
        paddingBottom: 15,
    },
});

export default TheSevenUniversalLaws;
